import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Calendar from './pages/Calendar';
import SignIn from './pages/SignIn.jsx';
import ApproveLink from './pages/ApprovalLink.jsx'

import './App.css';

function App() {
  return (
    <BrowserRouter>
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
