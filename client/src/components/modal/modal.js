import React from 'react'
import ReactDom from 'react-dom';
import SearchBar from './searchbar/searchbar';
import FoodSearch from './content/foodSearch';
import Details from './details/details';

const Modal = ({ handler }) => {

  return ReactDom.createPortal(
    <div className='modal'>
      <div className='overlay' onClick={handler}></div>
      <div className='modal-flex-container'>
        <div className='modal-container'>
          <div className='modal-label'>Add Food to Diary</div>
          <SearchBar />
          <FoodSearch />
          <Details />
          <div className='sponsor'> <img src={require('./sponsor.png')} alt='Powered by Nutritionix API'/> </div>
        </div>
      </div>
    </div>, document.getElementById('portal'))
}


export default Modal;