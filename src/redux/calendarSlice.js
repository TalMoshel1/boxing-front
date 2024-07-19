import { createSlice } from '@reduxjs/toolkit';

const startOfWeek = (date) => {
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.setDate(diff));
};

const initialState = {
  currentDate: new Date().toISOString(),
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
      const date = new Date(state.currentDate)
      const newDate = new Date(date.getTime() + days * 86400000)
      const newDate2 = startOfWeek(newDate)
      state.currentDate = `${newDate2}`
    },
    setMonth: (state, action) => {
      // const months = action.payload;
      // date = new Date(state.currentDate)
      // state.currentDate = new Date(state.currentDate.setMonth(state.currentDate.getMonth() + months));
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