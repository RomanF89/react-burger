import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import styles from "./ingredientPage.module.css";
import PropTypes from 'prop-types';
import { burgerDataPropTypes } from "../types/types";

function IngredientPage ({data}) {

  return (
    <section className={styles.ingredient_page}>
      <IngredientDetails data={data}/>
    </section>
  )
}

IngredientPage.propTypes = {
  data: PropTypes.arrayOf(burgerDataPropTypes),
}

export default IngredientPage;
