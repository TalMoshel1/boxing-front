import React, { useEffect, useState } from "react";
import {
  toggleSetDeleteLessonModal,
  toggleSetDetailsLessonModal,
} from "../redux/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { CloseButton, InfoButton } from "./HourList";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

export const IndividualDay = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const displayedData = useSelector((state) => state.calendar.lessonsToDisplay);

  console.log(displayedData)

  const handleOpenDeleteModal = (lesson) => {
    const editedLesson = { lesson: lesson };
    return dispatch(toggleSetDeleteLessonModal(editedLesson));
  };

  const handleOpenDetailsModal = (obj) => {
    return dispatch(toggleSetDetailsLessonModal(obj));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("boxing");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (displayedData.length > 0) {
    console.log(displayedData);
    const time = displayedData[0].day;
    const date = new Date(time);

    if (displayedData.length > 0) {
      return (
        <ul style={styles.listContainer}>
          <h1>
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
          </h1>

          {displayedData.map((l, index) => {
            if (user?.user?.role === "admin" && l.type === "private") {
              return (
                <li key={index} style={styles.listItem}>
                  {user?.user?.role === "admin" && (
                    <CloseButton onClick={() => handleOpenDeleteModal(l)}>
                      <CloseIcon />
                    </CloseButton>
                  )}
                  <InfoButton
                    onClick={() => handleOpenDetailsModal({ lesson: l })}
                  >
                    <InfoIcon />
                  </InfoButton>
                  <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ direction: "ltr" }}>
                        {l.startTime} - {l.endTime}
                      </span>{" "}
                      <span>
                        <strong>אימון אישי</strong>
                      </span>{" "}
                      <span>מתאמן: {l.studentName}</span>{" "}
                      <span>מאמן: {l.trainer}</span>{" "}
                      <span>טלפון: {l.studentPhone}</span>
                    </div>
                  </div>
                </li>
              );
            }

            console.log(l);

            return (
              <li key={index} style={styles.listItem}>
                {user?.user?.role === "admin" && (
                  <CloseButton onClick={() => handleOpenDeleteModal(l)}>
                    <CloseIcon />
                  </CloseButton>
                )}
                <InfoButton
                  onClick={() => handleOpenDetailsModal({ lesson: l })}
                >
                  <InfoIcon />
                </InfoButton>
                <div style={{ width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ direction: "ltr" }}>
                      {l.startTime} - {l.endTime}
                    </span>{" "}
                    <strong>
                      <span>אימון: {l.name}</span>
                      <br />
                      <span>מאמן: {l.trainer}</span>
                    </strong>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }

    return <h1>לחץ על תאריך צבוע</h1>;
  }
};

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    listStyleType: "none",
    border: "none",
    margin: 0,
    direction: "rtl",
  },
  listItem: {
    backgroundColor: "#38B2AC",
    color: "black",
    position: "relative",
    textAlign: "center",
    margin: "10px 0",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "80%",
    maxWidth: "400px",
    display: "flex",
    justifyContent: "space-evenly",
  },
};

export default IndividualDay;
