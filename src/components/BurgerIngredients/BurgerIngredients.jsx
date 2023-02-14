import styles from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Card from '../Card/Card';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { burgerDataPropTypes } from '../../types/types';
import { useDispatch } from 'react-redux';
import { getIngredientDetails } from '../../services/actions/ingredientDetails';


function BurgerIngredients({ data }) {
  const [activeTab, setActiveTab] = useState('buns');
  const ingredientsRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const bunRef = useRef();

  const buns = useMemo(() => data.filter((filteredItem) => filteredItem.type === 'bun'), [data]);
  const mains = useMemo(() => data.filter((filteredItem) => filteredItem.type === 'main'), [data])
  const sauces = useMemo(() => data.filter((filteredItem) => filteredItem.type === 'sauce'), [data])

  const dispatch = useDispatch();

  function handleClick(item) {
    dispatch(getIngredientDetails(item));
  }

  const setTabListener = () => {
     //Значение Таб изменяемое при скролле
     let activeTabName = listenRefs(ingredientsRef, bunRef, sauceRef, mainRef);
     setActiveTab(activeTabName);
  }

  useEffect(() => {
    ingredientsRef.current.addEventListener("scroll", setTabListener);
    return () => {
      ingredientsRef.current.removeEventListener("scroll",setTabListener);
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
          {buns.map((item) =>
            <Card item={item} key={item._id} handleIngredientClick={handleClick} />
          )}
        </div>
        <h3 ref={sauceRef} id={'sauces'} className={styles.ingredients_title}  >Соусы</h3>
        <div className={styles.ingredients_column}>
          {sauces.map((item) =>
            <Card item={item} key={item._id} handleIngredientClick={handleClick} />
          )}
        </div>
        <h3 ref={mainRef} id={'main'} className={styles.ingredients_title}>Начинки</h3>
        <div className={styles.ingredients_column}>
          {mains.map((item) =>
            <Card item={item} key={item._id} handleIngredientClick={handleClick} />
          )}
        </div>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(burgerDataPropTypes),
  handleIngredientClick: PropTypes.func,
}

export default BurgerIngredients;
