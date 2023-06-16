import React from 'react'

const Modal = ({ handler }) => {

  return (
    <div className='modal'>
      <div className='overlay' onClick={handler}></div>
      <div className='modal-flex-container'>
        <div className='modal-container'>
          <div className='modal-content'></div>
        </div>
      </div>
    </div>
  )
}


export default Modal;