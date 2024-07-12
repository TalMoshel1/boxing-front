import React from "react";
import { useDispatch } from "react-redux";
import {
  toggleSetGroupModal,
  toggleSetPrivateModal,
  toggleSetDeleteLessonModal,
} from "../redux/calendarSlice.js";
import styled from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: lightgrey;
  z-index: 1000; /* Ensure the modal is above other elements */
  pointer-events: auto; /* Ensure the modal is always interactive */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  padding: 20px;
  width: 80%;
  max-height: 80%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Modal = ({ children, type }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    if (type === "group") {
      dispatch(toggleSetGroupModal());
    } else if (type === "private") {
      dispatch(toggleSetPrivateModal());
    } else {
      dispatch(toggleSetDeleteLessonModal());
    }
  };

  return (
    <ModalContainer className="modal">
      <ModalHeader>
        <CloseButton onClick={handleClose}>×</CloseButton>
      </ModalHeader>
      {children}
    </ModalContainer>
  );
};

export default Modal;
