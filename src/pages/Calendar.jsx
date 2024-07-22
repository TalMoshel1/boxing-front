import styled from "styled-components";
import CalendarHeader from "../components/CalendarHeader.jsx";
import Days from "../components/Days.jsx";
import { useSelector } from "react-redux";
import "../css-pages/Calendar.css";
import DateSliderDays from "../components/DateSliderDays.jsx";
import { useEffect } from "react";
import { IndividualDay } from "../components/IndividualDay.jsx";

const Calendar = () => {
  const view = useSelector((state) => state.calendar.view);
  const dayToDisplay = useSelector((state) => state.calendar.dayToDisplay);

  useEffect(()=>{
    if (dayToDisplay) {
      console.log(dayToDisplay)

    }

  },[dayToDisplay])

  const CalendarContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-top: calc(5svh);
    min-height: 95svh;
    display: flex;
    flex-direction: column;
    // align-items: center;
  `;

  const Content = styled.div`
    display: flex;
    flex-grow: 1;
  `;

  const DayContainer = styled.ul`
    all: unset;
  `;

  return (
    <CalendarContainer className="calendar">
      <CalendarHeader />
      {view === "week" ? (
        <Content className="content">
          <Days />
        </Content>
      ) : (
        <>

          <DateSliderDays />

          {dayToDisplay && <ul style={{position:'relative', left: '0', right: '0' }}>
          <IndividualDay/>

          </ul>}

        </>
      )}
    </CalendarContainer>
  );
};

export default Calendar;
