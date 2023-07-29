import React from 'react';
import styles from './ModalOverlay.module.css';

function ModalOverlay({ children }) {
  return (
    <section className={styles.modal_opened} >
      {children}
    </section>
  )
}

export default ModalOverlay;
