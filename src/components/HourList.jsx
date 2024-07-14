import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleSetDeleteLessonModal } from '../redux/calendarSlice';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1000; /* Ensure the modal is above other elements */
  pointer-events: auto; /* Ensure the modal is always interactive */
`;

const HourContainer = styled.div`
  display: flex;
  direction: rtl;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  gap: 1rem;

    @media (orientation: landscape) {
    flex-direction: column;
  }

`;

const Hour = styled.div`
  font-size: 1rem;
  width: max-content;
    direction: ltr;

`;

const HourEventContainer = styled.div`

`;

const HourEvent = styled.div`
  font-size: 0.9rem;
`;

const DeleteButton = styled.button`
`;

const Lesson = ({ lesson }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('boxing');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenDeleteModal = (lessonId) => {
    console.log('modal need to be opened');
    return dispatch(toggleSetDeleteLessonModal(lessonId));
  };

  if (lesson.lesson.type === 'private') {
    console.log(lesson.lesson)
    return (
      <HourContainer>
        <Hour>
          {lesson.lesson.startTime} - {lesson.lesson.endTime} 
        </Hour>
        <strong>אימון אישי {lesson.lesson.trainer}</strong>

        <HourEventContainer>
          <HourEvent>
            {lesson.lesson.studentName}<br /> {lesson.lesson.studentMail} <br /> {lesson.lesson.studentPhone}
          </HourEvent>
        </HourEventContainer>
        {user?.user?.role === 'admin' && (
          // <DeleteButton onClick={() => {
          //   handleOpenDeleteModal(lesson.lesson._id)

          // }

          // }><strong>בטל</strong></DeleteButton>
          <DeleteButton onClick={() => {
            console.log(lesson);
            handleOpenDeleteModal(lesson); // Commented out to prevent modal from opening
          }}><strong>בטל</strong></DeleteButton>
        )}
      </HourContainer>
    );
  }

  return (
    <HourContainer>

      <Hour>
      {lesson.lesson.startTime} - {lesson.lesson.endTime} 
      </Hour>
      <HourEventContainer>
        <HourEvent>
          {lesson.lesson.name} - {lesson.lesson.trainer}
        </HourEvent>
        <HourEvent>{lesson.lesson.description}</HourEvent>
      </HourEventContainer>
      <DeleteButton onClick={() => {
            console.log(lesson);
            handleOpenDeleteModal(lesson); // Commented out to prevent modal from opening
          }}><strong>בטל</strong></DeleteButton>
    </HourContainer>
  );
};

export default Lesson;
