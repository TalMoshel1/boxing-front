import React, { useEffect, useState } from "react";
import { toggleSetDeleteLessonModal } from "../redux/calendarSlice";
import { useDispatch, useSelector } from "react-redux";

export const IndividualDay = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const displayedData = useSelector((state) => state.calendar.lessonsToDisplay);

  const handleOpenDeleteModal = (lesson) => {
    console.log(lesson)
    const editedLesson = {lesson: lesson}
    return dispatch(toggleSetDeleteLessonModal(editedLesson));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("boxing");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  console.log(displayedData)
  if (displayedData) {
    return (
      <ul style={styles.listContainer}>
        {displayedData.map((l, index) => {
          if (user?.user?.role === "admin" && l.type === "private") {
            return (
              <li key={index} style={styles.listItem}>
                <span>{l.startTime} - {l.endTime}</span><span><strong>אימון אישי</strong></span><span>מתאמן: {l.studentName}</span><span>מאמן: {l.trainer}</span><span>{l.lesson}</span>
                <button onClick={() => handleOpenDeleteModal(l)}>
                  <strong>בטל</strong>
                </button>
              </li>
            );
          }

          return (
            <li key={index} style={styles.listItem}>
              <span>{l.startTime} - {l.endTime}</span> <span>{l.name}</span> <span>{l.trainer}</span> <span>{l.description}</span>
              {user?.user?.role === "admin" && (
                <button onClick={() => handleOpenDeleteModal(l)}>
                  <strong>בטל</strong>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    );
  }
};

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Centers items horizontally
    justifyContent: "center", // Centers items vertically
    // minHeight: "100vh", // Ensures full viewport height
    listStyleType: "none", // Removes bullet points from list
    // padding: 0, // Removes default padding
    margin: 0, // Removes default margin
    direction: 'rtl',
    paddingInlineStart: '0'
  },
  listItem: {
    position: "relative",
    textAlign: "center", // Centers text within each item
    margin: "10px 0", // Adds vertical spacing between items
    padding: "10px", // Adds padding within each item
    border: "1px solid #ccc", // Adds a border for better visibility
    borderRadius: "5px", // Rounds the corners of the border
    width: "80%", // Sets a fixed width for each item
    maxWidth: "400px", // Sets a maximum width for each item
    display: "flex",
    justifyContent: "space-evenly"
  },
};

export default IndividualDay;
