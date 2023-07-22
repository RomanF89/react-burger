import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import { burgerDataPropTypes } from '../../types/types';
import { useLocation, useParams } from 'react-router-dom';

function IngredientDetails ({data}) {

  const {id} = useParams();
  const currentIngredient = data?.find((item) => item._id === id);

  const location = useLocation();
  const isModalPage = location.state ? location.state.modal : false;

  return(
    <div className={isModalPage ? styles.ingredient_details : styles.ingredient_details_page }>
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
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.arrayOf(burgerDataPropTypes),
}

export default IngredientDetails;
