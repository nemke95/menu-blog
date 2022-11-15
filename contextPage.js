import React, {useContext} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'

// URL
const allMealsURl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

/////////////////////// LocalStorage function ///////////////////////////////////////
  const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites')
    if(favorites){
      favorites = JSON.parse(localStorage.getItem('favorites'))
    } else {
      favorites = []
    }
    return favorites
  }

//////////// Creating context hook ///////////////////////////////////
const AppContext = React.createContext()





const AppProvider = ({children}) => {

    //////////////      useState hooks    ///////////////

//// hook for loading 
     const [loading, setLoading] =useState(false);
/////hook for maping meals
      const [meals, setMeals] = useState([]);
//hook for searching for Search Component
      const  [searchTerm, setSearchTerm] = useState('')
////hook for Modal Component for show/hide
      const [showModal, setShowModal] = useState(false)
//// hook for selecting Meal for Modal Component
      const [selectedMeal, setSelectedMeal] = useState(null)
/// hook for put to Favourites Component (and give it to localStorageFunction to save results)
      const [favourites, setFavourites] = useState(getFavoritesFromLocalStorage())





//............................All logic functions for other Components...................................///


//fetching data from url above
    const fetchMeals = async(url) =>{
          setLoading(true)
      try {
        const {data} = await axios.get(url)
        if(data.meals){
          setMeals(data.meals)
        } else {

        
        setMeals([])
        }
       
      } catch (error) {
                console.log(error)
      }
      setLoading(false)
    }

    useEffect(()=>{
      fetchMeals(allMealsURl)
    }, [])
//modificating useEffect to match searching
    useEffect(()=>{
      if(!searchTerm) return
    fetchMeals(`${allMealsURl}${searchTerm}`)
    }, [searchTerm])


/// suprise button for random meal
    const fetchRandomMeal = ()=>{
      fetchMeals(randomMealUrl)
    }

//clicking separate meal and see information about it
    const selectMeal = (idMeal, favoriteMeal) => {
     
      let meal;
      if(favoriteMeal){
        meal = favourites.find( (meal) => meal.idMeal === idMeal)
      } else {
         meal = meals.find( (meal) => {
         return  meal.idMeal === idMeal
      })
      }
     
      setSelectedMeal(meal)
      setShowModal(true)
    }


// closing an open Modal 
const closeModal = () => {
  setShowModal(false)
}



///     FAVOURITES      ///
//add separate meal to favourites
const addToFavorites = (idMeal) => {
      
      const alreadyFavorite = favourites.find( (meal) => {
           return  meal.idMeal === idMeal
      })
      if(alreadyFavorite) return
      const meal = meals.find( (meal) => meal.idMeal === idMeal)
      const updateFavourites = [...favourites, meal]
      setFavourites(updateFavourites);
      localStorage.setItem('favorites', JSON.stringify(updateFavourites))
}

const removeFromFavorites = (idMeal) => {
      const updateFavourites = favourites.filter( (meal)=>{
          return meal.idMeal !== idMeal
      })
      setFavourites(updateFavourites)
      localStorage.setItem('favorites', JSON.stringify(updateFavourites))
}

//// putting logic above in value to connect with other Components
    return <AppContext.Provider value= {{loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, addToFavorites, removeFromFavorites, favourites}} >
        {children}
    </AppContext.Provider>
}

// creating useGlobalContext for easier maintance
    export const useGlobalContext = () => {
      return useContext(AppContext)
    }


export {AppContext, AppProvider}