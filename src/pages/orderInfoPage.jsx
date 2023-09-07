import styles from './orderInfoPage.module.css';
import { OrderInfo } from '../components/OrderInfo/OrderInfo';

export function OrderInfoPage() {


  return (
    <section className={styles.order_info_page}>
      <OrderInfo/>
    </section>
  )

}
