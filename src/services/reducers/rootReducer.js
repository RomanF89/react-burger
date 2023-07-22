import { combineReducers } from 'redux';
import { getIngredientsReducer } from './burgerIngredients';
import { getIngredientDetailsReducer } from './ingredientDetails';
import { getOrderReducer } from './orderDetails';
import { ingredientsReducer } from './burgerConstrucror';
import { authorizationReducer } from './authorization';


export const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  ingredientDetails: getIngredientDetailsReducer,
  orderDetails: getOrderReducer,
  constructorIngredients: ingredientsReducer,
  authorization: authorizationReducer,
});
