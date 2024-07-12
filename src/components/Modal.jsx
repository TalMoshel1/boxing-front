import React from "react";
import { useDispatch } from "react-redux";
import { toggleSetGroupModal, toggleSetPrivateModal, toggleSetDeleteLessonModal } from '../redux/calendarSlice.js';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Modal = ({ children, type }) => {
  const dispatch = useDispatch();

  const handleCloseGroup = () => {
    dispatch(toggleSetGroupModal());
  };

  const handleClosePrivate = () => {
    dispatch(toggleSetPrivateModal());
  };

  const handleCloseDelete = () => {
    dispatch(toggleSetDeleteLessonModal());
  };

  const ModalContainer = styled.div`
    position: fixed;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: lightgrey;
    pointer-events: auto; 
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
    perspective: 1000px;
    transform-style: preserve-3d;
    transition: transform 0.3s ease-in-out;
    z-index:1;
    overflow-y: scroll;
  `;

  const handleClose = () => {
    if (type === 'group') {
      handleCloseGroup();
    } else if (type === 'private') {
      handleClosePrivate();
    } else {
      handleCloseDelete();
    }
  };

  return (
    <ModalContainer className='modal'>
      <>
        <button onClick={handleClose}>X</button>
        {children}
      </>
    </ModalContainer>
  );
};

export default Modal;
