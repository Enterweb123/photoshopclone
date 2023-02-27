import React from 'react';
import './Sidebar.css';

const SidebarItems = ({name,handleClick,iconclass}) => {

  return (
    <div className='sidebarComponent tooltip'>
      <i class={iconclass} onClick={handleClick}>
      <span class="tooltiptext">{name}</span>
      </i>
      
    </div>
  )
}

export default SidebarItems
