import React from 'react';
import { useSelector } from 'react-redux';
import Day from './Day.jsx';
import '../css-components/Days.css';

const Days = () => {
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const view = useSelector((state) => state.calendar.view);

  const startOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  };

  const addDays = (date, days) => {
    return new Date(date.getTime() + days * 86400000);
  };

  const formatDate = (date) => {
    console.log('date: ',date)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const renderDays = () => {
    let days = [];
    let startDate;
    if (view === 'week') {
      startDate = startOfWeek(currentDate);
      for (let i = 0; i < 7; i++) {
        days.push(formatDate(addDays(startDate, i)));
      }
    } else if (view === 'day') {
      days.push(formatDate(currentDate));
    }
    return days;
  };

  return (
    <div className="days">
      {renderDays().map((day, index) => (
        <Day key={index} date={day} />
      ))}
    </div>
  );
};

export default Days;
