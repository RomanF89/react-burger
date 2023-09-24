import styles from './OrderDetails.module.css';
import orderImagePath from '../../images/orderAccepted.svg';
import { useSelector } from '../../hooks';


function OrderDetails() {
  const orderData = useSelector(state => state.orderDetails.currentOrder)

  return (
    <>
      {orderData && <section className={styles.order_details}>
        <span className={styles.order_number}>{orderData.success ? orderData.order.number : ''}</span>
        <h4 className={styles.order_identificator}>{orderData.success ? 'Идентификатор Заказа' : 'Произошла ошибка'}</h4>
        <img className={styles.order_image} src={orderImagePath} alt={'Заказ принят'}></img>
        <p className={styles.accept_message}>{orderData.success ? 'Ваш заказ начали готовить' : ''} </p>
        <p className={styles.wait_message}>{orderData.success ? 'Дождитесь готовности на орбитальной станции' : ''}</p>
      </section>
      }
    </>
  )
}


export default OrderDetails;
