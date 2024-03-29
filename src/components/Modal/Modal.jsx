import styles from './Modal.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { burgerDataPropTypes } from '../../types/types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { deleteOrder } from '../../services/actions/orderDetails';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';


const modalRoot = document.querySelector('#modal_container')


function Modal({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();


  function handleModalClose() {
    if (location.state?.page === 'feed') {
      history.push("/feed");
      return;
    } else if ( location.state?.page === 'orders' ) {
      history.push("/profile/orders");
      return;
    }
    dispatch(deleteOrder());
    history.push("/");
  }

  const hanldleEscClose = (e) => {
    if (e.code === "Escape") {
      handleModalClose();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', hanldleEscClose);
    return () => {
      document.removeEventListener('keydown', hanldleEscClose);
    }
  }, [])

  return ReactDOM.createPortal(
    <div onClick={() => { handleModalClose() }}>
      <ModalOverlay >
        <div className={styles.modal_opened} onClick={(e) => e.stopPropagation()}>
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
