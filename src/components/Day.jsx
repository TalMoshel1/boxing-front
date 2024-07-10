import React, { useState, useEffect } from "react";
import Lesson from "./HourList";
import LessonsContainer from './LessonContainer.tsx'
import { toggleSetPrivateModal, toggleSetGroupModal } from '../redux/calendarSlice.js'
import "../css-components/Day.css";
import { useDispatch } from "react-redux";

export function Day({ date, lessons }) {
  const [thisDayLessons, setThisDayLessons] = useState([]);
  const dispatch = useDispatch();
  const {user} = JSON.parse(localStorage.getItem('boxing'))

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

  const handleToggleSetPrivateModal = () => {
    console.log({ date, thisDayLessons})

    dispatch(toggleSetPrivateModal({ date, thisDayLessons}));
  }

  const handleToggleSetGroupModal = () => {
    console.log('data: ',{ date, thisDayLessons})
    dispatch(toggleSetGroupModal({ date, thisDayLessons}));
  }

  return (
    <div className="day">
      <p>{formatDateInHebrew(date.displayedDate)}</p>
      <button onClick={handleToggleSetPrivateModal}> בקש לקבוע שיעור פרטי</button>
     {user.role === 'admin' && <button onClick={handleToggleSetGroupModal}> קבע אימון קבוצתי</button>} 

      <LessonsContainer>
        {thisDayLessons.map((l, index) => {
          if (user.role === 'admin' && l.lesson.type === 'private' && l.lesson.isApproved === true)  {
            return <Lesson key={index} lesson={l} />

          }
          if (l.lesson.type !== 'private') {
            return <Lesson key={index} lesson={l} />

          }
        }
        )}
      </LessonsContainer>
    </div>
  )
}

export default Day;
