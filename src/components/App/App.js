import React from 'react';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { api } from '../../utils/Api';


function App() {
  const [data, setData] = React.useState('');
  const [modalOptions, setModalOptions] = React.useState({ modalData: {}, isModalOpen: false, modalType: '' });

  const getData = () => {
    api.getData()
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleIngredientClick(data) {
    setModalOptions({ modalData: data, isModalOpen: true, modalType: 'ingredientDetails' });
  }

  function handleOrderClick() {
    setModalOptions({ isModalOpen: true, modalType: 'orderDetails' });
  }

  function closeModals() {
    setModalOptions({ isModalOpen: false });
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    //Проверка на data и modalOptions делается из-за ошибок в консоли при первом рендере, когда значения = undefined
    <div className={styles.app}>
      <AppHeader></AppHeader>
      {data &&
        <Main>
          <BurgerIngredients data={data} handleIngredientClick={handleIngredientClick}></BurgerIngredients>
          <BurgerConstructor data={data} handleIngredientClick={handleIngredientClick} handleOrderClick={handleOrderClick}></BurgerConstructor>
        </Main>
      }
      {modalOptions.isModalOpen &&
        <ModalOverlay
          type={modalOptions.modalType}
          data={modalOptions.modalData}
          isOpen={modalOptions.isModalOpen}
          closeModals={closeModals}>
        </ModalOverlay>
      }
    </div>
  );
}

export default App;

