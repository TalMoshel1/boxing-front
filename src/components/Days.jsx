import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Day from "./Day.jsx";
import { compareDates } from "../functions/compareTime.js";
import { renderDays } from "../functions/computingDays.js";
import "../css-components/Days.css";
import { current } from "@reduxjs/toolkit";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const Days = () => {
  const [fetchedLessons, setFetchedLessons] = useState([]);
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const view = useSelector((state) => state.calendar.view);
  const [displayedLessons, setDisplayeLessons] = useState([]);
  const [isDisplay, setIsDisplay] = useState(true);

  console.log("currentDate: ", currentDate);

  const startOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  };

  const addDays = (date, days) => {
    return new Date(date.getTime() + days * 86400000);
  };

  const formatDate = (date) => {
    return {
      displayedDate: date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      date: date,
    };
  };

  const renderDays = () => {
    let days = [];
    let startDate;
    if (view === "week") {
      startDate = startOfWeek(currentDate);
      for (let i = 0; i < 7; i++) {
        days.push(formatDate(addDays(startDate, i)));
      }
    } else if (view === "day") {
      days.push(formatDate(currentDate));
    }
    return days;
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
            body: JSON.stringify({ startOfWeek: currentDate }),
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
          console.log("great");
          return setIsDisplay(true);
        }

        setFetchedLessons(data);
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    };
    sendPostRequest();
  }, [currentDate]);

  useEffect(() => {
    if (fetchedLessons?.length > 0) {
      let list = [];

      renderDays().forEach((date) => {
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
    left: 50%;
    transform: translatex(-50%, -50%);
  `;
  if (isDisplay) {
    console.log("displayedLessons: ", displayedLessons);
    return (
      <div className="days">
        {renderDays().map((day, index) => (
          <Day key={index} date={day} lessons={displayedLessons} />
        ))}
      </div>
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
