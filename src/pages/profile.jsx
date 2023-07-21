import { Link, NavLink, useHistory } from "react-router-dom";
import AppHeader from "../components/AppHeader/AppHeader";
import styles from "./profile.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { updateUser, refreshToken, logoutUser } from "../services/actions/authorization";

export function ProfilePage() {

  const history = useHistory();
  const dispatch = useDispatch();

  const { data } = useSelector(store => ({
    data: store.authorization
  }))

  const onUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUser(email, name));
  }

  const undoChanges = (e) => {
    e.preventDefault();
    dispatch(updateUser(data.prevUserState.email, data.prevUserState.name));

  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeValues = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'name') {
      setName(e.target.value)
    }
  }

  useEffect(() => {
    if (data.currentUser) {
      setName(data.currentUser.name);
      setEmail(data.currentUser.email)
    }
  }, [data.currentUser])

  useEffect(() => {
    if (data.updateUserError === 'Ошибка 403') {
      dispatch(refreshToken(updateUser(email, name))); // При ошибке обновления данные в полях сбросятся к актуальным значениям.

    }
  }, [data.updateUserError]);

  const logoutClick = useCallback((e) => {
    e.preventDefault();
    dispatch(logoutUser());
    if (data.currentUser === null) {
      history.push('/login');
    }

  }, [dispatch, history, data])


  return (
    <>
      <AppHeader></AppHeader>
      <section className={styles.profile}>
        <nav className={styles.navigation_panel}>
          <NavLink to={'/profile'} className={styles.navigation_link} activeClassName={styles.navigation_link_active}>Профиль</NavLink>
          <NavLink to={'/profile/orders'} className={styles.navigation_link}>История заказов</NavLink>
          <Link onClick={logoutClick} to={'#'} className={styles.navigation_link}>Выход</Link>
        </nav>
        <form className={styles.profile_inputs} onSubmit={onUpdateUser}>
          <Input type="text" name="name" placeholder="Имя" value={name} onChange={onChangeValues} extraClass={styles.profile_input} icon={'EditIcon'}></Input>
          <Input type="email" name="email" placeholder="Логин" value={email} onChange={onChangeValues} extraClass={styles.profile_input} icon={'EditIcon'}></Input>
          <Input type="password" name="password" placeholder="Пароль" value={password} onChange={onChangeValues} extraClass={styles.profile_input} icon={'EditIcon'}></Input>
          <div className={styles.buttons_area}>
            <Button htmlType="button" type="secondary" size="medium" onClick={undoChanges}>Отмена</Button>
            <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
          </div>
        </form>
      </section>
    </>
  )
}
