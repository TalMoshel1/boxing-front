import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Navbar } from "./components/Navbar.jsx";
import Calendar from "./pages/Calendar";
import DeleteLesson from './components/deleteLesson.jsx'
import SignIn from "./pages/SignIn.jsx";
import ApproveLink from "./pages/ApprovalLink.jsx";
import Modal from "./components/Modal.jsx";
import SetGroupLesson from "./pages/setGroupLesson.jsx";
import "./App.css";
import { useSelector } from "react-redux";
import Home from "./pages/Home.jsx";
import RequestPrivateLesson from "./pages/requestPrivate.jsx";
import FormContainer from "./components/formContainer.jsx";
import MenuList from "./components/MenuList.jsx";
import { MenuProvider } from "./context/useMenu";
import { useMenu } from "./context/useMenu.jsx";
import styled from "styled-components";
import DateSliderDays from "./components/DateSliderDays.jsx";
import DateSliderWeeks from "./components/DateSliderWeeks.jsx";

function App() {
  const theme = useSelector((state) => state.theme);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MenuProvider>
          <AppContent />
        </MenuProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const { isMenuOpen } = useMenu();
  const isDeleteLessonModalOpen = useSelector((state) => state.calendar.isDeleteLessonModalOpen);

  return (
    <>
      <Navbar />
      {isMenuOpen && <MenuList />}
      {isDeleteLessonModalOpen && <Modal type="delete"> <DeleteLesson /></Modal>}

      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/calendar" element={
          <DisabledWrapper isDisabled={isDeleteLessonModalOpen}>
            <Calendar />
          </DisabledWrapper>
        } />
        <Route path="/setgrouplesson" element={<FormContainer><SetGroupLesson /></FormContainer>} />
        <Route path="/approveLink/:lessonId" element={<ApproveLink />} />
        <Route path="/home" element={<Home />} />
        <Route path="/requestPrivte" element={<FormContainer><RequestPrivateLesson /></FormContainer>} />
        <Route path='/datesliderdays' element={<DateSliderDays/>}/>
        <Route path='/datesliderweeks' element={<DateSliderWeeks/>}/>

      </Routes>
    </>
  );
}

const DisabledWrapper = styled.div`
  ${(props) => props.isDisabled && `
    opacity: 0.5;
    pointer-events: none;
  `}
`;

export default App;
