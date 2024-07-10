import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteLesson = () => {
  const dispatch = useDispatch();
  const lessonId = useSelector((state) => state.calendar.deleteLessonModalData);
  const [boxing, setBoxing] = useState(localStorage.getItem("boxing"));
  const token = JSON.parse(boxing)?.token;
  const [isDeleteAll, setIsDeleteAll] = useState(false);

  const handleDeleteAllChange = (event) => {
    setIsDeleteAll(event.target.checked);
  };

  const deleteLesson = async (lessonId) => {
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
      console.log("Lesson deleted:", data);
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  return (
    <form>
      <label>
        Delete all lessons:
        <input
          type="checkbox"
          checked={isDeleteAll}
          onChange={handleDeleteAllChange}
        />
      </label>
      <button type="button" onClick={() => deleteLesson(lessonId)}>
        Delete Lesson
      </button>
    </form>
  );
};

export default DeleteLesson;
