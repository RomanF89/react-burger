import { api } from '../../utils/Api';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';

export function getIngredients() {
  return function (dispatch) {
    api.getData()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS,
          items: res.data,
        })
      })
      .catch((err) => {
        console.log(err);
      })

  };
}
