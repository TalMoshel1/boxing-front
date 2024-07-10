import CalendarHeader from '../components/CalendarHeader.jsx';
import Days from '../components/Days.jsx';
import Modal from '../components/Modal.jsx'
import { useSelector } from 'react-redux';
import '../css-pages/Calendar.css';
import RequestPrivateLesson from '../components/RequestPrivateLesson.jsx';
import SetGroupLesson from '../components/setGroupLesson.jsx'
import DeleteLesson from '../components/deleteLesson.jsx';

const Calendar = () => {
  const isPrivateModalOpen = useSelector((state)=>state.calendar.isPrivateModalOpen)
  const isGroupModalOpen = useSelector((state)=>state.calendar.isGroupModalOpen)
  const isDeleteLessonModalOpen = useSelector((state)=>state.calendar.isDeleteLessonModalOpen)





  return (
    <div className="calendar">
      <CalendarHeader />
      <div className="content">
        <Days />
      </div>
      {isPrivateModalOpen && <Modal > <RequestPrivateLesson/></Modal>}
      {isGroupModalOpen && <Modal > <SetGroupLesson/></Modal>}
      {isDeleteLessonModalOpen && <Modal > <DeleteLesson/></Modal>}


      
    </div>
  );
};

export default Calendar;
