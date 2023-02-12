import styles from "./Main.module.css";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function Main(props) {
  const { ingredientData } = useSelector(store => ({
    ingredientData: store.ingredientDetails.currentIngredientDetails
  }));

  const { orderData}  = useSelector( store => ({
    orderData: store.orderDetails.currentOrder,
}))

  return (
    <main className={styles.content}>
      {props.children}
      {ingredientData && (<Modal>
        <IngredientDetails></IngredientDetails>
      </Modal>)}
      {orderData && (<Modal>
        <OrderDetails></OrderDetails>
      </Modal>)}
    </main>
  )

}

export default Main;
