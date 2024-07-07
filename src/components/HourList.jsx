import React from "react";
import "../css-components/HourList.css";

const Lesson = ({ lesson }) => {
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
