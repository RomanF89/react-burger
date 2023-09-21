import styles from './IngredientDetails.module.css';
import { TIngredient } from '../../types/types';
import { useLocation, useParams } from 'react-router-dom';

type TIngredientDetailsProps = {
  data: TIngredient[]
}

type TPageParams = {
  id: string;
}

type TLocation = {
  modal: boolean
}

const IngredientDetails: React.FC<TIngredientDetailsProps> = ({ data }) => {

  const { id } = useParams<TPageParams>();
  const currentIngredient = data?.find((item) => item._id === id);

  const location = useLocation<TLocation>();
  const isModalPage = location.state ? location.state.modal : false;

  return (
    <>
      {
        currentIngredient && <div className={isModalPage ? styles.ingredient_details : styles.ingredient_details_page}>
          <h3 className={styles.title}>Детали ингредиента</h3>
          <figure className={styles.image_figure}>
            <img className={styles.image} src={currentIngredient.image} alt={'Изображение ингредиента'}></img>
            <figcaption className={styles.image_caption}>{currentIngredient.name}</figcaption>
          </figure>
          <div className={styles.ingredients_info}>
            <div className={styles.ingredient}>
              <h4 className={styles.ingredient_title}>{'Калории, ккал'}</h4>
              <span className={styles.ingredient_value}>{currentIngredient.calories}</span>
            </div>
            <div className={styles.ingredient}>
              <h4 className={styles.ingredient_title}>{'Белки, г'}</h4>
              <span className={styles.ingredient_value}>{currentIngredient.proteins}</span>
            </div>
            <div className={styles.ingredient}>
              <h4 className={styles.ingredient_title}>{'Жиры, г'}</h4>
              <span className={styles.ingredient_value}>{currentIngredient.fat}</span>
            </div>
            <div className={styles.ingredient}>
              <h4 className={styles.ingredient_title}>{'Углеводы, г'}</h4>
              <span className={styles.ingredient_value}>{currentIngredient.carbohydrates}</span>
            </div>
          </div>

        </div>
      }
    </>
  )
}

export default IngredientDetails;
