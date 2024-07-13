import styled from "styled-components";
import CalendarHeader from "../components/CalendarHeader.jsx";
import Days from "../components/Days.jsx";
import Modal from "../components/Modal.jsx";
import { useSelector } from "react-redux";
import "../css-pages/Calendar.css";
import RequestPrivateLesson from "../components/RequestPrivateLesson.jsx";
import SetGroupLesson from "../components/setGroupLesson.jsx";
import DeleteLesson from "../components/deleteLesson.jsx";
import { Suspense } from "react";

const Calendar = () => {
  const isPrivateModalOpen = useSelector(
    (state) => state.calendar.isPrivateModalOpen
  );
  const isGroupModalOpen = useSelector(
    (state) => state.calendar.isGroupModalOpen
  );
  const isDeleteLessonModalOpen = useSelector(
    (state) => state.calendar.isDeleteLessonModalOpen
  );

  const isModalOpen =
    isPrivateModalOpen || isGroupModalOpen || isDeleteLessonModalOpen;

  const CalendarContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
    opacity: ${(props) => (props.disabled ? 0.2 : 1)};
  `;

  const Content = styled.div`
    display: flex;
  `;

  return (
    <CalendarContainer className="calendar" disabled={isModalOpen}>
      <CalendarHeader />
      <Content className="content">
        <Suspense fallback={<p>loading</p>}>
          <Days />
        </Suspense>
      </Content>
    </CalendarContainer>
  );
};

export default Calendar;
