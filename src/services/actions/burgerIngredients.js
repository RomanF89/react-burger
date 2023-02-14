import { api } from '../../utils/Api';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const SAVE_ERROR = 'SAVE_ERROR';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    })
    api.getData()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: res.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: SAVE_ERROR,
          error: err,
        })
      })

  };
}
