import styled from "styled-components";
import CalendarHeader from "../components/CalendarHeader.jsx";
import Days from "../components/Days.jsx";
import { useSelector } from "react-redux";
import "../css-pages/Calendar.css";

const Calendar = () => {


  const CalendarContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-top: calc(5svh);
    min-height: 95svh;
    display:flex;
    flex-direction:column;

  `;

  const Content = styled.div`
    display: flex;
    flex-grow:1
  `;

  return (
    <CalendarContainer className="calendar" >
      <CalendarHeader />
      <Content className="content">
          <Days />
      </Content>
    </CalendarContainer>
  );
};

export default Calendar;
