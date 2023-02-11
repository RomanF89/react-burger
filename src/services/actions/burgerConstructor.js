export const DROP_INGREDIENTS = 'DROP_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export const dropIngredients = (dropIngredient) => {
  return function(dispatch) {
    dispatch({
      type: DROP_INGREDIENTS,
      ingredient: dropIngredient,
    })
  }
}

export const deleteIngredient = (deletableIngredient) => {
  return function(dispatch) {
    dispatch({
      type: DELETE_INGREDIENT,
      deletableIngredient: deletableIngredient,
    })
  }
}

export const sortIngredients = (dragIndex, hoverIndex) => {
  return function(dispatch) {
    dispatch({
      type: SORT_INGREDIENTS,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    })
  }
}
