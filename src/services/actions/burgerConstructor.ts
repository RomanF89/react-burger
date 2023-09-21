import { TIngredient } from "../../types/types";
import { AppDispatch } from "../../types";

export const DROP_INGREDIENTS = 'DROP_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';


interface IDropIngredientsAction {
  type: typeof DROP_INGREDIENTS;
  ingredient: TIngredient;
}
interface IDeleteIngredientAction {
  type: typeof DELETE_INGREDIENT;
  deletableIngredient: TIngredient
}
interface ISortIngredients {
  type: typeof SORT_INGREDIENTS;
  dragIndex: number;
  hoverIndex: number;
}

export type TBurgerConstructorActions =
  | IDropIngredientsAction
  | IDeleteIngredientAction
  | ISortIngredients

export const dropIngredients = (dropIngredient: TIngredient) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: DROP_INGREDIENTS,
      ingredient: dropIngredient,
    })
  }
}

export const deleteIngredient = (deletableIngredient: TIngredient) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: DELETE_INGREDIENT,
      deletableIngredient: deletableIngredient,
    })
  }
}

export const sortIngredients = (dragIndex: number, hoverIndex: number) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: SORT_INGREDIENTS,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    })
  }
}
