import React, { useState, useEffect } from "react";
import Lesson from "./HourList";
import LessonsContainer from "./LessonContainer.tsx";
import {
  toggleSetPrivateModal,
  toggleSetGroupModal,
} from "../redux/calendarSlice.js";
import { formatThreeLettersMonthAndDaysToHebrew } from '../functions/formatThreeLettersMonthAndDaysToHebrew';
import "../css-components/Day.css";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { isSameDate } from "../functions/compareDatesFormats.js";

const DayHeader = styled.h1`
    @media (orientation: portrait) {
      font-size: 1rem;
  }
  padding:1rem;
`;

const DayStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    position:sticky;
  top:0;
    margin-block-start: 0;


  }
    

`;

const Day = ({ date, lessons, removeLesson }) => {
  const [thisDayLessons, setThisDayLessons] = useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("boxing") || "{}");


  const today = new Date()



  useEffect(() => {

    const filteredLessons = lessons.filter(
      (l) => l.displayedDate === date.displayedDate
    );
    const mappedLessons = filteredLessons.map((l) => {
      return l;
    });



    setThisDayLessons(mappedLessons);
  }, [lessons, date.displayedDate]);

  const dayOfTheWeek = date.displayedDate.split(',')[0]

  return (
    <DayStyle className="day">
      <DayHeader>{formatThreeLettersMonthAndDaysToHebrew('day',dayOfTheWeek)}</DayHeader>
      <LessonsContainer>
        {thisDayLessons.map((l, index) => (
          <Lesson key={index} lesson={l} removeLesson={removeLesson} />
        ))}
      </LessonsContainer>
    </DayStyle>
  );
};

export default Day;
