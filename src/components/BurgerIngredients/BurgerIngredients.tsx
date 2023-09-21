import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Card from '../Card/Card';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { TIngredient } from '../../types/types';
import { useHistory } from 'react-router-dom';


type TIngredientProps = {
  data: TIngredient[];
}

const BurgerIngredients: React.FC<TIngredientProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('buns');
  const ingredientsRef = useRef<HTMLDivElement>(null!);
  const sauceRef = useRef<HTMLHeadingElement>(null!);
  const mainRef = useRef<HTMLHeadingElement>(null!);
  const bunRef = useRef<HTMLHeadingElement>(null!);

  const buns = useMemo(() => data.filter((filteredItem) => filteredItem.type === 'bun'), [data])
  const mains = useMemo(() => data.filter((filteredItem) => filteredItem.type === 'main'), [data])
  const sauces = useMemo(() => data.filter((filteredItem) => filteredItem.type === 'sauce'), [data])

  const history = useHistory();

  function handleClick(item: TIngredient) {
    history.replace(`/ingredients/${item._id}`, { modal: true })
  }

  useEffect(() => {
    ingredientsRef.current.addEventListener("scroll", setTabListener);
  }, [])


  function listenRefs(parentRef: React.MutableRefObject<HTMLDivElement>) { // Реф от которого идет рассчет активного таба
    return function (...args: React.MutableRefObject<HTMLHeadingElement>[]) { //Аргументы надо задавать согласно очередности в табах
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
  }

  const setTabListener = () => {
    //Значение Таб изменяемое при скролле
    let activeTabName = listenRefs(ingredientsRef)(bunRef, sauceRef, mainRef);
    setActiveTab(activeTabName);
  }

  return (
    <section className={styles.burger_ingredients} >
      <h2 className={styles.title}>Соберите Бургер</h2>
      <div className={styles.tabs}>
        <a href={'#buns'} className={styles.tab_link}>
          <Tab onClick={() => { }} value='Булки' active={activeTab === 'buns'} >Булки</Tab>
        </a>
        <a href={'#sauces'} className={styles.tab_link}>
          <Tab onClick={() => { }} value='Соусы' active={activeTab === 'sauces'}>Соусы</Tab>
        </a>
        <a href={'#main'} className={styles.tab_link}>
          <Tab onClick={() => { }} value='Начинки' active={activeTab === 'main'}>Начинки</Tab>
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


export default BurgerIngredients;
