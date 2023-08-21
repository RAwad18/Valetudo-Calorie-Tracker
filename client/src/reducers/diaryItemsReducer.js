import { createSlice } from "@reduxjs/toolkit";
import * as api from '../api/backend.js'

const diaryItemsSlice = createSlice({
    name: 'diaryItems',
    initialState: [],
    reducers: {
        setDiaryItems(state, action) {
            return state = action.payload
        }
    }
});

export const fetchData = (date) => async (dispatch) => {
    try {
        const { data } = await api.getList(date);
        dispatch(setDiaryItems(data))
    } catch (error) {
        console.log(error.message)
    }
}

export const { setDiaryItems } = diaryItemsSlice.actions;

export default diaryItemsSlice.reducer;