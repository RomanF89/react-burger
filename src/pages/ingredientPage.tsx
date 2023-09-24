import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import { TIngredient } from "../types/types";
import styles from "./ingredientPage.module.css";

type TIngredientPageProps = {
  data: Array<TIngredient>
}

const IngredientPage: React.FC<TIngredientPageProps> = ({data}) => {

  return (
    <section className={styles.ingredient_page}>
      <IngredientDetails data={data}/>
    </section>
  )
}

export default IngredientPage;
