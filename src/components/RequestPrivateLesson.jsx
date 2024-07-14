import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSetPrivateModal } from "../redux/calendarSlice.js";
import { incrementHour } from "../functions/incrementHour.js";
import styled from "styled-components";

export const RequestForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  direction: rtl;
  width: 100%;
  max-width: 30vw;
  text-align: center;

  p {
    line-height: 1.6;
  }

  label {
    width: 100%;
    text-align: center;
  }

  input,
  select {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid grey;
  }

  button {
    padding: 0.5rem 1rem;
    margin-top: 1rem;
  }
`;

const CantInContainer = styled.section`
  & > div {
    margin-bottom: 1.5rem;
  }

  div > :first-child {
    margin-top: 1.5rem;
  }
`;

const StyledSelectContainer = styled.div`
  position: relative;
  width: 100%;

  .select-disabled {
    color: #ccc;
  }

  .custom-select {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid grey;
    cursor: pointer;
    background-color: white;
  }

  .options-container {
    position: absolute;
    bottom: 100%; /* Display the options above the select */
    left: 0;
    width: 100%;
    max-height: 200px; /* Adjust height as needed */
    overflow-y: auto;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: none; /* Hide options by default */
  }

  .options-container.show {
    display: block; /* Show options when select is clicked */
  }

  .option {
    padding: 0.5rem;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: #f1f1f1;
    }
    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const RequestPrivateLesson = () => {
  const data = useSelector((state) => state.calendar.privateModalData);
  const dispatch = useDispatch();

  const [day, setDay] = useState(data.date.date);
  const [startTime, setStartTime] = useState("");
  const [trainer, setTrainer] = useState("David");
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentMail, setStudentMail] = useState("");
  const [cantIn, setCantIn] = useState([]);
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const selectRef = useRef(null);

  console.log("day to create the private lesson: ", day);

  useEffect(() => {
    if (data.thisDayLessons) {
      const lessonsArray = data.thisDayLessons
        .filter((l) => l.lesson.isApproved)
        .map((l, index) => (
          <div key={index} style={{ direction: "ltr" }}>
            {l.lesson.startTime} - {l.lesson.endTime}
            <br />
          </div>
        ));
      setCantIn(lessonsArray);
    }
  }, [data.thisDayLessons]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  const handleToggleModal = () => {
    dispatch(toggleSetPrivateModal());
  };

  const sendPostRequest = async () => {
    try {
      const endTime = incrementHour(startTime);
      const response = await fetch(
        "http://localhost:3000/api/lessons/requestPrivateLesson",
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
            trainer,
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

  const handleSelectOption = (time) => {
    setStartTime(time);
    setShowOptions(false); // Close the options container after selecting an option
  };

  const generateTimeOptions = () => {
    const options = [];
    let hour = 8;
    let minute = 0;

    while (hour < 20 || (hour === 20 && minute === 0)) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`;
      const isDisabled = cantIn.some((l) => {
        const start = l.props.children[0];
        const end = l.props.children[2];
        return time === start || (time > start && time < end) || time === end;
      });

      options.push(
        <div
          key={time}
          className={`option ${isDisabled ? "disabled" : ""}`}
          onClick={() => !isDisabled && handleSelectOption(time)}
        >
          {time}
        </div>
      );
      minute += 5;
      if (minute === 60) {
        minute = 0;
        hour += 1;
      }
    }

    return options;
  };

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <RequestForm onSubmit={handleSubmit}>
      <h1>
        <strong>{formatDateInHebrew(data.date.displayedDate)}</strong>
      </h1>

      <StyledSelectContainer ref={selectRef}>
        <div
          className="custom-select"
          onClick={() => setShowOptions(!showOptions)}
        >
          {startTime || "בחר שעה"}
        </div>
        <div className={`options-container ${showOptions ? "show" : ""}`}>
          {generateTimeOptions()}
        </div>
      </StyledSelectContainer>

      <label htmlFor="trainer">מאמן:</label>
      <select
        id="trainer"
        value={trainer}
        onChange={(e) => setTrainer(e.target.value)}
      >
        <option value="David">David</option>
        <option value="Eldad">Eldad</option>
      </select>

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
