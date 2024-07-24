import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleSetDeleteLessonModal } from "../redux/calendarSlice";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
`;
export const HourContainer = styled.div`
  display: flex;
  direction: rtl;
  align-items: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-radius: 8px;
  gap: 1rem;
  color: black;
  padding-top: 1rem;
  padding-bottom: 1em;
  width: 100%;
  position: relative;

  // @media (orientation: portrait) {
  flex-direction: column;
  // }
`;

const Hour = styled.div`
  font-size: 0.8rem;
  width: min-content;
  direction: ltr;
`;

const HourEventContainer = styled.div``;

const HourEvent = styled.div`
  font-size: 0.8rem;
`;

const DeleteButton = styled.button``;

const Lesson = ({ lesson }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("boxing");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenDeleteModal = (lessonId) => {
    return dispatch(toggleSetDeleteLessonModal(lessonId));
  };

  if (lesson.lesson.type === "private" && lesson.lesson.isApproved === true) {
    console.log(lesson.lesson);
    return (
      <HourContainer>
        {user?.user?.role === "admin" && (
          <CloseButton onClick={() => handleOpenDeleteModal(lesson)}>
            <CloseIcon style={{ fontSize: "1rem" }} />
          </CloseButton>
        )}
        <Hour>
          {lesson.lesson.startTime} - {lesson.lesson.endTime}
        </Hour>
        <strong>אימון אישי {lesson.lesson.trainer}</strong>

        <HourEventContainer>
          <HourEvent style={{ fontSize: "0.4rem" }}>
            <strong>
              {" "}
              {lesson.lesson.studentName}
              <br />
              {/* {lesson.lesson.studentMail} <br /> */}
              {lesson.lesson.studentPhone}
            </strong>
          </HourEvent>
        </HourEventContainer>
      </HourContainer>
    );
  }
  if (lesson.lesson.type === "group") {
    return (
      <HourContainer>
        {user?.user?.role === "admin" && (
          <CloseButton onClick={() => handleOpenDeleteModal(lesson)}>
            <CloseIcon style={{ fontSize: "1rem" }} />
          </CloseButton>
        )}
        <Hour>
          {lesson.lesson.startTime} - {lesson.lesson.endTime}
        </Hour>
        <HourEventContainer>
          <HourEvent>
            <h2>{lesson.lesson.trainer}</h2>
            <br />
            <h3>{lesson.lesson.name}</h3>
            {/* <br />
            <p>{lesson.lesson.description}</p> */}
          </HourEvent>
        </HourEventContainer>
      </HourContainer>
    );
  }
};

export default Lesson;
