import styles from './Modal.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import burgerDataPropTypes from '../../types/types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';


function Modal({ data, type, closeModals }) {

  function handleModalClose () {
    closeModals();
  }

  if (type === 'ingredientDetails') {
    return (
      <div className={styles.modal}>
        <button className={styles.close_icon} onClick={handleModalClose}>
          <CloseIcon></CloseIcon>
        </button>
        <IngredientDetails data={data}></IngredientDetails>
      </div>
    )
  } else if (type === 'orderDetails') {
    return (
      <div className={styles.modal}>
        <button className={styles.close_icon} onClick={handleModalClose}>
          <CloseIcon></CloseIcon>
        </button>
        <OrderDetails></OrderDetails>
      </div>
    )
  }
}

Modal.propTypes = {
  data: burgerDataPropTypes,
  type: PropTypes.string,
  closeModals: PropTypes.func,
}

export default Modal;
