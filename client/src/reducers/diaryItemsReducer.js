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
        console.log(error)
    }
}

export const addItem = (newItem) => async (dispatch) => {
    try {
        const payload = { ...newItem }
        delete payload.isEmpty;
        const { data } = await api.createItem(payload);
        console.log(data.list)
        dispatch(setDiaryItems(data.list))
    } catch (error) {
        console.log(error)
    }
}

export const updateDiaryItems = (newList) => async (dispatch) => {
    try {
        console.log(newList)
        const { data } = await api.updateList(newList)

    } catch (error) {
        console.log(error)
    }
}

export const { setDiaryItems } = diaryItemsSlice.actions;

export default diaryItemsSlice.reducer;