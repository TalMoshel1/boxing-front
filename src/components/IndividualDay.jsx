import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import DetailsLesson from "./detailsLesson";
import DeleteLesson from "./deleteLesson";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import styled from "styled-components";

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.5rem;
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  right: 3rem;
  top: 0;
  padding: 0.5rem;
`;

export const IndividualDay = ({ displayedData }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonIdToHide, setLessonIdToHide] = useState([])

  useEffect(()=>{
      console.log('lessons to show: ', displayLessons())
    
  },[lessonIdToHide])

  const displayLessons = () => {
    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };
  
    const sortByEndTime = (arr) => {
      return arr.sort((a, b) => parseTime(a.endTime) - parseTime(b.endTime));
    };
  
    if (lessonIdToHide.length > 0) {
      const lessons = displayedData.map((l) => {
        let instance = 0;
        for (let i = 0; i < lessonIdToHide.length; i++) {
          if (lessonIdToHide[i] === l._id) {
            instance++;
          }
        }
      
        if (instance === 0) {
          return l;
        }
      }).filter(l => l !== undefined); 

      if (lessons.length === 0) {
        
      }
  
      return sortByEndTime(lessons);
    }
  
    return sortByEndTime(displayedData);
  };

  const hideLesson = (lessonId) => {
    setLessonIdToHide((prev)=>([...prev, lessonId]))
  }
  useEffect(() => {
    const storedUser = localStorage.getItem("boxing");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenDeleteModal = (lesson) => {
    setCurrentLesson(lesson);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const handleOpenDetailsModal = (lesson) => {
    setCurrentLesson(lesson);
    setModalType("details");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentLesson(null);
    setModalType("");
  };

  const renderModalContent = () => {
    if (modalType === "details") {
      return <DetailsLesson lesson={currentLesson} closeModal={handleCloseModal} />;
    } else if (modalType === "delete") {
      return <DeleteLesson lesson={currentLesson} closeModal={handleCloseModal} hideLesson={hideLesson} />;
    }
    return null;
  };

  if (displayedData.length > 0) {
    const time = displayedData[0].day;
    const date = new Date(time);

    return (
      <>
        <ul style={styles.listContainer}>
          <h1>
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
          </h1>

          {

displayLessons().map((l, index) => (
  <li key={index} style={styles.listItem}>
    {user?.user?.role === "admin" && (
      <CloseButton onClick={() => handleOpenDeleteModal(l)}>
        <CloseIcon />
      </CloseButton>
    )}
    <InfoButton onClick={() => handleOpenDetailsModal(l)}>
      <InfoIcon />
    </InfoButton>
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ direction: "ltr" }}>
          {l.startTime} - {l.endTime}
        </span>
        <strong>
          <span>
            {l.type === "private" ? "אימון אישי" : "אימון: " + l.name}
          </span>
          <br />
          <span>מאמן: {l.trainer}</span>
        </strong>
      </div>
    </div>
  </li>
))
          
          // displayedData.map((l, index) => (
          //   <li key={index} style={styles.listItem}>
          //     {user?.user?.role === "admin" && (
          //       <CloseButton onClick={() => handleOpenDeleteModal(l)}>
          //         <CloseIcon />
          //       </CloseButton>
          //     )}
          //     <InfoButton onClick={() => handleOpenDetailsModal(l)}>
          //       <InfoIcon />
          //     </InfoButton>
          //     <div style={{ width: "100%" }}>
          //       <div style={{ display: "flex", flexDirection: "column" }}>
          //         <span style={{ direction: "ltr" }}>
          //           {l.startTime} - {l.endTime}
          //         </span>
          //         <strong>
          //           <span>
          //             {l.type === "private" ? "אימון אישי" : "אימון: " + l.name}
          //           </span>
          //           <br />
          //           <span>מאמן: {l.trainer}</span>
          //         </strong>
          //       </div>
          //     </div>
          //   </li>
          // ))
          }
        </ul>

        {isModalOpen && (
          <Modal type={modalType} closeModal={handleCloseModal}>
            {renderModalContent()}
          </Modal>
        )}
      </>
    );
  }

  return <h1>לחץ על תאריך צבוע</h1>;
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
    position: 'relative',
    top: '10rem',
    marginBlockStart: '0em',
    marginBlockEnd: '0em',
    paddingInlineStart: '0px'
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
