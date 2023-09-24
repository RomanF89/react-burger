import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useState } from 'react';
import styles from './BurgerConstructor.module.css';
import { api } from '../../utils/Api';
import { getOrder, getOrderSuccess, saveOrderError } from '../../services/actions/orderDetails';
import { dropIngredients, deleteIngredient } from '../../services/actions/burgerConstructor';
import { useDrop } from 'react-dnd';
import { BurgerConstructorElement } from '../BurgerConstructorElement/BurgerConstructorElement';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { OrderLoader } from '../OrderLoader/OrderLoader';
import { useDispatch } from '../../hooks';
import { useSelector } from '../../hooks';
import { TIngredient } from '../../types/types';
import { TInitialStateAuth } from '../../services/reducers/authorization';


const BurgerConstructor: React.FC = () => {

  const getAuth = (store: { authorization: TInitialStateAuth; }) => (store.authorization);

  const auth = useSelector(getAuth);
  const data = useSelector(state => state.constructorIngredients.constructorIngredients)
  const [modal, setModal] = useState(false);

  const filteredItemsBun = useMemo(() => data.filter((filteredItem) => filteredItem.type === 'bun'), [data]);
  const otherBurgerItems = useMemo(() => data.filter((filteredItem) => filteredItem.type === 'main' || filteredItem.type === 'sauce'), [data]);

  const dispatch = useDispatch();
  const history = useHistory();

  const [, dropRef] = useDrop({
    accept: 'card',
    drop(dropIngredient: TIngredient) {
      dispatch(dropIngredients(dropIngredient))
    },
  });

  function orderClick() {

    if (!auth.currentUser) {
      return history.push('/login') //Переадрисация неавторизованного пользователя
    }

    const getBurgersId = () => { //Сортировка id бургеров, чтоб булки были вначале и вконце массива
      const ingredientsFromData: string[] = data.reduce((prevItem: [] | string[], nextItem) => {
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


  function handleClick(item: TIngredient) {
    history.replace(`/ingredients/${item._id}`, { modal: true })
  }

  function handleDeleteIngredient(ingredient: TIngredient) {
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
              type={'top'}
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
                  item={item}
                  index={index}
                  ingredientClick={handleClick}
                  handleDelete={handleDeleteIngredient}
                  key={item._id + Math.random()}
                />
              ) : null
            }
          </div>
        }

        { //Рендер нижней Булки
          filteredItemsBun.length ? <div className={styles.bottom_component} onClick={() => handleClick(filteredItemsBun[0])}>
            <ConstructorElement
              type={'bottom'}
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
