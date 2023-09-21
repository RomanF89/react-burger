import { combineReducers } from 'redux';
import { getIngredientsReducer } from './burgerIngredients';
import { getIngredientDetailsReducer } from './ingredientDetails';
import { getOrderReducer } from './orderDetails';
import { ingredientsReducer } from './burgerConstrucror';
import { authorizationReducer } from './authorization';
import { feedReducer } from './feed';
import { ordersReducer } from './orders';

export const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  authorization: authorizationReducer,
  feedTable: feedReducer,
  ordersTable: ordersReducer,
  orderDetails: getOrderReducer,
  constructorIngredients: ingredientsReducer,
  ingredientDetails: getIngredientDetailsReducer,
});
