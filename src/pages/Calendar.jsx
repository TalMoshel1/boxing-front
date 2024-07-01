import React from 'react';
import CalendarHeader from '../components/CalendarHeader.jsx';
import Days from '../components/Days.jsx';
import '../css-pages/Calendar.css';

const Calendar = () => {
  return (
    <div className="calendar">
      <CalendarHeader />
      <div className="content">
        <Days />
      </div>
    </div>
  );
};

export default Calendar;
