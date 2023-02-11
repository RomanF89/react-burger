import styles from './Card.module.css';
import PropTypes from 'prop-types';
import { burgerDataPropTypes } from '../../types/types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

function Card({ item, handleIngredientClick }) {

  const { constructorData } = useSelector(store => ({
    constructorData: store.constructorIngredients.constructorIngredients
  }));

  let itemsCount = constructorData.filter((card) => card._id === item._id).length; //Рассчет количества ингредиентов пернесенных в Контруктор

  const [, dragRef] = useDrag({
    type: 'card',
    item: item,
  });

  function handleClick (cardItem) {
    handleIngredientClick(cardItem);
  }

  return (
    <>
    <article ref={dragRef} className={styles.card} onClick={()=> handleClick(item)}>
      <Counter count={itemsCount} size="small" />
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
