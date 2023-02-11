import styles from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import React, { useEffect, useRef, useState } from 'react';
import { burgerDataPropTypes } from '../../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredientDetails } from '../../services/actions/ingredientDetails';


function BurgerIngredients({ data }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = useState('buns')
  const ingredientsRef = useRef()
  const sauceRef = useRef();
  const mainRef = useRef();
  const bunRef = useRef();

  const { ingredientDetails } = useSelector(store => ({
    ingredientDetails: store.ingredientDetails.currentIngredientDetails
  }));

  const dispatch = useDispatch();

  function handleClick(item) {
    setIsModalOpen(true);
    dispatch(getIngredientDetails(item));
  }

  function handleClose() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    ingredientsRef.current.addEventListener("scroll", () => { //Значение Таб изменяемое при скролле
      let activeTabName = listenRefs(ingredientsRef, bunRef, sauceRef, mainRef);
      setActiveTab(activeTabName);
    })
    return () => {
      ingredientsRef.current.removeEventListener("scroll", () => {
        let activeTabName = listenRefs(ingredientsRef, bunRef, sauceRef, mainRef);
        setActiveTab(activeTabName);
      })
    }
  }, [])

  function listenRefs(parentRef, ...args) { //Аргументы надо задавать согласно очередности в табах
    const activeTabRef = args.reduce(function (prevItem, nextItem) { //Выбор наиболее подходящего для активации таба
      let currentTab;
      if ((Math.abs(parentRef.current.getBoundingClientRect().top - nextItem.current.getBoundingClientRect().top))
        < (parentRef.current.getBoundingClientRect().top - prevItem.current.getBoundingClientRect().top)) {
        currentTab = nextItem;
      } else {
        currentTab = prevItem;
      }
      return currentTab;
    })
    return activeTabRef.current.id;
  }

  return (
    <section className={styles.burger_ingredients} >
      <h2 className={styles.title}>Соберите Бургер</h2>
      <div className={styles.tabs}>
        <a href={'#buns'} className={styles.tab_link}>
          <Tab value='Булки' active={activeTab === 'buns'} >Булки</Tab>
        </a>
        <a href={'#sauces'} className={styles.tab_link}>
          <Tab value='Соусы' active={activeTab === 'sauces'}>Соусы</Tab>
        </a>
        <a href={'#main'} className={styles.tab_link}>
          <Tab value='Начинки' active={activeTab === 'main'}>Начинки</Tab>
        </a>
      </div>
      <div className={styles.ingredients} ref={ingredientsRef} onScroll={(e) => { }}>
        <h3 ref={bunRef} id={'buns'} className={styles.ingredients_title}>Булки</h3>
        <div className={styles.ingredients_column}>
          {data.filter((filteredItem) => filteredItem.type === 'bun').map((item) =>
            <Card item={item} key={item._id} handleIngredientClick={handleClick} />
          )}
        </div>
        <h3 ref={sauceRef} id={'sauces'} className={styles.ingredients_title}  >Соусы</h3>
        <div className={styles.ingredients_column}>
          {data.filter((filteredItem) => filteredItem.type === 'sauce').map((item) =>
            <Card item={item} key={item._id} handleIngredientClick={handleClick} />
          )}
        </div>
        <h3 ref={mainRef} id={'main'} className={styles.ingredients_title}>Начинки</h3>
        <div className={styles.ingredients_column}>
          {data.filter((filteredItem) => filteredItem.type === 'main').map((item) =>
            <Card item={item} key={item._id} handleIngredientClick={handleClick} />
          )}
        </div>
      </div>
      {isModalOpen && <Modal handleClose={handleClose}>
        <IngredientDetails data={ingredientDetails} />
      </Modal>}
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerDataPropTypes),
  handleIngredientClick: PropTypes.func,
}

export default BurgerIngredients;
