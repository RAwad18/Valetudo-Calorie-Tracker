import axios from 'axios';

const nutritionix = axios.create({
    headers: {
        'x-app-id': process.env.REACT_APP_FOOD_API_ID,
        'x-app-key': process.env.REACT_APP_FOOD_API_KEY,
        'x-remote-user-id': 0
    }
})

const foodSearchURL = 'https://trackapi.nutritionix.com/v2/search/instant'
const url = 'http://localhost:5000/api_test'


export const searchFood = (query) => nutritionix.get(foodSearchURL, { params: { query } });

export const searchFoodTest = (query) => nutritionix.get(url, { params: { query } });

