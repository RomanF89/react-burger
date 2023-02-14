import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerDataPropTypes } from '../../types/types';
import styles from './BurgerConstructorElement.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { sortIngredients } from '../../services/actions/burgerConstructor';
import { useDispatch } from 'react-redux';

export function BurgerConstructorElement({ item, index, ingredientClick, handleDelete }) {
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'sortCards',
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })

  });

  const [, elementDropRef] = useDrop({
    accept: 'sortCards',
    drop: (dragItem) => {
      const dragIndex = dragItem.index;
      const hoverIndex = index;
      dispatch(sortIngredients(dragIndex, hoverIndex)); // При дропе сортировка заменой через индексы
      dragItem.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(elementDropRef(ref)); // Общий ref


  function handleClick(item) {
    ingredientClick(item)
  }

  function handleDeleteIngredient(item) {
    handleDelete(item)
  }

  return (
    item.type !== 'bun' &&
    (isDragging ? <div ref={dragDropRef} className={styles.empty_element}></div> : //Отрисовка пустого элемента в момент перетаскивания
      <div ref={dragDropRef} className={styles.element} onClick={(e) => { handleClick(item) }}>
        <div className={styles.icon} >
          <DragIcon ></DragIcon>
        </div>
        <ConstructorElement
          handleClose={(e) => {
            handleDeleteIngredient(item);
            e.stopPropagation();
          }}
          type={item.type}
          isLocked={false}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        />
      </div>
    )
  )
}

BurgerConstructorElement.propTypes = {
  item: burgerDataPropTypes.isRequired,
  index: PropTypes.number,
  ingredientClick: PropTypes.func,
  handleDelete: PropTypes.func,
}
