import React from 'react';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { api } from '../../utils/Api';


function App() {
  const [data, setData] = React.useState('');
  const [error, setError] = React.useState('');

  const getData = () => {
    api.getData()
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        setError(err)
      })
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    //Проверка на data и modalOptions делается из-за ошибок в консоли при первом рендере, когда значения = undefined
    <div className={styles.app}>
      <AppHeader></AppHeader>
      {data &&
        <Main>
          <BurgerIngredients data={data}></BurgerIngredients>
          <BurgerConstructor data={data}></BurgerConstructor>
        </Main>
      }
    </div>
  );
}

export default App;

