import axios from 'axios';

const url = 'http://localhost:5000/';

export const getList = (date) => axios.get(url, { params: { date } });
export const createItem = (newPost) => axios.post(url, newPost);
export const updateList = (newList) => axios.put(url, newList);
export const updateItem = (updatedItem) => axios.patch(url, updatedItem)