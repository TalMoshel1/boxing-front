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
  const lessonsToDisplay = useSelector(
    (state) => state.calendar.lessonsToDisplay
  );

  const CalendarContainer = styled.div`
    width: 100%;

    @media (orientation: landscape) {
      // margin-top: 5rem;
      // min-height: calc(100svh - 5rem);
    }

    @media (orientation: portrait) {
      // margin-top: 3rem;
      min-height: calc(100svh - 3rem);
    }

    display: flex;
    flex-direction: column;
  `;

  const Content = styled.div`
    display: flex;
    flex-grow: 1;
    
      @media (orientation: landscape) {

        margin-top: 0.5rem;

    }

  `;

  const DayContainer = styled.ul`
    all: unset;
  `;

  return (
    <CalendarContainer className="calendar">
      <CalendarHeader className="calendar header" />
      {view === "week" ? (
        <Content className="content">
          <Days />
        </Content>
      ) : (
        <>
          <div style={{position: 'relative'}}><DateSliderDays className="dateSliderDays" style={{border: '1px solid red'}} />
          </div> 

          {lessonsToDisplay?
            <ul 
            className='individual day'
            style={{ position: "relative", marginTop: '10rem', paddingInlinestart: '0'}}
            >
              <IndividualDay className="individualDay" style={{position:'absolute'}} />
            </ul> : <h1 style={{position: 'absolute', left:'50%', top:'60%', transform: 'translate(-50%, -50%)', direction: 'rtl'}}>גרור את התאריכים ובחר תאריך צבוע</h1>
          } 


        </>
      )}
    </CalendarContainer>
  );
};

export default Calendar;
