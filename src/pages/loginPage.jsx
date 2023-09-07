import AppHeader from "../components/AppHeader/AppHeader";
import styles from './loginPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginUser } from "../services/actions/authorization";


export function LoginPage() {

  const history = useHistory();
  const dispatch = useDispatch();

  const getAuth = (store) => (store.authorization);
  const auth = useSelector(getAuth);

  const redirectLink = history.location.state ? history.location.state.path : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginClick = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
    if (auth.currentUser) {
      history.push(redirectLink);
    }
  }

  const onChangeValues = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
  }

  return (
    <>
      <AppHeader></AppHeader>
      <section className={styles.login}>
        <form className={styles.form}>
          <h1 className={styles.form_title}>Вход</h1>
          <Input type="email" placeholder="E-mail" name="email" value={email} onChange={onChangeValues} extraClass={styles.form_input}></Input>
          <Input type="password" placeholder="Пароль" name="password" value={password} onChange={onChangeValues} extraClass={styles.form_input} icon={'ShowIcon'}></Input>
          <Button htmlType="submit" type="primary" size="medium" onClick={loginClick} extraClass={styles.form_button}>
            Войти
          </Button>
          <div className={styles.redirect}>
            <span className={styles.redirect_description}>Вы новый пользователь?</span>
            <Link to={'/registration'} className={styles.redirect_link}>
              Зарегистрироваться
            </Link>
          </div>
          <div className={styles.redirect}>
            <span className={styles.redirect_description}>Забыли пароль?</span>
            <Link to={'/forgot-password'} className={styles.redirect_link}>
              Восстановить пароль
            </Link>
          </div>
        </form>

      </section>
    </>
  )
}
