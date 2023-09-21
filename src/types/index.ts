import { ThunkDispatch } from 'redux-thunk';
import { store } from '..';
import { TAuthorizationActions } from '../services/actions/authorization';
import { TBurgerIngredientsActions } from '../services/actions/burgerIngredients';
import { TBurgerConstructorActions } from '../services/actions/burgerConstructor';
import { TFeedActions } from '../services/actions/feed';
import { TIngredientDetailsActions } from '../services/actions/ingredientDetails';
import { TOrderDetailsActions } from '../services/actions/orderDetails';
import { TOrdersActions } from '../services/actions/orders';

type TApplicationActions =
  | TAuthorizationActions
  | TIngredientDetailsActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TFeedActions
  | TOrdersActions
  | TOrderDetailsActions

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
