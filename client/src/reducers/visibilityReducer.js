import { createSlice } from "@reduxjs/toolkit";

const visibilitySlice = createSlice({
    name: 'visibility',
    initialState: {
        showCalendar: 'hidden',
        showItemData: 'hidden',
        showFoodModal: 'hidden'
    },
    reducers: {
        toggleCalenderVisibility(state, action) {
            // showCalender: visibilityOptions.showCalender === 'hidden' ? '' : 'hidden'
            state.showCalendar = state.showCalendar === 'hidden' ? '' : 'hidden';
            return state
        },
        showItemData(state, action) {
            state.showItemData = '';
            return state
        },
        hideItemData(state, action) {
            state.showItemData = 'hidden';
            return state
        },
        showFoodModal(state, action) {
            state.showFoodModal = '';
            return state
        },
        hideFoodModal(state, action) {
            state.showFoodModal = 'hidden';
            return state
        }
    }
});


export const { toggleCalenderVisibility, showItemData, hideItemData, showFoodModal, hideFoodModal } = visibilitySlice.actions;

export default visibilitySlice.reducer;

