import React from 'react';
import { createRoot } from 'react-dom/client';
//Provider keeps track of the store (global state)
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from "react-router-dom"

// Component(s)
import App from './App';

// Reducer(s)
import calObjReducer from './reducers/reducer'



const store = configureStore({
    reducer: {
        calObj: calObjReducer
    }
});

// //wrap our app in provider so that our entire app (everything nested within)
// //has access to the store
// ReactDOM.render(
//     <Provider store={store}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </Provider>,
//     document.getElementById('root'));

const root = createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)