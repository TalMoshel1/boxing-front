import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Navbar } from "./components/Navbar.jsx";
import Calendar from "./pages/Calendar";
import DeleteLesson from "./components/deleteLesson.jsx";
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
  const [isMenuOpen, toggleMenu] = useState(false);

  const handleToggleMenu = () => {
    toggleMenu(!isMenuOpen);
  };

  const isDeleteLessonModalOpen = useSelector(
    (state) => state.calendar.isDeleteLessonModalOpen
  );

  return (
    <HorizontalContainer>
      <MenuList isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />
      <VerticalContainer>
        <Navbar isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />
        {isDeleteLessonModalOpen && (
          <Modal type="delete">
            <DeleteLesson />
          </Modal>
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/calendar"
            element={
              <StyledDisabledWrapper isDisabled={isDeleteLessonModalOpen}>
                <Calendar />
              </StyledDisabledWrapper>
            }
          />
          <Route
            path="/setgrouplesson"
            element={
              <FormContainer>
                <SetGroupLesson />
              </FormContainer>
            }
          />
          <Route path="/approveLink/:lessonId" element={<ApproveLink />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/requestPrivte"
            element={
              <FormContainer>
                <RequestPrivateLesson />
              </FormContainer>
            }
          />
          <Route path="/datesliderdays" element={<DateSliderDays />} />
          <Route path="/datesliderweeks" element={<DateSliderWeeks />} />
        </Routes>
      </VerticalContainer>
    </HorizontalContainer>
  );
}

const DisabledWrapper = ({ isDisabled, children, ...props }) => (
  <div {...props}>{children}</div>
);

const StyledDisabledWrapper = styled(DisabledWrapper)`
  ${({ isDisabled }) =>
    isDisabled &&
    `
    opacity: 0.5;
    pointer-events: none;
    width: 100vw;
  `}
`;

const VerticalContainer = styled.div`
  flex: 1; // Allow it to grow and fill the available space
  // display: flex;
  flex-direction: column;
  min-height: 100svh; // Ensure it covers the full viewport height
`;

const HorizontalContainer = styled.div`
  display: flex;
  direction: rtl;
  max-width: 100vw;
  min-height: 100svh; 
  overflow: hidden;
`;

export default App;
