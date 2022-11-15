import React from 'react';
import { ReactDOM } from 'react';
import { useGlobalContext } from './contextPage';
import './App.css';
import SearchMeal from './SearchMeal';
import FavouritesMeal from './FavouriteMeal';
import Meals from './Meals';
import Modal from './ModalforMeals';

function App() {
  //take it from contextPage with random useGlobalContext 
  const {showModal, favourites} = useGlobalContext()
  return (
    <>
      <SearchMeal/>
        <br />
        {favourites.length > 0 && <FavouritesMeal/>}
        <br />
        <Meals/>
        <br />
        {showModal && <Modal/>}
    
    </>
  );
}

export default App;
