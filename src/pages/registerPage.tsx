import AppHeader from "../components/AppHeader/AppHeader";
import styles from './loginPage.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { SetStateAction, useState } from "react";
import { registrationUser } from "../services/actions/authorization";
import { useDispatch } from "../hooks";

export const RegisterPage: React.FC = () => {

  const dispatch = useDispatch()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(registrationUser(email, password, name));
  }

  const onChangeValues = (e: { target: { name: string; value: SetStateAction<string>; }; }) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'name') {
      setName(e.target.value)
    }
  }

  return (
    <>
      <AppHeader></AppHeader>
      <section className={styles.register}>
        <form className={styles.form}>
          <h1 className={styles.form_title}>Регистрация</h1>
          <Input type="text" placeholder="Имя" name="name" value={name} onChange={onChangeValues} extraClass={styles.form_input}></Input>
          <Input type="email" placeholder="E-mail" name="email" value={email} onChange={onChangeValues} extraClass={styles.form_input}></Input>
          <Input type="password" placeholder="Пароль" name="password" value={password} onChange={onChangeValues} extraClass={styles.form_input} icon={'ShowIcon'}></Input>
          <Button htmlType="submit" type="primary" size="medium" extraClass={styles.form_button} onClick={registerClick}>
            Зарегистрироваться
          </Button>
          <div className={styles.redirect}>
            <span className={styles.redirect_description}>Уже зарегистрированы?</span>
            <Link to={'/login'} className={styles.redirect_link}>
              Войти
            </Link>
          </div>
        </form>
      </section>
    </>
  )
}
