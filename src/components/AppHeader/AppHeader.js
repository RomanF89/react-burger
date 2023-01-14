import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.navigation} >
        <div className={styles.order_navigation}>
          <div className={styles.link}>
            <BurgerIcon></BurgerIcon>
            <p className={styles.icon_caption}>Конструктор</p>
          </div>
          <div className={styles.link_active}>
            <ListIcon type="secondary"></ListIcon>
            <p className={styles.icon_caption}>Лента заказов</p>
          </div>

        </div>
        <div className={styles.logo} alt='логотип'>
          <Logo></Logo>
        </div>
        <div className={styles.profile_navigation}>
          <div className={styles.profile_link}>
            <ProfileIcon type="secondary"></ProfileIcon>
            <p className={styles.icon_caption}>Личный кабинет</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;
