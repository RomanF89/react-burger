import React from 'react';
import styles from './ModalOverlay.module.css';


type TModalOverlayProps = {
  children: JSX.Element;
}

const ModalOverlay: React.FC<TModalOverlayProps> = ({ children }) => {
  return (
    <section className={styles.modal_opened} >
      {children}
    </section>
  )
}

export default ModalOverlay;
