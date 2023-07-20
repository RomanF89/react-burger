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
import { getCookie } from '../../utils/getCookie';
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
  const modal = location.state && location.state.modal;


  React.useEffect(() => {
    dispatch(getUser())
  }, [])


  React.useEffect(() => {
    if (auth.refreshToken) {
      document.cookie = `refreshToken=${auth.refreshToken}; maxAge=3600`;
    }
    if (auth.accessToken) {
      document.cookie = `accessToken=${auth.accessToken}; maxAge=1200`;
    }
  }, [auth.refreshToken, auth.accessToken])



  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  React.useEffect(() => {
    if (auth.getUserError === 'Ошибка 403') {
      const refreshedToken = getCookie('refreshToken');
      dispatch(refreshToken(refreshedToken, getUser()));
    }
  }, [auth.getUserError]);



  return (
    <div className={styles.app}>
      <Switch location={location || modal}>

        <Route exact path="/">
          <AppHeader></AppHeader>
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
          <LoginPage></LoginPage>
        </ProtectedRouteAuthorized>

        <ProtectedRouteAuthorized exact path={"/registration"}>
          <RegisterPage></RegisterPage>
        </ProtectedRouteAuthorized>

        <ProtectedRouteAuthorized exact path={"/forgot-password"}>
          <ForgotPasswordPage></ForgotPasswordPage>
        </ProtectedRouteAuthorized>

        <ProtectedRouteAuthorized exact path={"/reset-password"}>
          <ResetPasswordPage></ResetPasswordPage>
        </ProtectedRouteAuthorized>

        <ProtectedRoute exact path={"/profile"} >
          <ProfilePage></ProfilePage>
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



