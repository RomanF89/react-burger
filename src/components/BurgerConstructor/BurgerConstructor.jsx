import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { burgerDataPropTypes } from '../../types/types';
import { api } from '../../utils/Api';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredientDetails, deleteIngredientDetails } from '../../services/actions/ingredientDetails';
import { getOrder } from '../../services/actions/orderDetails';
import { dropIngredients, deleteIngredient } from '../../services/actions/burgerConstructor';
import { useDrop } from 'react-dnd';
import { BurgerConstructorElement } from '../BurgerConstructorElement/BurgerConstructorElement';


function BurgerConstructor({ setError }) {
  const { data } = useSelector(store => ({
    data: store.constructorIngredients.constructorIngredients
  }));

  const { ingredientDetails } = useSelector(store => ({
    ingredientDetails: store.ingredientDetails.currentIngredientDetails
  }));

  const filteredItemsBun = React.useMemo(() => data.filter((filteredItem) => filteredItem.type === 'bun'), [data]);
  const otherBurgerItems = React.useMemo(() => data.filter((filteredItem) => filteredItem.type === 'main' || filteredItem.type === 'sauce'), [data]);
  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [modalType, setModalType] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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

    api.createOrder(burgersId)
      .then((orderData) => {
        dispatch(getOrder(orderData))
      })
      .then(() => {
        setIsModalOpen(true)
        setModalType('order')
      })
      .catch((err) => {
        setError(err)
      })
  }

  function handleClick(item) {
    dispatch(getIngredientDetails(item));
    setIsModalOpen(true);
    setModalType('ingredient');
  }

  function handleClose() {
    setIsModalOpen(false);
    dispatch(deleteIngredientDetails());
  }

  function handleDeleteIngredient(ingredient) {
    dispatch(deleteIngredient(ingredient))
  }

  React.useEffect(() => { // Общая цена ингредиентов
    const allIngredientsPrice = (filteredItemsBun.reduce(function (previousValue, value) {
      return previousValue + value.price
    }, 0) * 2) +
      otherBurgerItems.reduce(function (previousValue, value) {
        return previousValue + value.price
      }, 0)
    setCurrentPrice(allIngredientsPrice);
  }, [otherBurgerItems, filteredItemsBun, data]);


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
              otherBurgerItems.length ? otherBurgerItems.map((item, index) =>
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
        <span className={styles.order_price}>{currentPrice}</span>
        <div className={styles.currency_icon}>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" extraClass="ml-2" onClick={(e) => { orderClick() }}>
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal handleClose={handleClose}>
          {modalType === "ingredient" ? (
            <IngredientDetails data={ingredientDetails} />
          ) : (
            <OrderDetails />
          )}
        </Modal>
      )}
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerDataPropTypes),
  handleIngredientClick: PropTypes.func,
  handleOrderClick: PropTypes.func,
}

export default BurgerConstructor;
