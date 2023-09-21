import styles from "./ordersPage.module.css";
import { FeedCard } from "../components/FeedCard/FeedCard";
import { ProfileNavigation } from "../components/ProfileNavigation/ProfileNavigation";
import { useHistory } from "react-router-dom";
import { ordersConnect, ordersDisconnect } from "../services/actions/orders";
import { useDispatch } from "react-redux";
import { useSelector } from "../hooks";
import { useEffect } from "react";
import { getCookie } from "../utils/getCookie";
import { TOrderInfoFromApi } from "../types/types";

export function OrdersPage() {

  const accessToken = getCookie('accessToken')!.replace('Bearer ', '');
  const WEBSOCKET_PROFILE_SERVER_URL = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
  const history = useHistory();
  const dispatch = useDispatch();

  function handleClick(item: TOrderInfoFromApi) {
    history.replace(`/profile/orders/${item.number}`, { modal: true, page: 'orders' })
  }

  const connect = () => dispatch(ordersConnect(WEBSOCKET_PROFILE_SERVER_URL));
  const disconnect = () => dispatch(ordersDisconnect());

  const ordersData = useSelector(store => store.ordersTable);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    }
  }, [])

  return (
    <section className={styles.orders_page}>
      <ProfileNavigation page_style={'orders_page'} />
      <div className={styles.card_area}>
        {ordersData?.data?.orders?.length && ordersData.data.orders.map((item) =>
          <FeedCard cardStyle={'orders_page'} cardClick={handleClick} key={item.number} item={item} />
        )}
      </div>
    </section>
  )
}
