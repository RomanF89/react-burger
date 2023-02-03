import styles from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import React from 'react';
import { burgerDataPropTypes } from '../../types/types';
import { AppContext } from '../../services/AppContext';
import { useContext } from 'react';


function BurgerIngredients() {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({});
  const { data } = useContext(AppContext);

  function handleClick(item) {
    setIsModalOpen(true);
    setModalData(item);
  }

  function handleClose() {
    setIsModalOpen(false);
  }

  //onClick={(e) => e.target.scrollIntoView()}
  return (
    <section className={styles.burger_ingredients}>
      <h2 className={styles.title}>Соберите Бургер</h2>
      <div className={styles.tabs}>
        <a href={'#buns'} className={styles.tab_link}>
          <Tab value='Булки' active={true} >Булки</Tab>
        </a>
        <a href={'#sauces'} className={styles.tab_link}>
          <Tab value='Соусы'>Соусы</Tab>
        </a>
        <a href={'#main'} className={styles.tab_link}>
          <Tab value='Начинки'>Начинки</Tab>
        </a>
      </div>
      <div className={styles.ingredients}>
        <h3 id={'buns'} className={styles.ingredients_title}>Булки</h3>
        <div className={styles.ingredients_column}>
          {data.filter((filteredItem) => filteredItem.type === 'bun').map((item) =>
            <Card item={item} key={item._id} handleIngredientClick={handleClick} />
          )}
        </div>
        <h3 id={'sauces'} className={styles.ingredients_title} >Соусы</h3>
        <div className={styles.ingredients_column}>
          {data.filter((filteredItem) => filteredItem.type === 'sauce').map((item) =>
            <Card item={item} key={item._id} handleIngredientClick={handleClick} />
          )}
        </div>
        <h3 id={'main'} className={styles.ingredients_title}>Начинки</h3>
        <div className={styles.ingredients_column}>
          {data.filter((filteredItem) => filteredItem.type === 'main').map((item) =>
            <Card item={item} key={item._id} handleIngredientClick={handleClick} />
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} handleClose={handleClose}>
        {isModalOpen && <IngredientDetails data={modalData} />}
      </Modal>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerDataPropTypes),
  handleIngredientClick: PropTypes.func,
}

export default BurgerIngredients;
