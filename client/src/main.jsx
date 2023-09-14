import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import visibilityReducer from './reducers/visibilityReducer.js'
import dateReducer from './reducers/dateReducer.js'
import currentItemReducer from './reducers/currentItemReducer.js'
import diaryItemsReducer from './reducers/diaryItemsReducer.js'
import targetsReducer from './reducers/targetsReducer.js'
import nutritionReducer from './reducers/nutritionReducer.js'
import foodSearchReducer from './reducers/foodSearchReducer.js'

import App from './App.jsx'


const store = configureStore(
  {
    reducer: {
      visibilitySettings: visibilityReducer,
      date: dateReducer,
      currentItem: currentItemReducer,
      diaryItems: diaryItemsReducer,
      targets: targetsReducer,
      nutrition:  nutritionReducer,
      foodSearch: foodSearchReducer,
      // exerciseSearch: exerciseSearchReducer
    }
  }
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)
