import React from "react";
import "../css-components/HourList.css";

const Lesson = ({ lesson }) => {
  if (lesson.lesson.type === 'private') {
    console.log(lesson.lesson)
    return (
      <div className='hour-container'>
      <div className="hour">
        {lesson.lesson.startTime} <br/> {lesson.lesson.endTime}
      </div>
      <div className="hour-event-container">
        <div className="hour-event">
          {lesson.lesson.studentName}<br/> {lesson.lesson.studentMail} <br/> {lesson.lesson.studentPhone}
        </div>
        <div className="hour-event">אימון אישי</div>
      </div>
    </div>
    )
  }
  return (
          <div className='hour-container'>
            <div className="hour">
              {lesson.lesson.startTime} <br/> {lesson.lesson.endTime}
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
