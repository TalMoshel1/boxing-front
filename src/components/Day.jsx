import React, { useState, useEffect } from "react";
import Lesson from "./HourList";
import LessonsContainer from "./LessonContainer.tsx";
import {
  toggleSetPrivateModal,
  toggleSetGroupModal,
} from "../redux/calendarSlice.js";
import "../css-components/Day.css";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const DayHeader = styled.h1`
  font-size: 2rem;
`;

const Day = ({ date, lessons }) => {
  const [thisDayLessons, setThisDayLessons] = useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("boxing") || "{}");

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
    const hebrewDate = parsedDate.toLocaleDateString("he-IL", options);
    return hebrewDate;
  };

  useEffect(() => {

    const filteredLessons = lessons.filter(
      (l) => l.displayedDate === date.displayedDate
    );
    const mappedLessons = filteredLessons.map((l) => {
      return l;
    });


    setThisDayLessons(mappedLessons);
  }, [lessons, date.displayedDate]);

  const handleToggleSetPrivateModal = () => {
    dispatch(toggleSetPrivateModal({ date, thisDayLessons }));
  };

  const handleToggleSetGroupModal = () => {
    dispatch(toggleSetGroupModal({ date, thisDayLessons }));
  };


  return (
    <div className="day">
      <DayHeader>{formatDateInHebrew(date.displayedDate)}</DayHeader>
      <button onClick={handleToggleSetPrivateModal}>
        <strong>בקש לקבוע שיעור פרטי</strong>
      </button>
      {user?.user?.role === "admin" && (
        <button onClick={handleToggleSetGroupModal}>
          <strong>קבע אימון קבוצתי</strong>
        </button>
      )}

      <LessonsContainer>
        {thisDayLessons.map((l, index) => (
          <Lesson key={index} lesson={l} />
        ))}
      </LessonsContainer>
    </div>
  );
};

export default Day;
