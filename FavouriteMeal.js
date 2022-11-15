import React from 'react'
import { useGlobalContext } from './contextPage'


const Favourites = () => {

// take it from contextPage 
  const {favourites, selectMeal, removeFromFavorites} = useGlobalContext()
    
  return (
    
    <section className='favorites'>
      <div className='favorites-content'>
        <h5>favorites</h5>
        <div className='favorites-container'>
          {favourites.map( (item) => {
            const {idMeal, strMealThumb:image} = item;
            return <div key={idMeal} className="favorite-item">
              <img src={image} className='favorites-img imga'
              onClick={() => selectMeal(idMeal, true)} />
              <button className='remove-btn' onClick={()=>removeFromFavorites(idMeal)}>remove</button>
            </div>
          })}
        </div>
      </div>
    </section>
  )
}

export default Favourites
