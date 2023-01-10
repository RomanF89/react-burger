import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';


function BurgerConstructor({data, handleIngredientClick, handleOrderClick}) {
  const filteredItemsBun = data.filter((filteredItem) => filteredItem.type === 'bun');
  const otherBurgerItems = data.filter((filteredItem) => filteredItem.type === 'main' || filteredItem.type === 'sauce');
  const [currentPrice, setCurrentPrice] = React.useState(0);

  function ingredientClick (itemData) {
    handleIngredientClick(itemData);
  }

  function OrderClick () {
    handleOrderClick();
  }

  React.useEffect(() => {
    const price = data.reduce(function (previousValue, value) {
      return previousValue + value.price}, 0);
    setCurrentPrice(price)
  },[data])

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.constructor_ingredients}>
        <div className={styles.top_component} onClick={()=> ingredientClick(filteredItemsBun[0])}>
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
            <div className={styles.variable_component} key={item._id} onClick={()=> ingredientClick(item)}>
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

        <div className={styles.bottom_component} onClick={()=> ingredientClick(filteredItemsBun[1])}>
          <ConstructorElement
            type={filteredItemsBun[1].type}
            isLocked={true}
            text={filteredItemsBun[1].name}
            price={filteredItemsBun[1].price}
            thumbnail={filteredItemsBun[1].image}
            key={filteredItemsBun[1]._id}
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
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.array,
  handleIngredientClick: PropTypes.func,
  handleOrderClick: PropTypes.func,
}

export default BurgerConstructor;
