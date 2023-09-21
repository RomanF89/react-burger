import styles from "./OrderInfo.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "../../hooks";
import { api } from "../../utils/Api";
import { TDateType } from "../../types/types";
import { TIngredient } from "../../types/types";


type TOrderParams = {
  number: string;
}

type TOrderInfoFromApi = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  owner: string;
  status: string;
  updatedAt: string;
  _v: number;
  _id: string;
} | null


export const OrderInfo: React.FC = () => {

  const { number } = useParams<TOrderParams>();
  const [currentOrder, setCurrentOder] = useState<TOrderInfoFromApi>(null);
  const [orderError, setOrderError] = useState('');

  const data = useSelector(store => store.ingredients.ingredientsFromRequest)


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

  if (currentOrder === null) {
    return null;
  }


  let currentIngredients: (TIngredient | undefined)[] = [];
  if (currentOrder.ingredients) {
    currentOrder.ingredients.forEach((ingredient) => {
      currentIngredients.push(data.find((items) => items._id === ingredient))
    })
  }

  const price = currentIngredients.length && currentIngredients.reduce(function (previousValue, value) {
    return previousValue + value!.price
  }, 0)

  const dateOptions: TDateType = { weekday: 'long', hour: 'numeric', minute: 'numeric', timeZone: 'UTC', timeZoneName: 'short' };
  const date = new Date(currentOrder.createdAt).toLocaleDateString('ru-RU', dateOptions);

  currentIngredients.length && currentIngredients.forEach((ingredient) => {
    ingredient!.count = 0;
    for (let item of currentIngredients) {
      if (ingredient!.name === item!.name) {
        ingredient!.count = ingredient!.count + 1;
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
            uniqueIngredients.length && uniqueIngredients.map((item) => <article className={styles.order_ingredient} key={item!._id + Math.random()}>
              <div className={styles.ingredient_area}>
                <img className={styles.ingredient_image} src={item!.image} alt={'ingredient_image'}></img>
                <p className={styles.ingredient_name}>{item!.name}</p>
              </div>
              <div className={styles.price_area}>
                <p className={styles.price}>{`${item!.count} x ${item!.price}`}</p>
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
