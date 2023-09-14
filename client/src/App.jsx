import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Header from './sections/header/header'
import Date from './sections/date/date'
import Dashboard from './sections/dashboard/dashboard'
import Diary from './sections/diary/diary'
import ItemData from './sections/itemdata/itemdata'
import AddFoodModal from './sections/addFoodModal/addFoodModal';

import './styles/modern-normalize.css'
import './styles/App.css'
import './styles/utils.css'
import TargetsModal from './sections/targetsModal/targetsModal';

function App() {

  /* Theme Options */
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || ''
  );

  const toggleTheme = () => {
    if (theme === '') {
      setTheme('light-mode');
    } else {
      setTheme('');
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);


    const [visibilityOptions, setVisibilityOptions] = useState({
      showCalender: 'hidden',
      showItemData: 'hidden'
    })

    const toggleCalenderVisibility = () => {
      setVisibilityOptions({
        ...visibilityOptions,
        showCalender: visibilityOptions.showCalender === 'hidden' ? '' : 'hidden'
      })
    }

    const showItemData = () => {
      setVisibilityOptions({
        ...visibilityOptions,
        showItemData: ''
      })
    }

    const hideItemData = () => {
      setVisibilityOptions({
        ...visibilityOptions,
        showItemData: 'hidden'
      })
    }

  /* Return Statement */
  return (
    <>
      <div className="mobile_container">
        <Header toggleTheme={toggleTheme} />
        <div className="dash container">
          <Date />
          <Dashboard />
        </div>
        <Diary />
        <ItemData visibility={visibilityOptions.showItemData} hideItemData={hideItemData} />
        <AddFoodModal />
        <TargetsModal />
      </div>

      <div className="desktop_container">
        <Header toggleTheme={toggleTheme} />
        <div className="grid container">
          <div className='grid__left_side'>
            <Diary />
          </div>
          <div className='grid__right_side'>
            <Date />
            <Dashboard />
            <ItemData visibility={visibilityOptions.showItemData} hideItemData={hideItemData} />
          </div>
        </div>
        <AddFoodModal />
        <TargetsModal />
      </div>
    </>
  )
}

export default App
