import { createSlice } from "@reduxjs/toolkit";
import * as nix from '../api/nutritionix'

const currentItemSlice = createSlice({
    name: 'currentItem',
    initialState: {
        isEmpty: true,
        type: '',
        name: '',
        calories: null,
        protein: null,
        netCarbs: null,
        fat: null
    },
    reducers: {
        setCurrentItem(state, action) {
            const item = action.payload;
            const isFood = item.objType === 'food'

            return state = {
                isEmpty: false,
                type: item.objType,
                name: item.name,
                calories: item.calories,
                protein: isFood ? item.protein : null,
                netCarbs: isFood ? item.carbs : null,   // change to item.netCarbs once you update database
                fat: isFood ? item.fat : null,
                perGram: isFood ? item.perGram : null,
                serving_weight_grams: isFood ? item.serving_weight_grams: null,
                alt_measures: isFood ? item.alt_measures: null,
            }
        }
    }
});

export const getCurrentFoodItem = (query) => async (dispatch) => {
    try {
        const apiQuery = { query: query.food_name }
        const { data } = await nix.getItemDetails(apiQuery);
        const item = data.foods[0];

        dispatch(setCurrentItem({
            objType: 'food',
            name: item.food_name,
            calories: item.nf_calories,
            protein: item.nf_protein,
            carbs: +(item.nf_total_carbohydrate - item.nf_dietary_fiber).toFixed(2),
            fat: item.nf_total_fat,
            perGram: {
                calories: item.nf_calories / item.serving_weight_grams,
                protein: item.nf_protein / item.serving_weight_grams,
                carbs: (item.nf_total_carbohydrate - item.nf_dietary_fiber) / item.serving_weight_grams,
                fat: item.nf_total_fat / item.serving_weight_grams,
            },
            serving_weight_grams: item.serving_weight_grams,
            alt_measures: item.alt_measures,
        }))

    } catch (error) {
        console.log(error)
    }
}


export const { setCurrentItem } = currentItemSlice.actions;

export default currentItemSlice.reducer;
