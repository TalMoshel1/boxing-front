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
  if (displayedData.length > 0) {
    console.log(displayedData)
    const time = displayedData[0].day
    const date = new Date(time)

    if (displayedData.length > 0) { 
      return (
        <ul style={styles.listContainer}>
                  <h1>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</h1>
  
          {displayedData.map((l, index) => {
            if (user?.user?.role === "admin" && l.type === "private") {
              return (
                <li key={index} style={styles.listItem}>
                  <span style={{direction: 'ltr'}}>{l.startTime} - {l.endTime}</span><span><strong>אימון אישי</strong></span><span>מתאמן: {l.studentName}</span><span>מאמן: {l.trainer}</span><span>{l.lesson}</span>
                  <button onClick={() => handleOpenDeleteModal(l)}>
                    <strong>בטל</strong>
                  </button>
                </li>
              );
            }
  
            return (
              <li key={index} style={styles.listItem}>
                <span style={{direction: 'ltr'}}>{l.startTime} - {l.endTime}</span> <span>{l.name}</span> <span>{l.trainer}</span> <span>{l.description}</span>
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

    return (
      <h1>לחץ על תאריך צבוע</h1>
    )

 
  }
};

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Centers items horizontally
    justifyContent: "center", // Centers items vertically
    listStyleType: "none", // Removes bullet points from list
    border: "none",
    margin: 0, 
    direction: 'rtl',
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
