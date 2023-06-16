import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dashboard from './components/dashboard/dashboard';
import Diary from './components/diary/diary';

import { fetchPayload } from './reducers/reducer';
import { dateFormatter } from './functions/date.js'

// Style Sheets
import './styles.css'
import './components/dashboard/dashboard.css'
import './components/dashboard/dashComponents/styles.css'
import './components/diary/diary.css'
import './components/diary/buttonTray/buttonTray.css'
import './components/diary/buttonTray/day/day.css'
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

    const data = useSelector(state => state.calObj)

    return (
        <div className='supremeContainer'>
            <h1 onClick={() => { setClicks(3) }}>NUMBER OF CLICKS: {clicks}</h1>
            <Dashboard />
            <Diary data={data} />
        </div>
    );
}

export default App;