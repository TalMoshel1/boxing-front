import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Calendar from './pages/Calendar'
import {Navbar} from './components/Navbar.jsx'
import SignIn from './pages/SignIn.jsx'

import './App.css';

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />}/>
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
