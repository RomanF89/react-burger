import styles from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Card from '../Card/Card';


function BurgerIngredients({ data, handleIngredientClick }) {

  return (
    <section className={styles.burger_ingredients}>
      <h2 className={styles.title}>Соберите Бургер</h2>
      <div className={styles.tabs}>
        <Tab value='Булки' active={true} >Булки</Tab>
        <Tab value='Соусы'>Соусы</Tab>
        <Tab value='Начинки'>Начинки</Tab>
      </div>
      <div className={styles.ingredients}>
        <h3 className={styles.ingredients_title}>Булки</h3>
        <div className={styles.ingredients_column}>
          {data.filter((filteredItem) => filteredItem.type === 'bun').map((item) =>
            <Card item={item} key={item._id} handleIngredientClick={handleIngredientClick} />
          )}
        </div>
        <h3 className={styles.ingredients_title}>Соусы</h3>
        <div className={styles.ingredients_column}>
          {data.filter((filteredItem) => filteredItem.type === 'sauce').map((item) =>
            <Card item={item} key={item._id} handleIngredientClick={handleIngredientClick} />
          )}
        </div>
        <h3 className={styles.ingredients_title}>Начинки</h3>
        <div className={styles.ingredients_column}>
          {data.filter((filteredItem) => filteredItem.type === 'main').map((item) =>
            <Card item={item} key={item._id} handleIngredientClick={handleIngredientClick} />
          )}
        </div>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.array,
  handleIngredientClick: PropTypes.func,
}

export default BurgerIngredients;
