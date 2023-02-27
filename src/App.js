import React, { useState } from 'react';
import './App.css';

// componets
import Sidebaritems from './components/SidebarItem';
import Slider from './components/Slider';

// package import
import * as htmlToImage from 'html-to-image';
import * as downloadjs from 'downloadjs';

// import  default data
import {DEFAULT_OPTIONS} from './defaultdata';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [image, setImage] = useState(null);

  const selectedOption = options[selectedIndex];

  const sliderChange = ({ target }) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedIndex) return option;
        return { ...option, value: target.value }
      })
    })
  }

  const applyFilter = () => {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return {
      filter: filters.join(" "),
      backgroundImage: `url(${image})`,
    };
  };

  const handleImage = (event) => {
    // console.log(event.target.files[0]);
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setImage(objectUrl);
    // console.log(objectUrl);
  }



  const downloadImage = () => {
    htmlToImage.toPng(document.getElementById('image')).
      then((dataUrl) => {
        downloadjs(dataUrl, `${Date.now()}.png`);
      })
  };

  // page refresh
  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className='container'>

      {/* 1) image */}
      <div className='item item1'>
         { image ? (
            <div className='main-image' 
            id='image' 
            style={applyFilter()} />
          ) : (
            <div className='upload-image'>
              <h1>Photoshop Clone</h1>
              <div className='inputdiv'>
                <label for="inputTag">
                <i class="fa-solid fa-cloud-arrow-up"></i>
                  <input id="inputTag"
                  onChange={handleImage}
                  type="file"/>
                  <br/>
                  <span id="imageName"></span>
                </label>
              </div>
            </div>
          )}
      </div>

      {/* 2) Slider */}
      <div className='item item2'>
          <Slider
            min={selectedOption.range.min}
            max={selectedOption.range.max}
            value={selectedOption.value}
            handleImage={sliderChange}
          />
      </div>


      {/* 3) Sidebar button */}
      <div className='item item3'>
        <div className='controlIcon'>
          {
            options.map((option, index) => {
              return (
                  <Sidebaritems 
                    key={index}
                    iconclass={option.iconclasss}
                    name={option.name}
                    active={index === selectedIndex}
                    handleClick={() => setSelectedIndex(index)}
                  />
              );
            })
          }
           <i class="fa-solid fa-download download" onClick={downloadImage}></i>
           <i class="fa-solid fa-power-off downloads" onClick={reloadPage}></i>
        </div>
      </div>
    </div >
  )
}

export default App;
