import styles from './Card.module.css';
import { TIngredient } from '../../types/types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from '../../hooks';
import { useMemo } from 'react';


type TCardProps = {
  item: TIngredient,
  handleIngredientClick: Function,
}

const Card: React.FC<TCardProps> = ({ item, handleIngredientClick }) => {

  const constructorData = useSelector(state => state.constructorIngredients.constructorIngredients)

  //Рассчет количества ингредиентов пернесенных в Контруктор
  const itemsCount = useMemo(() => constructorData.filter((card) => card._id === item._id).length, [constructorData, item]);

  const [, dragRef] = useDrag({
    type: 'card',
    item: item,
  });

  function handleClick(cardItem: TIngredient) {
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


export default Card;
