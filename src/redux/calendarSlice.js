import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDate: new Date(),
  view: 'week',
  isModalOpen: false,
  modalData: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },
    incrementDate: (state, action) => {
      const days = action.payload;
      state.currentDate = new Date(state.currentDate.getTime() + days * 86400000);
    },
    setMonth: (state, action) => {
      const months = action.payload;
      state.currentDate = new Date(state.currentDate.setMonth(state.currentDate.getMonth() + months));
    },
    toggleSetmodal(state, action) {
      state.isModalOpen = !state.isModalOpen;
      state.modalData = action.payload ? action.payload : '';
    }
  },
});

export const { setView, incrementDate, setMonth, toggleSetmodal } = calendarSlice.actions;
export default calendarSlice.reducer;