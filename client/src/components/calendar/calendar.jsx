import { useState } from 'react';
import Calendar from 'react-calendar';
import '../../styles/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDate as setDateFn } from '../../reducers/dateReducer';
import { formatDate } from '../../reducers/dateReducer';


const CalendarComponent = () => {

    const date = useSelector(state => state.date.date)
    console.log(date)

    const dispatch = useDispatch();

    const setDate = (dateObject) => {
        const newDate = formatDate(dateObject)
        dispatch(setDateFn(newDate))
        console.log(date)
    }

    return (
        <>
            <Calendar minDetail='month' value={date} onChange={(value, event) => setDate(value)} />
        </>
    )
}

export default CalendarComponent;