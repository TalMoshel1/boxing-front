import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Calendar from './pages/Calendar';
import SignIn from './pages/SignIn.jsx';
import ApproveLink from './pages/ApprovalLink.jsx';
import Modal from './components/Modal.jsx';
import RequestPrivateLesson from './components/RequestPrivateLesson.jsx';
import SetGroupLesson from './components/setGroupLesson.jsx';
import DeleteLesson from './components/deleteLesson.jsx';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const isPrivateModalOpen = useSelector((state) => state.calendar.isPrivateModalOpen);
  const isGroupModalOpen = useSelector((state) => state.calendar.isGroupModalOpen);
  const isDeleteLessonModalOpen = useSelector((state) => state.calendar.isDeleteLessonModalOpen);

  return (
    <BrowserRouter>
      {isPrivateModalOpen && <Modal type="private"> <RequestPrivateLesson /></Modal>}
      {isGroupModalOpen && <Modal type="group"> <SetGroupLesson /></Modal>}
      {isDeleteLessonModalOpen && <Modal type="delete"> <DeleteLesson /></Modal>}
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/approveLink/:lessonId" element={<ApproveLink />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
