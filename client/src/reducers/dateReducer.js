import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
    name: 'date',
    initialState: {
        displayDate: 'Today',
        date: new Intl.DateTimeFormat('en-us', { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date())
    },
    reducers: {
        decrement(state, action) {
            const tempDate = new Date(state.date);
            tempDate.setDate(tempDate.getDate() - 1)

            return state = formatDate(tempDate);
        },
        increment(state, action) {
            const tempDate = new Date(state.date);
            tempDate.setDate(tempDate.getDate() + 1)

            return state = formatDate(tempDate);
        },
        setDate(state, action) {
            return state = action.payload;
        }
    }
});

export const formatDate = (dateObject) => {
    let displayDate;

    const date = new Intl.DateTimeFormat('en-us', { year: "numeric", month: "2-digit", day: "2-digit" }).format(dateObject);

    if(date === new Intl.DateTimeFormat('en-us', { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()))
        displayDate = 'Today'
    else
        displayDate = new Intl.DateTimeFormat('en-us', { month: 'short', day: "2-digit"}).format(dateObject)

    return { displayDate, date }
}

export const { decrement, increment, setDate } = dateSlice.actions;

export default dateSlice.reducer;