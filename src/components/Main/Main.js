import styles from "./Main.module.css"

function Main(props) {
  return (
    <main className={styles.content}>
      {props.children}
    </main>
  )
}

export default Main;
