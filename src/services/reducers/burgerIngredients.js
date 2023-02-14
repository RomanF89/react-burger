import {
  GET_INGREDIENTS,
  SAVE_ERROR,
  GET_INGREDIENTS_SUCCESS,
} from '../actions/burgerIngredients';

const initialState = {
  ingredientsFromRequest: [],
  requestError: false,
  request:false
}

export function getIngredientsReducer(state = initialState, action) {
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
