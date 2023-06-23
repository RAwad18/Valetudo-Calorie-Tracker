import { Fragment, useState } from 'react'
import Header from './components/header/header'

import './styles/modern-normalize.css'
import './styles/App.css'
import './styles/utils.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
    </>
  )
}

export default App
