import { TIngredient } from '../../types/types';
import {
  GET_INGREDIENTS,
  SAVE_ERROR,
  GET_INGREDIENTS_SUCCESS,
  TBurgerIngredientsActions,
} from '../actions/burgerIngredients';

const initialIngredientState: TInitialIngredientsState = {
  ingredientsFromRequest: [],
  requestError: {},
  request: false,
}

export type TInitialIngredientsState = {
  ingredientsFromRequest: TIngredient[];
  requestError: {};
  request: boolean;
}

export const getIngredientsReducer = (state = initialIngredientState, action: TBurgerIngredientsActions) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return { ...state, request: true }
    case SAVE_ERROR:
      return { ...state, requestError: action.error }
    case GET_INGREDIENTS_SUCCESS:
      return { ...state, ingredientsFromRequest: action.items }
    default:
      return state;
  };
};
