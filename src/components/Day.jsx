import React, { useState, useEffect } from "react";
import Lesson from "./HourList";
import LessonsContainer from './LessonContainer.tsx'
import { toggleSetmodal } from '../redux/calendarSlice.js'
import "../css-components/Day.css";
import { useDispatch } from "react-redux";

export function Day({ date, lessons }) {
  const [thisDayLessons, setThisDayLessons] = useState([]);
  const dispatch = useDispatch();
  const token = localStorage.getItem('boxing')


  const formatDateInHebrew = (dateString) => {
    const parsedDate = new Date(dateString);

    if (isNaN(parsedDate)) {
      throw new Error('Invalid date format');
    }
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    const hebrewDate = parsedDate.toLocaleDateString('he-IL', options);

    return hebrewDate;
  }

  useEffect(() => {
    const filteredLessons = lessons.filter(l => l.displayedDate === date.displayedDate);
    setThisDayLessons(filteredLessons);
  }, [lessons, date.displayedDate]);

  const handleToggleModal = () => {
    dispatch(toggleSetmodal({ date, thisDayLessons }));
  }

  return (
    <div className="day">
      <p>{formatDateInHebrew(date.displayedDate)}</p>
      <LessonsContainer>
        {thisDayLessons.map((l, index) => (
          <Lesson key={index} lesson={l} />
        ))}
        <button onClick={handleToggleModal}> בקש לקבוע שיעור פרטי</button>
      </LessonsContainer>
    </div>
  )
}

export default Day;
