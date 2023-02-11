import React from 'react';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { getIngredients } from '../../services/actions/burgerIngredients';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";



function App() {

  const [error, setError] = React.useState('');
  const dispatch = useDispatch();

  const { data } = useSelector(store => ({
    data: store.ingredients.ingredientsFromRequest
  }));

  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader></AppHeader>
      {data.length &&
        <Main>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} setError={setError} />
          </DndProvider>
        </Main>
      }
    </div>
  );
}

export default App;

