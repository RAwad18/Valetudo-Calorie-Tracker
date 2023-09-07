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

const filterDuplicates = (arrayOfDuplicates) => {
    let copyOfDuplicates = [...arrayOfDuplicates];
    let reducedDuplicates = [];

    while (copyOfDuplicates.length > 0) {
        const currentTagId = copyOfDuplicates[0].tag_id;
        reducedDuplicates.push(copyOfDuplicates[0])
        const filtered = copyOfDuplicates
            .filter(object => object.tag_id !== currentTagId)
        copyOfDuplicates = [...filtered]
    }
    return reducedDuplicates;
}

export const fetchResults = (query) => async (dispatch) => {
    try {
        const { data } = await nix.searchFood(query);
        const tagIDCount = data.common
            .reduce((accumulated, current) => {
                accumulated[current.tag_id] = (accumulated[current.tag_id] || 0) + 1;
                return accumulated;
            }, {})
        const duplicates = data.common
            .filter(obj => {
                return tagIDCount[obj.tag_id] > 1
            })

        const nonDuplicates = data.common
            .filter(obj => {
                return tagIDCount[obj.tag_id] <= 1
            })

        const reducedDuplicates = filterDuplicates(duplicates)
        const filteredData = [...reducedDuplicates, ...nonDuplicates]

        dispatch(setFoodSearch(filteredData))
    } catch (error) {
        console.log(error)
    }
}

export const { setFoodSearch } = foodSearchSlice.actions;

export default foodSearchSlice.reducer;