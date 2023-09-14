import { createSlice } from "@reduxjs/toolkit";

const visibilitySlice = createSlice({
    name: 'visibility',
    initialState: {
        showCalendar: 'hidden',
        showItemData: 'hidden',
        showFoodModal: 'hidden',
        showTargetsModal: 'hidden'
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
        },
        showTargetsModal(state, action) {
            state.showTargetsModal = '';
            return state
        },
        hideTargetsModal(state, action) {
            state.showTargetsModal = 'hidden';
            return state
        }
    }
});


export const { toggleCalenderVisibility, showItemData, hideItemData, showFoodModal, hideFoodModal, showTargetsModal, hideTargetsModal } = visibilitySlice.actions;

export default visibilitySlice.reducer;

