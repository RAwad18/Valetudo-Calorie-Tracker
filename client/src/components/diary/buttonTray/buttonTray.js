import React from 'react'

import './buttonTray.css'

const ButtonTray = () => {

  return (
      <div className='buttonTray'>
        <button type='button' id='foodBtn'>Food</button>
        <button type='button' id='exerBtn'>Exercise</button>
        <button type='button' id='weightBtn'>Enter Weight</button>
      </div>
  )
}


export default ButtonTray