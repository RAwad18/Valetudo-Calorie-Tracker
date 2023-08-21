import axios from 'axios';

const nutritionix = axios.create({
    headers: {
        'x-app-id': import.meta.env.VITE_FOOD_API_ID,
        'x-app-key': import.meta.env.VITE_FOOD_API_KEY,
        'x-remote-user-id': 0
    }
})

const foodSearchURL = 'https://trackapi.nutritionix.com/v2/search/instant'

const itemDetailsURL = 'https://trackapi.nutritionix.com/v2/natural/nutrients'

const url = 'http://localhost:5000/api_test'


export const searchFood = (query) => nutritionix.get(foodSearchURL, { params: { query } });

export const getItemDetails = (query) => nutritionix.post(itemDetailsURL, query);


