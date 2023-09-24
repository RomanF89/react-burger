import { TIngredient } from '../../types/types';
import {
  GET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
  TIngredientDetailsActions,
} from '../actions/ingredientDetails';

const initialState: TInitialState = {
  currentIngredientDetails: null,
}

type TInitialState = {
  currentIngredientDetails: TIngredient | null;
}

export function getIngredientDetailsReducer(state = initialState, action: TIngredientDetailsActions) {
  switch (action.type) {
    case GET_INGREDIENT_DETAILS:
      return {
        ...state, currentIngredientDetails: action.data
      }
    case DELETE_INGREDIENT_DETAILS:
      return {
        ...state, currentIngredientDetails: null,
      }
    default:
      return state;
  }
}
