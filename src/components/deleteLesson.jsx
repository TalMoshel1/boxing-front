import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toggleSetDeleteLessonModal, setLessonsToDisplay } from "../redux/calendarSlice.js";

const DeleteLesson = () => {
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.calendar.deleteLessonModalData);
  const [boxing, setBoxing] = useState(localStorage.getItem("boxing"));
  const token = JSON.parse(boxing)?.token;
  const [isDeleteAll, setIsDeleteAll] = useState(false);

  const handleToggleModal = (obj) => {
    dispatch(toggleSetDeleteLessonModal());
    if (obj) {
      dispatch(setLessonsToDisplay(obj))

    }
  };


  const handleDeleteAllChange = (event) => {
    setIsDeleteAll(event.target.checked);
  };

  const deleteLesson = async (lessonId) => {
    console.log(lessonId);
    console.log(token);
    try {
      const response = await fetch(
        `https://boxing-back.onrender.com/api/lessons/${lessonId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({ deleteAll: isDeleteAll }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('deleted: ',data)
      handleToggleModal({type: 'deleteDisplayedLesson', id: lessonId});
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  const DeleteContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;

  return (
    <DeleteContainer>
      {lesson.lesson.repeatsWeekly && (
        <label>
          מחק את כל השיעורים
          <input
            type="checkbox"
            checked={isDeleteAll}
            onChange={handleDeleteAllChange}
          />
        </label>
      )}

      <button
        type="button"
        onClick={() => {
          deleteLesson(lesson.lesson._id);
        }}
      >
        מחק
      </button>
    </DeleteContainer>
  );
};

export default DeleteLesson;
