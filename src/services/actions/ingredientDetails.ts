import { TIngredient } from "../../types/types";
import { AppDispatch } from "../../types";

export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export function getIngredientDetails(ingredientData: TIngredient) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENT_DETAILS,
      data: ingredientData,
    })
  };
}

export function deleteIngredientDetails() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: DELETE_INGREDIENT_DETAILS,
    })
  };
}

interface IGetIngredientsAction {
  type: typeof GET_INGREDIENT_DETAILS,
  data: TIngredient
}

interface IDeleteIngredientAction {
  type: typeof DELETE_INGREDIENT_DETAILS,
}

export type TIngredientDetailsActions =
  | IGetIngredientsAction
  | IDeleteIngredientAction
