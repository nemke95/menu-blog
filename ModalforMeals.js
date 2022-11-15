import React from 'react'
import { useGlobalContext } from './contextPage'

const Modal = () => {
  // ubacujemo iz contexta sa custom useGlobalContext da bi izbacili taj selected
  // meal koji smo kliknuli i closeModal da bi ga zatvorili 
  //use data from contextPage with useGlobalContext
  const {selectedMeal, closeModal} = useGlobalContext();

  //make it easier with destructing
  const {strMealThumb:image, strMeal:title, strInstructions:text, strSource:source} = selectedMeal
  return (
    <div>
        <aside className='modal-overlay'>
          <div className='modal-container'>
            <img src={image} alt={title} className='img modal-img'/>
            <div className='modal-content'>
              <h4>{title}</h4>
              <p>Cooking Instructions</p>
              <p>{text}</p>
              <a href={source} target='blank'>Original Sources</a>
            
            <button onClick={closeModal} className='btn btn-hipster close-btn'>Close</button>
            </div>
          </div>
        </aside>
    </div>
  )
}

export default Modal