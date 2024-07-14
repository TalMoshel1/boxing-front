import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toggleSetDeleteLessonModal } from "../redux/calendarSlice.js";

const DeleteLesson = () => {
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.calendar.deleteLessonModalData);
  const [boxing, setBoxing] = useState(localStorage.getItem("boxing"));
  const token = JSON.parse(boxing)?.token;
  const [isDeleteAll, setIsDeleteAll] = useState(false);

  const handleToggleModal = () => {
    dispatch(toggleSetDeleteLessonModal());
  };

  const handleDeleteAllChange = (event) => {
    setIsDeleteAll(event.target.checked);
  };

  const deleteLesson = async (lessonId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/lessons/${lessonId}`,
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
      console.log("Lesson deleted:", data);
      handleToggleModal();
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
