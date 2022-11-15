import React from 'react'
import { useGlobalContext } from './contextPage';
import { BsHandThumbsUp } from "react-icons/bs"



const Meals = () => {
    //povezujemo iz contexta pomocu ove custom hook
    const {loading, meals, selectMeal, addToFavorites} = useGlobalContext();
    
    if(loading){
      return <section className='section-loading'>
        <h4>Loading...</h4>
      </section>
    }
    if(meals.length < 1){
      return <section className='section-loading'>
        <h4>No meals matched your search term. Please try again</h4>
      </section>
    }
    
  return (
    <div>
      
            <section className='section-center'>
                {meals.map( (singleContext) => {
                    const {idMeal, strMeal : title, strMealThumb : image } = singleContext;
                    return <article key={idMeal} className="single-meal">
                          {/* povezujemo selectMeal funkciju iz contexta kako bi klikom na nju dobili Modal */}
                          {/* a prethodno smo je ubacili gore sa useGlobalContext */}
                        <img src={image}  className='img' onClick={() => selectMeal(idMeal)}/>
                        <footer>
                            <h5>{title}</h5>
                            <button className='like-btn' onClick={()=>{addToFavorites(idMeal)}}><BsHandThumbsUp/></button>
                            <br />
                        </footer>
                        <br />
                        
                    </article>
                })}
            </section>
        
    </div>
  )
}

export default Meals
