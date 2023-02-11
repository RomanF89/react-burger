import {
  GET_INGREDIENTS,
} from '../actions/burgerIngredients';

const initialState = {
  ingredientsFromRequest: [],
}

export function getIngredientsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {...state, ingredientsFromRequest: action.items}
    default:
      return state;
  };
};
