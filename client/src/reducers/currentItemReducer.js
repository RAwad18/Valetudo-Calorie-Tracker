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
            const isFood = item.type === 'food'

            return state = {
                isEmpty: false,
                type: item.type,
                name: item.name,
                date: item.date,
                calories: item.calories,
                protein: isFood ? item.protein : null,
                netCarbs: isFood ? item.carbs || item.netCarbs : null,   // change to item.netCarbs once you update database
                fat: isFood ? item.fat : null,
                perGram: isFood ? item.perGram : null,
                serving_qty : isFood ? item.serving_qty : null,
                serving_unit: isFood ? item.serving_unit: null,
                serving_weight_grams: isFood ? item.serving_weight_grams: null,
                alt_measures: isFood ? item.alt_measures: null,
            }
        },
        isLoading(state, action) {
            state.isEmpty = true;
            return state;
        }
    }
});

export const capitalizer = (string) => {
    const arrayOfStr = string.split(" ").map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(" ")

    return arrayOfStr
}

export const getCurrentFoodItem = (query) => async (dispatch) => {
    
    dispatch(isLoading())
    try {
        const apiQuery = { query: query.food_name }
        const { data } = await nix.getItemDetails(apiQuery);
        const item = data.foods[0];

        dispatch(setCurrentItem({
            type: 'food',
            name: capitalizer(item.food_name),
            date: query.date,
            calories: item.nf_calories,
            protein: item.nf_protein,
            netCarbs: +(item.nf_total_carbohydrate - item.nf_dietary_fiber).toFixed(2),
            fat: item.nf_total_fat,
            perGram: {
                calories: item.nf_calories / item.serving_weight_grams,
                protein: item.nf_protein / item.serving_weight_grams,
                netCarbs: (item.nf_total_carbohydrate - item.nf_dietary_fiber) / item.serving_weight_grams,
                fat: item.nf_total_fat / item.serving_weight_grams,
            },
            serving_qty: item.serving_qty,
            serving_unit: item.serving_unit,
            serving_weight_grams: item.serving_weight_grams,
            alt_measures: item.alt_measures,
        }))

    } catch (error) {
        console.log(error)
    }
}


export const { setCurrentItem, isLoading } = currentItemSlice.actions;

export default currentItemSlice.reducer;
