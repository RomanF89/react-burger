import { api } from '../../utils/Api';
import { AppDispatch } from '../../types';
import { TIngredient } from "../../types/types";


export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const SAVE_ERROR = 'SAVE_ERROR';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS;
}
interface ISaveErrorAction {
  readonly type: typeof SAVE_ERROR,
  readonly error: {};
}
interface IGetIngredientSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: TIngredient[];
}

export type TBurgerIngredientsActions =
  | IGetIngredientSuccessAction
  | ISaveErrorAction
  | IGetIngredientsAction;


export function getIngredients() {
  return function (dispatch: AppDispatch) {
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
