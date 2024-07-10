import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSetPrivateModal } from '../redux/calendarSlice.js';
import { useSelector } from 'react-redux';
import { incrementHour } from "../functions/incrementHour.js";

const RequestPrivateLesson = () => {
  const data = useSelector((state) => state.calendar.privateModalData);
  console.log(data.date.date)
  const dispatch = useDispatch();

  const [day, setDay] = useState(data.date.date);
  const [startTime, setStartTime] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentMail, setStudentMail] = useState('');
  const [cantIn, setCantIn] = useState([]); 
  const [message, setMessage] = useState('');

  console.log('modal data: ', data);

  useEffect(() => {
    if (data.thisDayLessons) {
      let message = 'המאמן תפוס בשעות: ';
      const arrayLength = data.thisDayLessons.length;
      let lessonsArray = [];

      data.thisDayLessons.forEach((l, index) => {
        if (index === arrayLength - 1 && l.lesson.isApproved === true) {
          lessonsArray.push(`${l.lesson.startTime} עד ${l.lesson.endTime}.`);
        } else if (l.lesson.isApproved === true){
          lessonsArray.push(`${l.lesson.startTime} עד ${l.lesson.endTime},`);
        }
      });

      message += lessonsArray.join(' ');
      setCantIn(message);
    }
  }, [data.thisDayLessons]);

  const handleToggleModal = () => {
    dispatch(toggleSetPrivateModal());
  };

  const sendPostRequest = async () => {
    try {
      const endTime = incrementHour(startTime);
      const response = await fetch('http://localhost:3000/api/lessons/requestPrivateLesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ day, startTime, endTime, studentName, studentPhone, studentMail })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('request private response: ', data);
      setMessage('האימון ממתין לאישור. האישור ישלח במייל לכתובת שציינת');
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendPostRequest();
  };

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {cantIn && (
          <>
            <p>{cantIn}</p>
          </>
        )}
        <label htmlFor="startTime">Start Time (format xx:xx):</label>
        <input
          type="text"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="e.g., 08:00"
          pattern="[0-9]{2}:[0-9]{2}"
          required
          title="Please enter time in format xx:xx"
        />

        <label htmlFor="studentName">Student Name:</label>
        <input
          type="text"
          id="studentName"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />

        <label htmlFor="studentPhone">Student Phone:</label>
        <input
          type="text"
          id="studentPhone"
          value={studentPhone}
          onChange={(e) => setStudentPhone(e.target.value)}
          required
        />

        <label htmlFor="studentMail">Student Mail:</label>
        <input
          type="email"
          id="studentMail"
          value={studentMail}
          onChange={(e) => setStudentMail(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
      <button onClick={handleToggleModal}>Close</button>
    </>
  );
};

export default RequestPrivateLesson;
