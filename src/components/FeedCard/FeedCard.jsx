import styles from './FeedCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { feedDataPropsTypes } from '../../types/types';


export function FeedCard({ cardStyle, cardClick, item }) {

  const isOrdersPage = cardStyle === "orders_page" ? true : null;
  const { data } = useSelector(store => ({
    data: store.ingredients.ingredientsFromRequest,
  }));

  //Проверка каждого ингердиента и создание массива
  let currentIngredients = [];
  const filterIngredients = item.ingredients.length > 1 && item.ingredients.every((items) => items !== null && items !== undefined);
  if (filterIngredients) {
    item.ingredients.forEach((ingredient) => {
      currentIngredients.push(data.find((item) => item._id === ingredient))
    })
  } else {
    return
  }

  const ingredientsOnCard = currentIngredients.slice(0, 6); // Первые 6 ингредиентов для рендера
  const lastIngredientsCount = '+' + (currentIngredients.length - ingredientsOnCard.length) // Количество оставшихся ингредиентов
  const price = currentIngredients.reduce(function (previousValue, value) {
    return previousValue + value?.price
  }, 0)

  const dateOptions = { weekday: 'long', hour: 'numeric', minute: 'numeric', timeZone: 'UTC', timeZoneName: 'short' };
  const date = new Date(item.createdAt).toLocaleDateString('ru-RU', dateOptions);

  let status;
  if (item.status === 'done') {
    status = 'Выполнен';
  }
  else if (item.status === 'pendding') {
    status = 'Выполняется';
  } else if (item.status === 'created') {
    status = 'Создан';
  }


  return (
    <article className={styles.card} onClick={() => cardClick(item)}>
      <div className={styles.order_info}>
        <h3 className={styles.order_number}>#{item.number}</h3>
        <h3 className={styles.order_date}>{date}</h3>
      </div>
      <h2 className={styles.order_name}>{item.name}</h2>
      {isOrdersPage ? <p className={status === 'Выполнен' ? styles.order_progress_done : styles.order_progress}>{status}</p> : null}
      <div className={styles.ingredients_info}>
        <div className={styles.ingredients}>
          {
            ingredientsOnCard.length && ingredientsOnCard.map((item) =>
              <img className={styles.ingredient_image} src={item.image} alt={'card_image'} key={item._id + Math.random()}></img>
            )
          }
          {currentIngredients.length > 6 ? <p className={styles.last_ingredient_count}>{lastIngredientsCount}</p> : null}
        </div>
        <div className={styles.price_area}>
          <p className={styles.price}>{price}</p>
          <CurrencyIcon type='primary'></CurrencyIcon>
        </div>
      </div>
    </article>
  )
}

FeedCard.propTypes = {
  item: feedDataPropsTypes.isRequired,
  handleIngredientClick: PropTypes.func,
  cardStyle: PropTypes.string,
}
