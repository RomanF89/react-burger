import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import burgerDataPropTypes from '../../types/types';

function IngredientDetails ({data}) {

  return(
    <div className={styles.ingredient_details}>
      <h3 className={styles.title}>Детали ингредиента</h3>
      <figure className={styles.image_figure}>
        <img className={styles.image} src={data.image} alt={'Изображение ингредиента'}></img>
        <figcaption className={styles.image_caption}>{data.name}</figcaption>
      </figure>
      <div className={styles.ingredients_info}>
        <div className={styles.ingredient}>
          <h4 className={styles.ingredient_title}>{'Калории, ккал'}</h4>
          <span className={styles.ingredient_value}>{data.calories}</span>
        </div>
        <div className={styles.ingredient}>
          <h4 className={styles.ingredient_title}>{'Белки, г'}</h4>
          <span className={styles.ingredient_value}>{data.proteins}</span>
        </div>
        <div className={styles.ingredient}>
          <h4 className={styles.ingredient_title}>{'Жиры, г'}</h4>
          <span className={styles.ingredient_value}>{data.fat}</span>
        </div>
        <div className={styles.ingredient}>
          <h4 className={styles.ingredient_title}>{'Углеводы, г'}</h4>
          <span className={styles.ingredient_value}>{data.carbohydrates}</span>
        </div>
      </div>

    </div>
  )
}

IngredientDetails.propTypes = {
  data: burgerDataPropTypes,
}

export default IngredientDetails;
