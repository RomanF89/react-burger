import React from 'react';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { api } from '../../utils/Api';
import { AppContext } from '../../utils/AppContext';

function App() {
  const [data, setData] = React.useState('');
  const [error, setError] = React.useState('');
  const [orderData, setOrderData] = React.useState({});

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
    <div className={styles.app}>
      <AppHeader></AppHeader>
      {data &&
        <Main>
          <BurgerIngredients data={data}></BurgerIngredients>
          <AppContext.Provider value={{data, orderData, setOrderData, setError}}>
            <BurgerConstructor/>
          </AppContext.Provider>
        </Main>
      }
    </div>
  );
}

export default App;

