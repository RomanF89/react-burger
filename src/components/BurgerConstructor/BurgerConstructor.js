import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { burgerDataPropTypes } from '../../types/types';
import { AppContext } from '../../utils/AppContext';
import { api } from '../../utils/Api';


function BurgerConstructor() {
  const {data, setError, setOrderData, orderData} = useContext(AppContext);
  const filteredItemsBun = data.filter((filteredItem) => filteredItem.type === 'bun');
  const otherBurgerItems = data.filter((filteredItem) => filteredItem.type === 'main' || filteredItem.type === 'sauce');
  const burgersId = data.reduce((prevItem, nextItem) => {
    return [...prevItem, nextItem._id]
  },[]);

  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [modalType, setModalType] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({});

  function OrderClick () {
    setOrderData('');
    setIsModalOpen(true);
    setModalType('order');
    api.createOrder(burgersId)
      .then((orderData) => {
        setOrderData(orderData)
      })
      .catch((err) =>
        setError(err))
  }

  function handleClick(item) {
    setIsModalOpen(true);
    setModalData(item);
    setModalType('ingredient');
  }

  function handleClose () {
    setIsModalOpen(false);
  }

  React.useEffect(() => {
    const otherIngredientsPrice = otherBurgerItems.reduce(function (previousValue, value) {
      return previousValue + value.price}, 0);
    setCurrentPrice(otherIngredientsPrice + (filteredItemsBun[0].price * 2))
  },[otherBurgerItems, filteredItemsBun])

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.constructor_ingredients}>
        <div className={styles.top_component} onClick={()=> handleClick(filteredItemsBun[0])}>
          <ConstructorElement
            type={filteredItemsBun[0].type}
            isLocked={true}
            text={filteredItemsBun[0].name}
            price={filteredItemsBun[0].price}
            thumbnail={filteredItemsBun[0].image}
            key={filteredItemsBun[0]._id}
          />
        </div>

        <div className={styles.variable_components}>
          {otherBurgerItems.map((item) =>
            <div className={styles.variable_component} key={item._id} onClick={()=> handleClick(item)}>
              <div className={styles.icon} >
                <DragIcon></DragIcon>
              </div>
              <ConstructorElement
                type={item.type}
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          )}
        </div>

        <div className={styles.bottom_component} onClick={()=> handleClick(filteredItemsBun[0])}>
          <ConstructorElement
            type={filteredItemsBun[0].type}
            isLocked={true}
            text={filteredItemsBun[0].name}
            price={filteredItemsBun[0].price}
            thumbnail={filteredItemsBun[0].image}
            key={filteredItemsBun[0]._id}
          />
        </div>
      </div>

      <div className={styles.order_field}>
        <span className={styles.order_price}>{currentPrice}</span>
        <div className={styles.currency_icon}>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" extraClass="ml-2" onClick={OrderClick}>
          Оформить заказ
        </Button>
      </div>
    <Modal isOpen={isModalOpen} handleClose={handleClose}>
      { modalType === 'ingredient' ? <IngredientDetails data={modalData}></IngredientDetails> : ( orderData.order ? <OrderDetails orderData={orderData}></OrderDetails> : '' )}
    </Modal>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerDataPropTypes),
  handleIngredientClick: PropTypes.func,
  handleOrderClick: PropTypes.func,
}

export default BurgerConstructor;
