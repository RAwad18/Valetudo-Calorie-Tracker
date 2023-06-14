import * as api from '../api'

export const getItems = (date) => async (dispatch) => {
    try {
        const { data } = await api.fetchItems(date);
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message)
    }
}