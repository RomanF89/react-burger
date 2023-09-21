import styles from "./Main.module.css";
import Modal from "../Modal/Modal";
import { useSelector } from "../../hooks";
import OrderDetails from "../OrderDetails/OrderDetails";
import React from "react";


type TMainProps = {
  children: JSX.Element
}

const Main: React.FC<TMainProps> = ({ children }) => {

  const orderData = useSelector(store => store.orderDetails.currentOrder)

  return (
    <main className={styles.content}>
      {children}
      {orderData && (<Modal>
        <OrderDetails></OrderDetails>
      </Modal>)}
    </main>
  )

}

export default Main;
