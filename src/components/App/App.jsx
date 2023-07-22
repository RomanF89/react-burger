import React from 'react';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { getIngredients } from '../../services/actions/burgerIngredients';
import { getUser, refreshToken } from '../../services/actions/authorization';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route, useLocation} from 'react-router-dom';
import { LoginPage } from '../../pages/loginPage';
import { RegisterPage } from '../../pages/registerPage';
import { ForgotPasswordPage } from '../../pages/forgotPassword';
import { ResetPasswordPage } from '../../pages/resetPassword';
import { ProfilePage } from '../../pages/profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { ProtectedRouteAuthorized } from '../ProtectedRouteAutorized/ProtectedRouteAuthorized';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import IngredientPage from '../../pages/ingredientPage';

function App() {
  const dispatch = useDispatch();

  const { data, auth } = useSelector(store => ({
    data: store.ingredients.ingredientsFromRequest,
    auth: store.authorization
  }));

  const location = useLocation();
  const modal = location.state?.modal;


  React.useEffect(() => {
    dispatch(getUser())
  }, [])


  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  React.useEffect(() => {
    if (auth.getUserError === 'Ошибка 403') {
      dispatch(refreshToken( getUser()));
    }
  }, [auth.getUserError]);



  return (
    <div className={styles.app}>
      <Switch location={location || modal}>

        <Route exact path="/">
          <AppHeader/>
          {data.length &&
            <Main>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients data={data} />
                <BurgerConstructor/>
              </DndProvider>
            </Main>
          }
        </Route>

        <ProtectedRouteAuthorized exact path={"/login"}>
          <LoginPage/>
        </ProtectedRouteAuthorized>

        <ProtectedRouteAuthorized exact path={"/registration"}>
          <RegisterPage/>
        </ProtectedRouteAuthorized>

        <ProtectedRouteAuthorized exact path={"/forgot-password"}>
          <ForgotPasswordPage/>
        </ProtectedRouteAuthorized>

        <ProtectedRouteAuthorized exact path={"/reset-password"}>
          <ResetPasswordPage/>
        </ProtectedRouteAuthorized>

        <ProtectedRoute exact path={"/profile"} >
          <ProfilePage/>
        </ProtectedRoute>

        {!modal && data.length && (
          <Route path="/ingredients/:id">
            <IngredientPage data={data} />
          </Route>)
        }

      </Switch>


      {modal && data.length && (
        <Switch>
          <Route path="/ingredients/:id">
            <Modal>
              <IngredientDetails data={data} />
            </Modal>
          </Route>
        </Switch>
      )}

    </div>
  );
}

export default App;



