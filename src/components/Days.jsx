import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Day from "./Day.jsx";
import { compareDates } from "../functions/compareTime.js";
import "../css-components/Days.css";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import { renderDays } from "../functions/renderDays.js";
import Modal from "./Modal.jsx";
import DeleteLesson from "./deleteLesson.jsx";
import DetailsLesson from "./detailsLesson.jsx";

const Days = () => {
  const [fetchedLessons, setFetchedLessons] = useState([]);
  const currentDateStr = useSelector((state) => state.calendar.currentDate);
  const currentDate = new Date(currentDateStr);
  const [displayedLessons, setDisplayeLessons] = useState([]);
  const [isDisplay, setIsDisplay] = useState(true);

    const isDeleteLessonModalOpen = useSelector(
    (state) => state.calendar.isDeleteLessonModalOpen
  );

  const isDetailsLessonModalOpen = useSelector(
    (state) => state.calendar.isDetailsLessonModalOpen
  );

  console.log('isDeleteLessonModalOpen: ', isDeleteLessonModalOpen)
  console.log('isDetailsLessonModalOpen: ',isDetailsLessonModalOpen)

  const startOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  };

  useEffect(() => {
    const sendPostRequest = async () => {
      setIsDisplay(false);
      try {
        const response = await fetch(
          "https://boxing-back.onrender.com/api/lessons/week",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startOfWeek: startOfWeek(new Date(currentDateStr)),
            }),
          }
        );
        if (!response.ok) {
          setIsDisplay(true);
          throw new Error(
            `HTTP error! Status: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();


        if (data.length === 0) {
          return setIsDisplay(true);
        }

        setFetchedLessons(data);
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    };
    sendPostRequest();
  }, [currentDateStr]);

  useEffect(() => {
    if (fetchedLessons?.length > 0) {
      let list = [];

      renderDays(currentDate, "week").forEach((date) => {
        fetchedLessons.forEach((l) => {
          const isEqual = compareDates(l.day, date.date);
          if (isEqual) {
            list.push({ lesson: l, displayedDate: date.displayedDate });
          }
        });
      });

      setDisplayeLessons(list);
      setIsDisplay(true);
    }
  }, [fetchedLessons]);

  const SpinnerContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  if (isDisplay) {
    return (
      <>
            <div className="days">
        {renderDays(currentDate, "week").map((day, index) => {
          if (!day.displayedDate.includes("Sat")) {
            return <Day key={index} date={day} lessons={displayedLessons} />;
          }
        })}
      </div>

             {isDeleteLessonModalOpen && (
        <Modal type="delete">
          <DeleteLesson />
        </Modal>
      )} 

       {isDetailsLessonModalOpen && (
        <Modal type="details">
          <DetailsLesson />
        </Modal>
      )} 
      </>

    );
  } else {
    return (
      <SpinnerContainer>
        <ClipLoader />
      </SpinnerContainer>
    );
  }
};

export default Days;
