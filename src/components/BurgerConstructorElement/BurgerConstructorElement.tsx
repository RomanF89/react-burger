import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../types/types';
import styles from './BurgerConstructorElement.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { sortIngredients } from '../../services/actions/burgerConstructor';
import { useDispatch } from '../../hooks';

type TConstructorPropTypes = {
  item: TIngredient;
  index: number;
  ingredientClick: Function;
  handleDelete: Function;
}

type TDragitem = {
  index: number
}

export const BurgerConstructorElement: React.FC<TConstructorPropTypes> = ({ item, index, ingredientClick, handleDelete }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'sortCards',
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })

  });

  const [, elementDropRef] = useDrop({
    accept: 'sortCards',
    drop: (dragItem: TDragitem) => {
      const dragIndex = dragItem.index;
      const hoverIndex = index;
      dispatch(sortIngredients(dragIndex, hoverIndex)); // При дропе сортировка заменой через индексы
      dragItem.index = hoverIndex;
    },
  });

  const ref = useRef<HTMLDivElement>(null);
  dragRef(elementDropRef(ref)); // Общий ref


  function handleClick(item: TIngredient) {
    ingredientClick(item);
  }

  function handleDeleteIngredient(item: TIngredient) {
    handleDelete(item);
  }

  return (
    item.type !== 'bun' ?
      (isDragging ? <div ref={ref} className={styles.empty_element}></div> : //Отрисовка пустого элемента в момент перетаскивания
        <div ref={ref} className={styles.element} onClick={(e) => { handleClick(item) }}>
          <div className={styles.icon} >
            <DragIcon type={'secondary'} ></DragIcon>
          </div>
          <ConstructorElement
            handleClose={(e: {stopPropagation: () => void; }) => {
              handleDeleteIngredient(item);
              e.stopPropagation();
            }}
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
          />
        </div>
      ) : null
  )
}

