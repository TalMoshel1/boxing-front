import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setView, incrementDate, setMonth } from '../redux/calendarSlice';
import styled from 'styled-components';
import { renderDays } from '../functions/renderDays';
import { formatThreeLettersMonthAndDaysToHebrew } from '../functions/formatThreeLettersMonthAndDaysToHebrew';

const Header = styled.header`
    background-color: ${(props) => props.theme.colors.calendarHeaderBackgroundColor};
    color: ${(props) => props.theme.colors.calendarHeaderColor};
    direction: rtl;
    display: flex;
    align-items: center;

  @media (orientation: portrait) {
    gap: 0.75rem;
    direction: rtl;
    justify-content: center;
    padding: 0.5rem;
    z-index: 2; 

  }

  button { 
   background-color: #66FCF1;
  color: #0B0C10;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.calendarButtonBackgroundColorHover};

  }
    // &: {
    //   background-color: #45A29E; 
    //   }
  }

      @media (orientation: landscape) {
    justify-content: space-evenly;
    height: 5rem;
    }

    @media (orientation: portrait) { 
    height: fit-content;
    }
  // .viewController {
  //   background-color: white;
  //   z-index: 2; 
  // }

  select {
  background-color: #2C3E50;
    color: #EDEDED;
    border: 2px solid #66FCF1;
    border-radius: 5px;
    padding: 0.5rem;
    appearance: none;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    font-size: 1rem;
    outline: none;
    position: relative;
    text-align:center;
    }

    select:hover,select:focus{
      background-color: #34495E;
  border-color: #38B2AC;
}

select::after{
  content: '▼';
  position: absolute;
  right: 10px;
  pointer-events: none;
  color: #EDEDED;
}


  option {
  text-align:center;
    background-color: #2C3E50;
  color: #EDEDED;
  }

  option:hover{
    // background-color: #2E4053;
    background-color: red;

  }
  

`;

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const currentDateString = useSelector((state) => state.calendar.currentDate);
  const view = useSelector((state) => state.calendar.view);
  let [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    if (currentDateString) {
      setCurrentDate(new Date(currentDateString));
    }
  }, [currentDateString]);

  const handleNext = () => {
    if (view === 'month') {
      dispatch(setMonth(1));
    } else if (view === 'week') {
      dispatch(incrementDate(7));
    } else {
      dispatch(incrementDate(1));
    }
  };

  const handlePrev = () => {
    if (view === 'month') {
      dispatch(setMonth(-1));
    } else if (view === 'week') {
      dispatch(incrementDate(-7));
    } else {
      dispatch(incrementDate(-1));
    }
  };

  const daysweek = renderDays(new Date(currentDate), 'week');
  const today = new Date(currentDate).toDateString();

  let firstDate = daysweek[0].displayedDate.split(' ');
  console.log(firstDate)
  let endDate = daysweek[daysweek.length - 2].displayedDate.split(' ');

  const monthInHebrew = formatThreeLettersMonthAndDaysToHebrew('month', endDate[1]);
  const startMonthInHebrew = formatThreeLettersMonthAndDaysToHebrew('month', firstDate[1]);

  const DateString = `${firstDate[2].split(',')[0]} ל${startMonthInHebrew} - ${endDate[2].split(',')[0]} ל${monthInHebrew} ${endDate[3]}`;

  return (
    <Header>
      <select className='viewController' onChange={(e) => dispatch(setView(e.target.value))} value={view}>
        <option value="week" style={{textAlign: 'start'}}>תצוגה שבועית</option>
        {/* <option value="day" style={{textAlign: 'start'}}>תצוגה יומית</option> */}
      </select>

      {view === 'week' && (
        <>
          <button onClick={handlePrev}>
            {view === 'week' ? 'שבוע קודם' : view === 'day' ? 'יום קודם' : ''}
          </button>

          <span style={{ direction: 'rtl' }}>
            {currentDate && <>
              {DateString}
            </>
            }
          </span>
        </>
      )}

      {view === 'week' && (
        <button onClick={handleNext}>
          {view === 'week' ? 'שבוע הבא' : view === 'day' ? 'יום הבא' : ''}
        </button>
      )}
    </Header>
  );
};

export default CalendarHeader;
