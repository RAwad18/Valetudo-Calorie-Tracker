import { createSlice } from "@reduxjs/toolkit";
import * as nix from '../api/nutritionix';  //imports everything from api folder under the variable name api

const foodListSlice = createSlice({
    name: 'foodList',
    initialState: [],
    reducers: {
        setList(state, action) {
            return state = action.payload
        },
    }
}
)

// export const fetchList = (query) => async (dispatch) => {
//     try {
//         const { data } = await nix.searchFood(query);
//         console.log(data);
//     } catch (error) {
//         console.log(error.message)
//     }
// }

export const fetchList = (query) => async (dispatch) => {
    try {
        const { data } = await nix.searchFoodTest(query);
        const common = data.common.slice(0, 5).map(food => ({ name: food.food_name, picture: food.photo.thumb }));
        const branded = data.branded.slice(0, 5).map(food => ({ id: food.nix_item_id, name: food.food_name, calPerServ: food.nf_calories, picture: food.photo.thumb }));
        dispatch(setList({ common, branded }))
    } catch (error) {
        console.log(error.message)
    }
}

// Action creators are generated for each case reducer function
export const { setList } = foodListSlice.actions

export default foodListSlice.reducer;