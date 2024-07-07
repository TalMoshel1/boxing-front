import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setView, incrementDate, setMonth } from '../redux/calendarSlice';
import '../css-components/CalendarHeader.css';

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const calendar = useSelector((state)=>state.calendar)
  const view = useSelector((state) => state.calendar.view);

  console.log(calendar)





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
      <button onClick={handlePrev}>{view === 'week' ? 'שבוע קודם' : view === 'day' ? 'יום קודם': ''}</button>
      <span>
        {currentDate.toLocaleDateString('en-US', { month: 'long' })} {currentDate.getFullYear()}
      </span>
      <button onClick={handleNext}>{view === 'week' ? 'שבוע הבא' : view === 'day' ? 'יום הבא': ''}</button>
      <select onChange={(e) => dispatch(setView(e.target.value))} value={view}>
        <option value="week">תצוגת שבועית</option>
        <option value="day">תצוגה יומית</option>
      </select>
    </div>
  );
};

export default CalendarHeader;