import {
  DROP_INGREDIENTS,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
  TBurgerConstructorActions,
} from '../actions/burgerConstructor';
import { TIngredient } from '../../types/types';

const initialStateConstructor: TInitialStateConstructor = {
  constructorIngredients: [],
}

export type TInitialStateConstructor = {
  constructorIngredients: Array<TIngredient>;
}

const bun = 'bun';

export const ingredientsReducer = (state = initialStateConstructor, action: TBurgerConstructorActions) => {
  switch (action.type) {
    case DROP_INGREDIENTS: {
      if (action.ingredient.type === bun) { //Проверяем тип ингредиента на bun
        if (state.constructorIngredients.find((item) => item._id === action.ingredient._id)) { //Проверяем не свопадают ли типы булок
          return state
        } else {
          return { // Меняем булки в массиве
            ...state, constructorIngredients: state.constructorIngredients.filter((item) => item.type !== bun).concat(action.ingredient)
          }
        }
      } else {
        return {
          ...state, constructorIngredients: [...state.constructorIngredients, action.ingredient]
        }
      }
    }
    case DELETE_INGREDIENT: {
      const index = state.constructorIngredients.findIndex((item) => item._id === action.deletableIngredient._id); //Находим индекс удаляемого элемента
      const newArr = [...state.constructorIngredients]
      newArr.splice(index, 1)
      return {
        ...state, constructorIngredients: newArr // Удаляем 1 элемент начиная с инедкса
      }
    }
    case SORT_INGREDIENTS: {
      //Создаем новый массив с заменой местами сортируемых элементов
      const dragItem = state.constructorIngredients[action.dragIndex]
      const hoverItem = state.constructorIngredients[action.hoverIndex]
      const newArr = [...state.constructorIngredients]
      newArr[action.dragIndex] = hoverItem;
      newArr[action.hoverIndex] = dragItem;
      return {
        ...state, constructorIngredients: newArr
      }
    }

    default: {
      return state
    }
  }
}
