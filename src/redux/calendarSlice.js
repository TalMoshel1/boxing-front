import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDate: new Date(),
  view: 'week',
  isPrivateModalOpen: false,
  privateModalData: null,
  isGroupModalOpen: false,
  groupModalData: null,
  isDeleteLessonModalOpen: false,
  deleteLessonModalData: null
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
    toggleSetPrivateModal(state, action) {
      state.isPrivateModalOpen = !state.isPrivateModalOpen;
      state.privateModalData = action.payload ? action.payload : '';
    },
    toggleSetGroupModal(state, action) {
      state.isGroupModalOpen = !state.isGroupModalOpen;
      state.groupModalData = action.payload ? action.payload : '';
    },
    toggleSetDeleteLessonModal(state, action) {
      state.isDeleteLessonModalOpen = !state.isDeleteLessonModalOpen;
      state.deleteLessonModalData = action.payload ? action.payload : '';
    }
  },
});

export const { setView, incrementDate, setMonth, toggleSetPrivateModal, toggleSetGroupModal, toggleSetDeleteLessonModal} = calendarSlice.actions;
export default calendarSlice.reducer;