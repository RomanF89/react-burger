import styles from "./Main.module.css";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function Main(props) {

  const getData = (store) => (store.ingredientDetails.currentIngredientDetails);
  const getOrder = (store) => (store.orderDetails.currentOrder)
  const ingredientData  = useSelector(getData);
  const orderData = useSelector(getOrder);

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
