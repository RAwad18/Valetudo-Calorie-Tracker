import { createSlice } from "@reduxjs/toolkit";
import * as api from '../api/api';  //imports everything from api folder under the variable name api

const calObjSlice = createSlice({
    name: 'calObj',
    initialState: [],
    reducers: {
        fetchObj(state, action) {
            return state = action.payload
        },
        addObj(state, action) {
            state.push(action.payload);
        }
    }
}
)

export const fetchPayload = (date) => async (dispatch) => {
    try {
        const { data } = await api.fetchItems(date);
        dispatch(fetchObj(data))
    } catch (error) {
        console.log(error.message)
    }
}

// Action creators are generated for each case reducer function
export const { fetchObj, addObj } = calObjSlice.actions

export default calObjSlice.reducer;