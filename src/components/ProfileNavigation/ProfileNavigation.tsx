import styles from "./ProfileNavigation.module.css";
import { Link, useHistory } from "react-router-dom";
import { useCallback } from "react";
import { logoutUser } from "../../services/actions/authorization";
import { useSelector } from "../../hooks";
import { useDispatch } from "../../hooks";

type TProfileNavigationProps = {
  page_style: 'orders_page' | 'profile_page';
}

export const ProfileNavigation: React.FC<TProfileNavigationProps> = ({ page_style }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const isOrdersPage = page_style === 'orders_page' ? true : false;
  const isProfilePage = page_style === 'profile_page' ? true : false;

  const data = useSelector(store => store.authorization);

  const logoutClick = useCallback((e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(logoutUser());
    if (data.currentUser === null) {
      history.push('/login');
    }
  }, [dispatch, history, data])


  return (
    <nav className={isOrdersPage ? styles.navigation_panel_orders : styles.navigation_panel}>
      <Link to={'/profile'} className={isProfilePage ? styles.navigation_link_active : styles.navigation_link}>Профиль</Link>
      <Link to={'/profile/orders'} className={isOrdersPage ? styles.navigation_link_active : styles.navigation_link}>История заказов</Link>
      <Link onClick={logoutClick} to={'#'} className={styles.navigation_link}>Выход</Link>
      {isOrdersPage ? <p className={styles.navigation_description}>В этом разделе вы можете просмотреть свою историю заказов</p> : null}
      {isProfilePage ? <p className={styles.navigation_description}>В этом разделе вы можете изменить свои персональные данные</p> : null}
    </nav>
  )
}
