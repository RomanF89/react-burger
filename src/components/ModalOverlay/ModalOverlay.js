import React from 'react';
import styles from './ModalOverlay.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import burgerDataPropTypes from '../../types/types';
import Modal from '../Modal/Modal';

const modalRoot = document.querySelector('#modal_container')


function ModalOverlay({ isOpen, type, data, closeModals }) {

  function handleClick(e) {
    if (e.target === e.currentTarget) {
      closeModals();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', hanldleEscClose);
    return () => {
      document.removeEventListener('keydown', hanldleEscClose);
    }
  }, [isOpen])

  const hanldleEscClose = (e) => {
    if (isOpen === true) {
      if (e.code === "Escape") {
        closeModals();
      }
    }
  }

  return ReactDOM.createPortal(
    <section className={isOpen ? styles.modal_opened : styles.modal_overlay} onClick={handleClick}>
      <Modal data={data} type={type} closeModals={closeModals}></Modal>
    </section>,
    modalRoot
  )
}

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool,
  data: burgerDataPropTypes,
  type: PropTypes.string,
  closeModals: PropTypes.func,
}

export default ModalOverlay;
