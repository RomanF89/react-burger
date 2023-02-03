import React from 'react';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { api } from '../../utils/Api';
import { AppContext } from '../../services/AppContext';

function App() {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState('');
  const [orderData, setOrderData] = React.useState(null);

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
      { data.length &&
        <Main>
          <AppContext.Provider value={{data, orderData, setOrderData, setError}}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </AppContext.Provider>
        </Main>
      }
    </div>
  );
}

export default App;

