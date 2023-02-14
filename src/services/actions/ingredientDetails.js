export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export function getIngredientDetails(ingredientData) {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENT_DETAILS,
      data: ingredientData,
    })
  };
}

export function deleteIngredientDetails() {
  return function (dispatch) {
    dispatch({
      type: DELETE_INGREDIENT_DETAILS,
    })
  };
}
