import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.navigation} >
        <div className={styles.order_navigation}>
          <a href={'#'} className={styles.link}>
            <BurgerIcon></BurgerIcon>
            <p className={styles.icon_caption}>Конструктор</p>
          </a>
          <a href={'#'} className={styles.link_active}>
            <ListIcon type="secondary"></ListIcon>
            <p className={styles.icon_caption}>Лента заказов</p>
          </a>

        </div>
        <div className={styles.logo} alt='логотип'>
          <Logo></Logo>
        </div>
        <div className={styles.profile_navigation}>
          <a href={'#'} className={styles.profile_link}>
            <ProfileIcon type="secondary"></ProfileIcon>
            <p className={styles.icon_caption}>Личный кабинет</p>
          </a>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;
