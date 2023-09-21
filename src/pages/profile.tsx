import styles from "./profile.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../hooks";
import { SetStateAction, useEffect, useState } from "react";
import { updateUser, refreshToken } from "../services/actions/authorization";
import { ProfileNavigation } from "../components/ProfileNavigation/ProfileNavigation";

export function ProfilePage() {

  const dispatch = useDispatch();
  const data = useSelector((store) => (store.authorization));

  const onUpdateUser = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(updateUser(email, name));
  }

  const undoChanges = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(updateUser(data.prevUserState!.email, data.prevUserState!.name));
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeValues = (e: { target: { name: string; value: SetStateAction<string>; }; }) => {
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

  return (
    <section className={styles.profile}>
      <ProfileNavigation page_style={"profile_page"} />
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
  )
}
