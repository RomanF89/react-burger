import {
  GET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
} from '../actions/ingredientDetails';

const initialState = {
  currentIngredientDetails: null,
}

export function getIngredientDetailsReducer(state = initialState, action) {
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
