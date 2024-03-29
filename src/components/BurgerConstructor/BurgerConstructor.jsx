import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useState } from 'react';
import styles from './BurgerConstructor.module.css';
import { api } from '../../utils/Api';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder, getOrderSuccess, saveOrderError } from '../../services/actions/orderDetails';
import { dropIngredients, deleteIngredient } from '../../services/actions/burgerConstructor';
import { useDrop } from 'react-dnd';
import { BurgerConstructorElement } from '../BurgerConstructorElement/BurgerConstructorElement';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { OrderLoader } from '../OrderLoader/OrderLoader';


function BurgerConstructor() {

  const getData = (store) => (store.constructorIngredients.constructorIngredients);
  const getAuth = (store) => (store.authorization);
  const data = useSelector(getData);
  const auth = useSelector(getAuth);

  const [modal, setModal] = useState(false);

  const filteredItemsBun = useMemo(() => data.filter((filteredItem) => filteredItem.type === 'bun'), [data]);
  const otherBurgerItems = useMemo(() => data.filter((filteredItem) => filteredItem.type === 'main' || filteredItem.type === 'sauce'), [data]);

  const dispatch = useDispatch();
  const history = useHistory();

  const [, dropRef] = useDrop({
    accept: 'card',
    drop(dropIngredient) {
      dispatch(dropIngredients(dropIngredient))
    },
  });

  function orderClick() {

    if (!auth.currentUser) {
      return history.push('/login') //Переадрисация неавторизованного пользователя
    }

    const getBurgersId = () => { //Сортировка id бургеров, чтоб булки были вначале и вконце массива
      const ingredientsFromData = data.reduce((prevItem, nextItem) => {
        return [...prevItem, nextItem._id];
      }, []);
      const filteredItem = ingredientsFromData.splice(0, 1)[0];
      return [...ingredientsFromData, filteredItem]
    }
    const burgersId = getBurgersId();
    setModal(true);

    dispatch(getOrder())
    api.createOrder(burgersId)
      .then(orderData => {
        dispatch(getOrderSuccess(orderData));
      })
      .catch((err) => {
        dispatch(saveOrderError(err))
      })
      .finally(() => {
        setModal(false)
      })
  }


  function handleClick(item) {
    history.replace(`/ingredients/${item._id}`, { modal: true })
  }

  function handleDeleteIngredient(ingredient) {
    dispatch(deleteIngredient(ingredient))
  }

  // Общая цена ингредиентов
  const allIngredientsPrice = React.useMemo(() => (filteredItemsBun.reduce(function (previousValue, value) {
    return previousValue + value.price
  }, 0) * 2) +
    otherBurgerItems.reduce(function (previousValue, value) {
      return previousValue + value.price
    }, 0)
    , [otherBurgerItems, filteredItemsBun])

  return (
    <section className={styles.burger_constructor}>
      {modal && (<Modal>
        <OrderLoader />
      </Modal>)}
      <div className={styles.constructor_ingredients} ref={dropRef}>

        { //Рендер верхней Булки
          filteredItemsBun.length ? <div className={styles.top_component} onClick={() => handleClick(filteredItemsBun[0])}>
            <ConstructorElement
              type={filteredItemsBun[0].type}
              isLocked={true}
              text={filteredItemsBun[0].name}
              price={filteredItemsBun[0].price}
              thumbnail={filteredItemsBun[0].image}
              key={filteredItemsBun[0]._id}
            />
          </div> : ''
        }

        { //Рендер остальных ингредиентов
          <div className={styles.variable_components}>
            {
              data.length ? data.map((item, index) =>
                <BurgerConstructorElement
                  index={index} item={item}
                  key={item._id + Math.random()}
                  ingredientClick={handleClick}
                  handleDelete={handleDeleteIngredient}>
                </BurgerConstructorElement>
              ) : ''
            }
          </div>
        }

        { //Рендер нижней Булки
          filteredItemsBun.length ? <div className={styles.bottom_component} onClick={() => handleClick(filteredItemsBun[0])}>
            <ConstructorElement
              type={filteredItemsBun[0].type}
              isLocked={true}
              text={filteredItemsBun[0].name}
              price={filteredItemsBun[0].price}
              thumbnail={filteredItemsBun[0].image}
              key={filteredItemsBun[0]._id}
            />
          </div> : ''
        }

      </div>

      <div className={styles.order_field}>
        <span className={styles.order_price}>{allIngredientsPrice}</span>
        <div className={styles.currency_icon}>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" extraClass="ml-2" onClick={(e) => { orderClick() }}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}


export default BurgerConstructor;
