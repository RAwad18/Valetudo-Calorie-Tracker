import React from 'react'

import Day from './day/day'

const ButtonTray = () => {

  return (
      <div className='buttonTray'>
        <button type='button' id='foodBtn'>Food</button>
        <button type='button' id='exerBtn'>Exercise</button>
        <button type='button' id='weightBtn'>Enter Weight</button>
        <Day />
      </div>
  )
}


export default ButtonTray