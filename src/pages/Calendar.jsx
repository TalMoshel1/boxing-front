import CalendarHeader from '../components/CalendarHeader.jsx';
import Days from '../components/Days.jsx';
import Modal from '../components/Modal.jsx'
import { useSelector } from 'react-redux';
import '../css-pages/Calendar.css';

const Calendar = () => {
  const isModalOpen = useSelector((state)=>state.calendar.isModalOpen)

  console.log('isModalOpen: ', isModalOpen)




  return (
    <div className="calendar">
      <CalendarHeader />
      <div className="content">
        <Days />
      </div>
      {isModalOpen && <Modal > <div>ok</div></Modal>}
      
    </div>
  );
};

export default Calendar;
