import styles from './feedPage.module.css';
import { FeedCard } from '../components/FeedCard/FeedCard';
import { useHistory } from 'react-router-dom';
import { WEBSOCKET_SERVER_URL } from '../components/App/App';
import { useDispatch } from 'react-redux';
import { useSelector } from '../hooks';
import { feedConnect, feedDisconnect } from '../services/actions/feed';
import { useEffect } from 'react';
import { TOrderInfoFromApi } from '../types/types';


export const FeedPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  function handleClick(item: TOrderInfoFromApi) {
    history.replace(`/feed/${item.number}`, { modal: true, page: 'feed' })
  }

  const connect = () => dispatch(feedConnect(WEBSOCKET_SERVER_URL));
  const disconnect = () => dispatch(feedDisconnect());
  const feedData = useSelector( store => store.feedTable );

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    }
  }, [])

  if (feedData.data === null) {
    return null
  }

  let doneOrders;
  let pendingOrders;
  if (feedData.data.orders) {
    doneOrders = feedData.data.orders.filter((item) => item.status === 'done');
    pendingOrders = feedData.data.orders.filter((item) => item.status === 'pending');
  }

  //Разделение 50 послдених заказов на таблицы п0 10
  const { firstTable, secondTable, thirdTable, fourthTable, fifthTable } = {
    firstTable: doneOrders?.slice(0, 10),
    secondTable: doneOrders?.slice(10, 20),
    thirdTable: doneOrders?.slice(20, 30),
    fourthTable: doneOrders?.slice(30, 40),
    fifthTable: doneOrders?.slice(40, 50)
  }


  return (
    <section className={styles.feed_page}>
      <h1 className={styles.feed_title}>Лента заказов</h1>
      <div className={styles.feeds_area}>
        <div className={styles.orders_area}>
          {feedData?.data?.orders?.length && feedData.data.orders.map((item) =>
            <FeedCard cardClick={handleClick} key={item.number} item={item} />
          )}
        </div>
        <div className={styles.orders_data}>
          <div className={styles.orders_statistics}>
            <div className={styles.orders_statistics_column}>
              <h3 className={styles.orders_statistics_title}>Готовы</h3>
              <div className={styles.orders_finished}>
                <div className={styles.orders_table}>
                  {firstTable && firstTable.map((item) =>
                    <p className={styles.order_finished_numbers} key={item.number}>{item.number}</p>
                  )}
                </div>
                <div className={styles.orders_table}>
                  {secondTable && secondTable.map((item) =>
                    <p className={styles.order_finished_numbers} key={item.number}>{item.number}</p>
                  )}
                </div>
                <div className={styles.orders_table}>
                  {thirdTable && thirdTable.map((item) =>
                    <p className={styles.order_finished_numbers} key={item.number}>{item.number}</p>
                  )}
                </div>
                <div className={styles.orders_table}>
                  {fourthTable && fourthTable.map((item) =>
                    <p className={styles.order_finished_numbers} key={item.number}>{item.number}</p>
                  )}
                </div>
                <div className={styles.orders_table}>
                  {fifthTable && fifthTable.map((item) =>
                    <p className={styles.order_finished_numbers} key={item.number}>{item.number}</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.orders_in_progress}>
              <h3 className={styles.orders_statistics_title}>В работе:</h3>
              {pendingOrders && pendingOrders.map((item) =>
                <p className={styles.order_progress_numbers} key={item.number}>{item.number}</p>
              )}
            </div>
          </div>
          <h4 className={styles.orders_average}>Выполнено за все время</h4>
          <p className={styles.orders_average_count}>{feedData.data.total}</p>
          <h4 className={styles.orders_today}>Выполнено за сегодня</h4>
          <p className={styles.orders_today_count}>{feedData.data.totalToday}</p>
        </div>
      </div>
    </section>
  )
}
