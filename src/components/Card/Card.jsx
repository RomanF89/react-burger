import styles from './Card.module.css';
import PropTypes from 'prop-types';
import { burgerDataPropTypes } from '../../types/types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

function Card({ item, handleIngredientClick }) {

  const getData = (store) => (store.constructorIngredients.constructorIngredients);
  const constructorData = useSelector(getData);

  //Рассчет количества ингредиентов пернесенных в Контруктор
  const itemsCount = useMemo(() => constructorData.filter((card) => card._id === item._id).length, [constructorData, item]);

  const [, dragRef] = useDrag({
    type: 'card',
    item: item,
  });

  function handleClick(cardItem) {
    handleIngredientClick(cardItem);
  }

  return (
    <>
      <article ref={dragRef} className={styles.card} onClick={() => handleClick(item)}>
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
