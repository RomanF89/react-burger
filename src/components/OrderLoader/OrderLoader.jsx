import styles from './OrderLoader.module.css'

export function OrderLoader() {
  return (
    <div className={styles.loader}>
      <h2 className={styles.loader_title}>Ваш заказ готовится...</h2>
    </div>
  )
}
