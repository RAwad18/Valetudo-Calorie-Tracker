//using axios to make api calls
import axios from 'axios';

//this url points to our backend route
const url = 'http://localhost:5000/'

// fetchOne will NOT work (wrong URL) --- needs to be url + 'one'
export const fetchOne = (id) => axios.get(url, { params: { id } });

// WORKS!
export const fetchItems = (date) => axios.get(url, { params: { date } });

//makes post request to the url --- sends the post being created
export const createItem = (newPost) => axios.post(url + 'one', newPost);

export const updateItems = (newList) => axios.put(url, newList);
