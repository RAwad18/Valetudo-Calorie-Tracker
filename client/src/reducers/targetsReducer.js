import { createSlice } from "@reduxjs/toolkit";
import * as api from '../api/backend.js'

const targetsSlice = createSlice({
    name: 'targets',
    initialState: {
        calorieGoal: 'N/A',
        proteinGoal: 'N/A',
        netCarbsGoal: 'N/A',
        fatGoal: 'N/A'
    },
    reducers: {
        setTargets(state, action) {
            return state = action.payload
        }
    }
});

export const retrieveTargets = () => async (dispatch) => {
    try {
        const { data } = await api.getUserData();
        dispatch(setTargets(data))
    } catch (error) {
        console.log(error)
    }
}

export const updateTargets = (payload) => async (dispatch) => {
    try {
        dispatch(setTargets(payload));
        const { data } = await api.updateUserData(payload);
        console.log(data)
    } catch (error) {
        console.log(error)
    }

}

export const { setTargets } = targetsSlice.actions;

export default targetsSlice.reducer;