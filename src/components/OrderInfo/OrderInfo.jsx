import styles from "./OrderInfo.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { api } from "../../utils/Api";

export function OrderInfo() {

  const { number } = useParams();
  const [currentOrder, setCurrentOder] = useState({});
  const [orderError, setOrderError] = useState('')

  const getData = (store) => (store.ingredients.ingredientsFromRequest);
  const data = useSelector(getData);

  //Поиск текущего заказа по номеру
  const order = () => {
    api.getOrder(number)
      .then((res) => {
        setCurrentOder(res.orders[0]);
      })
      .catch((err) => setOrderError(err));
  }

  useEffect(() => {
    order();
  }, [])

  //Поиск ингредиентов заказа для отрисовки
  let currentIngredients = [];
  if (currentOrder.ingredients) {
    currentOrder.ingredients.forEach((ingredient) => {
      currentIngredients.push(data.find((items) => items._id === ingredient))
    })
  }

  const price = currentIngredients.length && currentIngredients.reduce(function (previousValue, value) {
    return previousValue + value.price
  }, 0)

  const dateOptions = { weekday: 'long', hour: 'numeric', minute: 'numeric', timeZone: 'UTC', timeZoneName: 'short' };
  const date = new Date(currentOrder.createdAt).toLocaleDateString('ru-RU', dateOptions);

  currentIngredients.length && currentIngredients.forEach((ingredient) => {
    ingredient.count = 0;
  for (let item of currentIngredients) {
    if(ingredient.name === item.name) {
      ingredient.count = ingredient.count + 1;
    }
  }
  })

  const uniqueIngredients = currentIngredients.filter((x, i) => currentIngredients.indexOf(x) === i);

  return (
    orderError ? <h2 className={styles.order_error}>{orderError}</h2> :
    currentOrder.ingredients && <section className={styles.order_info}>
      <h3 className={styles.order_number}>{currentOrder.number}</h3>
      <h2 className={styles.order_name}>{currentOrder.name}</h2>
      <p className={styles.order_progress}>{currentOrder.status === 'done' ? 'Выполнен' : 'Готовится'}</p>
      <p className={styles.order_consist}>Состав</p>
      <div className={styles.order_consist_area}>
        {
          uniqueIngredients.map((item) => <article className={styles.order_ingredient} key={item._id + Math.random()}>
            <div className={styles.ingredient_area}>
              <img className={styles.ingredient_image} src={item.image} alt={'ingredient_image'}></img>
              <p className={styles.ingredient_name}>{item.name}</p>
            </div>
            <div className={styles.price_area}>
              <p className={styles.price}>{`${item.count} x ${item.price}`}</p>
              <CurrencyIcon type='primary'></CurrencyIcon>
            </div>
          </article>)
        }
      </div>
      <div className={styles.order_details_area}>
        <p className={styles.order_date}>{date}</p>
        <div className={styles.average_price_area}>
          <p className={styles.average_price}>{price}</p>
          <CurrencyIcon type='primary'></CurrencyIcon>
        </div>
      </div>
    </section>

  )
}
