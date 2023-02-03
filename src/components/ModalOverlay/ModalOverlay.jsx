import React from 'react';
import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ isOpen, children }) {

  return (
    <section className={isOpen ? styles.modal_opened : styles.modal_overlay} >
      {children}
    </section>
  )
}

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool,
}

export default ModalOverlay;
