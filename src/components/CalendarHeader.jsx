import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setView, incrementDate, setMonth } from '../redux/calendarSlice';
import styled from 'styled-components';
import { renderDays } from '../functions/renderDays';
import { current } from '@reduxjs/toolkit';
import { formatThreeLettersMonthAndDaysToHebrew } from '../functions/formatThreeLettersMonthAndDaysToHebrew';

const Header = styled.header`
@media (orientation: portrait) {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    direction: rtl;
    position: sticky;
    top: 0;
    justify-content: center;
    height: 5svh;
    padding: 0.5rem
}
`;

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const currentDateString = useSelector((state) => state.calendar.currentDate);
  const view = useSelector((state) => state.calendar.view);
  let [currentDate, setCurrentDate] = useState(null)

  console.log('view: ', view)
  
  useEffect(()=>{
    if (currentDateString) {
      setCurrentDate(new Date(currentDateString))
    }
  },[currentDateString])


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

  const daysweek = renderDays(new Date(currentDate), 'week')
  const today = new Date(currentDate).toDateString();

 let firstDate = daysweek[0].displayedDate.split(' ')
 let endDate = daysweek[daysweek.length-2].displayedDate.split(' ')

  const monthInHebrew = formatThreeLettersMonthAndDaysToHebrew('month',endDate[1])


 const DateString = `${firstDate[2].split(',')[0]} - ${endDate[2].split(',')[0]} ל${monthInHebrew} ${endDate[3]}`

  return (
    <Header>

<select onChange={(e) => dispatch(setView(e.target.value))} value={view}>
        <option value="week">תצוגת שבועית</option>
        <option value="day">תצוגה יומית</option>
      </select>
      
      {view === 'week' &&  <>
            
        <button onClick={handlePrev}>
        {view === 'week' ? 'שבוע קודם' : view === 'day' ? 'יום קודם' : ''}
      </button>

<span style={{direction: 'rtl'}}>
{currentDate && <>
   {/* {currentDate.toLocaleDateString('en-US', { month: 'long' })}{' '} */}
   {DateString}
  </>
  }

</span>
      
      </>
      

      
      }


      {view === 'week' && <button onClick={handleNext}>
        {view === 'week' ? 'שבוע הבא' : view === 'day' ? 'יום הבא' : ''}
      </button>}



    </Header>
  );
};

export default CalendarHeader;
