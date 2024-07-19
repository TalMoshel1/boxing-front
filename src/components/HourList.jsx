import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleSetDeleteLessonModal } from '../redux/calendarSlice';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; 
  pointer-events: auto; 
`;

const HourContainer = styled.div`
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
  width:100%;


    @media (orientation: portrait) {
    flex-direction: column;
  }

`;

const Hour = styled.div`
  font-size:0.8rem;
  width: min-content;
    direction: ltr;

`;

const HourEventContainer = styled.div`

`;

const HourEvent = styled.div`
  font-size:0.8rem;
`;

const DeleteButton = styled.button`
`;

const Lesson = ({ lesson }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  console.log('user: ', user)

  useEffect(() => {
    const storedUser = localStorage.getItem('boxing');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenDeleteModal = (lessonId) => {
    return dispatch(toggleSetDeleteLessonModal(lessonId));
  };

  if (lesson.lesson.type === 'private') {
    return (
      <HourContainer>
        <Hour>
          {lesson.lesson.startTime} - {lesson.lesson.endTime} 
        </Hour>
        <strong>אימון אישי {lesson.lesson.trainer}</strong>

        <HourEventContainer>
          <HourEvent style={{fontSize: '0.4rem'}}>
          <strong> {lesson.lesson.studentName}<br /> {lesson.lesson.studentMail} <br /> {lesson.lesson.studentPhone}</strong> 
          </HourEvent>
        </HourEventContainer>
        {user?.user?.role === 'admin' && (
            <DeleteButton onClick={() => {
            handleOpenDeleteModal(lesson); 
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
      {user?.user?.role === 'admin' && (
            <DeleteButton onClick={() => {
            handleOpenDeleteModal(lesson); 
          }}><strong>בטל</strong></DeleteButton>
  
        )}
    </HourContainer>
  );
};

export default Lesson;
