import { createSlice } from "@reduxjs/toolkit";

const nutritionSlice = createSlice({
    name: 'nutrition',
    initialState: {
        netCalories: 0,
        consumedCalories: 0,
        protein: 0,
        netCarbs: 0,
        fat: 0
    },
    reducers: {
        updateNutrition(state, action) {
            const data = {
                netCalories: dataCalculator(action.payload, 'netCalories'),
                consumedCalories: dataCalculator(action.payload, 'consumedCalories'),
                protein: dataCalculator(action.payload, 'protein'),
                netCarbs: dataCalculator(action.payload, 'carbs'),
                fat: dataCalculator(action.payload, 'fat')
            }

            return state = {
                netCalories: data.netCalories,
                consumedCalories: data.consumedCalories,
                protein: data.protein,
                netCarbs: data.netCarbs,
                fat: data.fat
            }
        }
    }
});

const dataCalculator = (list, property) => {
    if (property === 'netCalories')
        return list.reduce((accumulator, currentObject) => accumulator + currentObject['calories'], 0)

    if (property === 'consumedCalories') {
        const isFood = list.filter(listItem => listItem.objType === 'food');
        return isFood.reduce((accumulator, currentObject) => accumulator + currentObject['calories'], 0)
    }


    const containsProperty = list.filter(listItem => listItem[property]);
    const propertyValues = containsProperty.map(object => object[property]);
    return propertyValues.reduce((currentTotal, currentValue) => currentTotal + currentValue, 0)
}

export const { updateNutrition } = nutritionSlice.actions;

export default nutritionSlice.reducer;