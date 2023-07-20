import AppHeader from "../components/AppHeader/AppHeader";
import styles from './loginPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../utils/Api";
import { useHistory, Redirect } from "react-router-dom";


export function ResetPasswordPage() {

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const history = useHistory();

  const onChangeValues = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'token') {
      setToken(e.target.value)
    }
  }

  const handleResetPassword = (e) => {
    e.preventDefault();
    api.createNewPassword(password, token)
      .then((res) => {
        console.log(res)
      })
      .catch((err)=> {
        console.log(err)
      })
  }

  if (history.location.state !== 'Access') { // Защита маршрута /reset-password от пользователей, которые не заходили на маршрут /forgot-password
    return (
       <Redirect to={{ pathname: '/' }}/>
    )
  }

  return (
    <>
      <AppHeader></AppHeader>
      <section className={styles.forgot_password}>
        <form className={styles.form}>
          <h1 className={styles.form_title}>Восстановление пароля</h1>
          <Input type="password" name="password" placeholder="Введите новый пароль" value={password} onChange={onChangeValues} extraClass={styles.form_input} icon={'ShowIcon'}></Input>
          <Input type="password" name="token" placeholder="Введите код из письма" value={token} onChange={onChangeValues} extraClass={styles.form_input}></Input>
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
