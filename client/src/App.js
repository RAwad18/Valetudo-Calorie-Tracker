import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dashboard from './components/dashboard/dashboard';
import Diary from './components/diary/diary';

import { fetchPayload } from './reducers/reducer';
import { dateFormatter } from './functions/date.js';

// Style Sheets
import './styles.css'
import './components/dashboard/dashboard.css'
import './components/dashboard/dashComponents/styles.css'
import './components/diary/diary.css'
import './components/diary/buttonTray/buttonTray.css'
import './components/diary/buttonTray/day/day.css'
import './components/modal/modal.css'
import './components/diary/diaryTable/diaryTable.css'


import './components/diary/diary'

//gets called in index.js to generate our page
const App = () => {

    //Determines how many days away we are from "Today" --- default value is zero
    const [clicks, setClicks] = useState(0);
    const [date, setDate] = useState(dateFormatter(clicks));


    //defines dispatch hook
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPayload('06/08/2023'));
    }, [dispatch]);

    const itemsList = useSelector(state => state.calObj)

    // Returns the 'total' of whatever property we want the sum of
    // Every calorieObject has a property of 'calories', but not all of them have macros (ex. activity objects)
    const dataCalculator = (list, property) => {
        if (property === 'calories')
            return list.reduce((accumulator, currentObject) => accumulator + currentObject[property], 0)

        const containsProperty = list.filter(listItem => listItem[property]);
        const propertyValues = containsProperty.map(object => object[property]);
        return propertyValues.reduce((currentTotal, currentValue) => currentTotal + currentValue, 0)
    }

    // Totals of each property wrapped up in a neat little bow --- to be passed to the children
    const data = {
        calories: dataCalculator(itemsList, 'calories'),
        protein: dataCalculator(itemsList, 'protein'),
        carbs: dataCalculator(itemsList, 'carbs'),
        fat: dataCalculator(itemsList, 'fat')
    }

    return (
        <div className='supremeContainer'>
            <h1 onClick={() => { setClicks(3) }}>NUMBER OF CLICKS: {clicks}</h1>
            <Dashboard data={data} />
            <Diary itemsList={itemsList} />
        </div>
    );
}

export default App;