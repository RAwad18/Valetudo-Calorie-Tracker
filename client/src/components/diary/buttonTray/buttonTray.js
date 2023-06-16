import React, { useState } from 'react'

import Day from './day/day'
import Modal from '../../modal/modal'

const ButtonTray = () => {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  }

  // 'active-modal' class has css which prevents scrolling 
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {/* If modal is true, render <FoodPopup /> */}
      {modal && (<Modal handler={toggleModal} />)}
      <div className='buttonTray'>
        <button type='button' id='foodBtn' onClick={toggleModal}>Food</button>
        <button type='button' id='exerBtn'>Exercise</button>
        <button type='button' id='weightBtn'>Enter Weight</button>
        <Day />
      </div>
    </>

  )
}


export default ButtonTray