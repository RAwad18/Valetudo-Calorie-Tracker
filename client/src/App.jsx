import { Fragment, useState, useEffect } from 'react'
import Header from './sections/header/header'
import Date from './sections/date/date'
import Dashboard from './sections/dashboard/dashboard'
import Diary from './sections/diary/diary'
import ButtonBar from './sections/buttonBar/buttonBar'

import './styles/modern-normalize.css'
import './styles/App.css'
import './styles/utils.css'

function App() {
  const [count, setCount] = useState(0);


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


  /* Return Statement */
  return (
    <>
      <div className="mobile_container">
        <Header toggleTheme={toggleTheme} />
        <Date />
        <Dashboard />
        <ButtonBar />
        <Diary />
      </div>

      <div className="desktop_container">
        <Diary />
        {/* <Date />
        <Dashboard /> */}
        <ButtonBar />
      </div>
    </>
  )
}

export default App
