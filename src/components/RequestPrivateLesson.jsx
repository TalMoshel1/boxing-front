import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSetPrivateModal } from "../redux/calendarSlice.js";
import { incrementHour } from "../functions/incrementHour.js";
import styled from "styled-components";

const RequestForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  direction: rtl;
  width: 100%;
  max-width: 30vw;
  text-align: center;
}

  p {
    line-height: 1.6;
  }

  label {
    width: 100%;
    text-align: right;
    text-align: center;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    text-align: center;
  }

  button {
    padding: 0.5rem 1rem;
    margin-top: 1rem;
  }
`;

const RequestPrivateLesson = () => {
  const data = useSelector((state) => state.calendar.privateModalData);
  const dispatch = useDispatch();

  const [day, setDay] = useState(data.date.date);
  const [startTime, setStartTime] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentMail, setStudentMail] = useState("");
  const [cantIn, setCantIn] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (data.thisDayLessons) {
      let message = "המאמן תפוס בשעות: ";
      const lessonsArray = data.thisDayLessons
        .filter(l => l.lesson.isApproved)
        .map(l => `${l.lesson.startTime} עד ${l.lesson.endTime}`);

      message += lessonsArray.join(", ");
      setCantIn(message);
    }
  }, [data.thisDayLessons]);

  const handleToggleModal = () => {
    dispatch(toggleSetPrivateModal());
  };

  const sendPostRequest = async () => {
    try {
      const endTime = incrementHour(startTime);
      const response = await fetch(
        "https://boxing-back.onrender.com/api/lessons/requestPrivateLesson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            day,
            startTime,
            endTime,
            studentName,
            studentPhone,
            studentMail,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setMessage("האימון ממתין לאישור. האישור ישלח במייל לכתובת שציינת");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendPostRequest();
  };

  const formatDateInHebrew = (dateString) => {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date format");
    }
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return parsedDate.toLocaleDateString("he-IL", options);
  };

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <RequestForm onSubmit={handleSubmit}>
      <h1>
        <strong>{formatDateInHebrew(data.date.displayedDate)}</strong>
      </h1>
      {cantIn.length > 0 && (
        <p>
          <strong>{cantIn}</strong>
        </p>
      )}
      <label htmlFor="startTime">
        בחר שעה <strong>(פורמט xx:xx)</strong>:
      </label>
      <input
        type="text"
        id="startTime"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        placeholder="לדוגמא: 08:00"
        pattern="[0-9]{2}:[0-9]{2}"
        required
        title="Please enter time in format xx:xx"
      />

      <label htmlFor="studentName">שם מלא:</label>
      <input
        type="text"
        id="studentName"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        required
      />

      <label htmlFor="studentPhone">מספר פלאפון ליצירת קשר:</label>
      <input
        type="text"
        id="studentPhone"
        value={studentPhone}
        onChange={(e) => setStudentPhone(e.target.value)}
        required
      />

      <label htmlFor="studentMail">כתובת מייל מלאה:</label>
      <input
        type="email"
        id="studentMail"
        value={studentMail}
        onChange={(e) => setStudentMail(e.target.value)}
        required
      />

      <button type="submit">שלח</button>
    </RequestForm>
  );
};

export default RequestPrivateLesson;
