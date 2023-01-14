import styles from './Modal.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import burgerDataPropTypes from '../../types/types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';


const modalRoot = document.querySelector('#modal_container')


function Modal({children, isOpen, handleClose }) {

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function handleModalClose() {
    handleClose();
    setIsModalOpen(false);
  }

  const hanldleEscClose = (e) => {
    if (isModalOpen === true) {
      if (e.code === "Escape") {
        handleModalClose();
      }
    }
  }

  React.useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen])

  React.useEffect(() => {
    document.addEventListener('keydown', hanldleEscClose);
    return () => {
      document.removeEventListener('keydown', hanldleEscClose);
    }
  }, [isModalOpen])

  return ReactDOM.createPortal(
    <div onClick={() => { handleModalClose() }}>
      <ModalOverlay isOpen={isModalOpen}>
        <div className={isModalOpen ? styles.modal_opened : styles.modal} onClick={(e) => e.stopPropagation()}>
          <button className={styles.close_icon} onClick={handleModalClose}>
            <CloseIcon></CloseIcon>
          </button>
          {children}
        </div>
      </ModalOverlay>
    </div>
    , modalRoot
  )
}

Modal.propTypes = {
  data: burgerDataPropTypes,
  type: PropTypes.string,
  closeModals: PropTypes.func,
}

export default Modal;
