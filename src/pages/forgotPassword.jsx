import AppHeader from "../components/AppHeader/AppHeader";
import styles from './loginPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { api } from "../utils/Api";
import { useState } from "react";


export function ForgotPasswordPage() {

  const [mail, setMail] = useState('');

  const history = useHistory();

  const onChangeMail = (e) => {
    setMail(e.target.value);
  }

  const handleResetPassword = (e) => {
    e.preventDefault();
    api.resetPassword(mail)
      .then((res)=> {
        if (res.message === 'Reset email sent') {
          history.push('/reset-password', 'Access') // Передача Access в state, защита маршрута /reset-password от пользователей, которые не заходили на маршрут /forgot-password
        }
      })
      .catch((err)=> {
        console.log(err)
      })
  }

  return (
    <>
      <AppHeader></AppHeader>
      <section className={styles.forgot_password}>
        <form className={styles.form}>
          <h1 className={styles.form_title}>Восстановление пароля</h1>
          <Input type="email" placeholder="Укажите e-mail" onChange={onChangeMail} value={mail} extraClass={styles.form_input}></Input>
          <Button htmlType="submit" type="primary" size="medium" onClick={handleResetPassword} extraClass={styles.form_button}>
            Восстановить
          </Button>
          <div className={styles.redirect}>
            <span className={styles.redirect_description}>Вспомнили пароль?</span>
            <Link to={'/login'} className={styles.redirect_link}>
              Войти
            </Link>
          </div>
        </form>

      </section>
    </>
  )
}
