import React from 'react';
import "./Silder.css";

const Slider = ({min,max,value, handleImage }) => {


  return (
    <div className='slider-container'>

        <input className="slider rangeInput" 
          type='range'  
          min={min} 
          max={max} 
          value={value}
          onChange={handleImage}
         >

         </input>
      </div>
          
  )
}

export default Slider
