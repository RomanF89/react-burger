import styles from './Card.module.css';
import PropTypes from 'prop-types';
import { burgerDataPropTypes } from '../../types/types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function Card({ item, handleIngredientClick }) {

  function handleClick (cardItem) {
    handleIngredientClick(cardItem);
  }

  return (
    <>
    <article className={styles.card} onClick={()=> handleClick(item)}>
      <Counter count={1} size="small" />
      <img className={styles.image} src={item.image} alt='Картинка'></img>
      <div className={styles.price_area}>
        <p className={styles.price}>{item.price}</p>
        <CurrencyIcon type='primary'></CurrencyIcon>
      </div>
      <h3 className={styles.card_name}>{item.name}</h3>
    </article>
    </>
  )
}


Card.propTypes = {
  item: burgerDataPropTypes.isRequired,
  handleIngredientClick: PropTypes.func,
}

export default Card;
