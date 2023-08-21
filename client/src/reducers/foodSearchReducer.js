import { createSlice } from "@reduxjs/toolkit";
import * as nix from '../api/nutritionix.js'

const foodSearchSlice = createSlice({
    name: 'foodSearch',
    initialState: [],
    reducers: {
        setFoodSearch(state, action) {
            return state = action.payload
        }
    }
});

export const fetchResults = (query) => async (dispatch) => {
    try {
        const { data } = await nix.searchFood(query);
        dispatch(setFoodSearch(data.common))
    } catch (error) {
        console.log(error.message)
    }
}

export const { setFoodSearch } = foodSearchSlice.actions;

export default foodSearchSlice.reducer;