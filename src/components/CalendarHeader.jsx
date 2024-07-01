import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setView, incrementDate, setMonth } from '../redux/calendarSlice';
import '../css-components/CalendarHeader.css';

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const view = useSelector((state) => state.calendar.view);


  console.log(currentDate)
  console.log(currentDate.toLocaleDateString('en-US', { month: 'long' }))
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
    <div className="header">
      <button onClick={handlePrev}>Previous</button>
      <span>
        {currentDate.toLocaleDateString('en-US', { month: 'long' })} {currentDate.getFullYear()}
      </span>
      <button onClick={handleNext}>Next</button>
      <select onChange={(e) => dispatch(setView(e.target.value))} value={view}>
        <option value="week">Week</option>
        <option value="day">Day</option>
      </select>
    </div>
  );
};

export default CalendarHeader;
