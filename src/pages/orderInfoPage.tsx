import styles from './orderInfoPage.module.css';
import { OrderInfo } from '../components/OrderInfo/OrderInfo';

export const OrderInfoPage: React.FC = () => {
  return (
    <section className={styles.order_info_page}>
      <OrderInfo/>
    </section>
  )

}
