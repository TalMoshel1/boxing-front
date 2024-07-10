import React, { useState, useEffect } from "react";
import "../css-components/HourList.css";
import { useDispatch } from "react-redux";
import { toggleSetDeleteLessonModal } from '../redux/calendarSlice';

const Lesson = ({ lesson }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('boxing');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenDeleteModal = (lessonId) => {
    console.log('modal need to be opened');
    return dispatch(toggleSetDeleteLessonModal(lessonId));
  };

  if (lesson.lesson.type === 'private') {
    return (
      <div className='hour-container'>
        {user?.user?.role === 'admin' && <button onClick={() => handleOpenDeleteModal(lesson.lesson._id)}>מחק אימון</button>}
        <strong>אימון אישי</strong>
        <div className="hour">
          {lesson.lesson.startTime} <br /> {lesson.lesson.endTime}
        </div>
        <div className="hour-event-container">
          <div className="hour-event">
            {lesson.lesson.studentName}<br /> {lesson.lesson.studentMail} <br /> {lesson.lesson.studentPhone}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='hour-container'>
      {user?.user?.role === 'admin' && <button onClick={() => handleOpenDeleteModal(lesson.lesson._id)}>מחק אימון</button>}
      <strong>אימון קבוצתי</strong>
      <div className="hour">
        {lesson.lesson.startTime} <br /> {lesson.lesson.endTime}
      </div>
      <div className="hour-event-container">
        <div className="hour-event">
          {lesson.lesson.name} - {lesson.lesson.trainer}
        </div>
        <div className="hour-event">{lesson.lesson.description}</div>
      </div>
    </div>
  );
};

export default Lesson;

