import styles from './OrderDetails.module.css';
import orderImagePath from '../../images/orderAccepted.svg';

function OrderDetails() {
  return (
    <section className={styles.order_details}>
      <span className={styles.order_number}>034536</span>
      <h4 className={styles.order_identificator}>Идентификатор Заказа</h4>
      <img className={styles.order_image} src={orderImagePath} alt={'Заказ принят'}></img>
      <p className={styles.accept_message}>Ваш заказ начали готовить</p>
      <p className={styles.wait_message}>Дождитесь готовности на орбитальной станции</p>
    </section>
  )
}

export default OrderDetails;
