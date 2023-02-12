import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import { burgerDataPropTypes } from '../../types/types';
import { api } from '../../utils/Api';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredientDetails } from '../../services/actions/ingredientDetails';
import { getOrder, getOrderSuccess, saveOrderError } from '../../services/actions/orderDetails';
import { dropIngredients, deleteIngredient } from '../../services/actions/burgerConstructor';
import { useDrop } from 'react-dnd';
import { BurgerConstructorElement } from '../BurgerConstructorElement/BurgerConstructorElement';


function BurgerConstructor() {
  const { data } = useSelector(store => ({
    data: store.constructorIngredients.constructorIngredients
  }));

  const filteredItemsBun = useMemo(() => data.filter((filteredItem) => filteredItem.type === 'bun'), [data]);
  const otherBurgerItems = useMemo(() => data.filter((filteredItem) => filteredItem.type === 'main' || filteredItem.type === 'sauce'), [data]);

  const dispatch = useDispatch();

  const [, dropRef] = useDrop({
    accept: 'card',
    drop(dropIngredient) {
      dispatch(dropIngredients(dropIngredient))
    },
  });

  function orderClick() {
    const getBurgersId = () => { //Сортировка id бургеров, чтоб булки были вначале и вконце массива
      const ingredientsFromData = data.reduce((prevItem, nextItem) => {
        return [...prevItem, nextItem._id];
      }, []);
      const filteredItem = ingredientsFromData.splice(0, 1)[0];
      return [...ingredientsFromData, filteredItem]
    }
    const burgersId = getBurgersId();

    dispatch(getOrder())
    api.createOrder(burgersId)
      .then(orderData => {
        dispatch(getOrderSuccess(orderData))
      })
      .catch((err) => {
        dispatch(saveOrderError(err))
      })
  }

  function handleClick(item) {
    dispatch(getIngredientDetails(item));
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerDataPropTypes),
  handleIngredientClick: PropTypes.func,
  handleOrderClick: PropTypes.func,
}

export default BurgerConstructor;
