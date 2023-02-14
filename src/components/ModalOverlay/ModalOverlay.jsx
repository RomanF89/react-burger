import React from 'react';
import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ children }) {
  return (
    <section className={styles.modal_opened} >
      {children}
    </section>
  )
}

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool,
}

export default ModalOverlay;
