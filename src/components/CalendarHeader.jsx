import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setView, incrementDate, setMonth } from '../redux/calendarSlice';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: center;
  margin: 0.75rem;
  padding: 1rem;
  gap: 0.75rem;
  direction: rtl;
  position: sticky;
  top: 0;
  /* z-index: 1; */
  justify-content: space-evenly;
  background-color: white;
`;

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const calendar = useSelector((state) => state.calendar);
  const view = useSelector((state) => state.calendar.view);


  const handleNext = () => {
    if (view === 'month') {
      dispatch(setMonth(1));
    } else if (view === 'week') {
      dispatch(incrementDate(7));
    } else {
      dispatch(incrementDate(1));
    }
  };

  const handlePrev = () => {
    if (view === 'month') {
      dispatch(setMonth(-1));
    } else if (view === 'week') {
      dispatch(incrementDate(-7));
    } else {
      dispatch(incrementDate(-1));
    }
  };

  return (
    <Header>
      <button onClick={handlePrev}>
        {view === 'week' ? 'שבוע קודם' : view === 'day' ? 'יום קודם' : ''}
      </button>
      <span>
        {currentDate.toLocaleDateString('en-US', { month: 'long' })}{' '}
        {currentDate.getFullYear()}
      </span>
      <button onClick={handleNext}>
        {view === 'week' ? 'שבוע הבא' : view === 'day' ? 'יום הבא' : ''}
      </button>
      <select
        onChange={(e) => dispatch(setView(e.target.value))}
        value={view}
      >
        <option value="week">תצוגת שבועית</option>
        <option value="day">תצוגה יומית</option>
      </select>
    </Header>
  );
};

export default CalendarHeader;
