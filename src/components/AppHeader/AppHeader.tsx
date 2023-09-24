import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import { NavLink, useLocation } from 'react-router-dom';

function AppHeader() {

  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.navigation} >
        <div className={styles.order_navigation}>
          <NavLink to={'/'} className={location.pathname === '/' ? styles.link_active : styles.link}>
            <BurgerIcon type={'secondary'}></BurgerIcon>
            <p className={styles.icon_caption}>Конструктор</p>
          </NavLink>
          <NavLink to={'/feed'} activeClassName={styles.link_active} className={styles.link}>
            <ListIcon type="secondary"></ListIcon>
            <p className={styles.icon_caption}>Лента заказов</p>
          </NavLink>

        </div>
        <div className={styles.logo}>
          <Logo></Logo>
        </div>
        <div className={styles.profile_navigation}>
          <NavLink to={'/profile'} activeClassName={styles.link_active} className={styles.link}>
            <ProfileIcon type="secondary"></ProfileIcon>
            <p className={styles.icon_caption}>Личный кабинет</p>
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;
