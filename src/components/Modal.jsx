import React from "react"
import { useDispatch } from "react-redux";
import { toggleSetGroupModal, toggleSetPrivateModal } from '../redux/calendarSlice.js'
import { useSelector } from 'react-redux';
import RequestPrivateLesson from '../components/RequestPrivateLesson.jsx'




const Modal = ({children}) => {

  const user = localStorage.getItem('boxing')

  console.log('user: ', JSON.parse(user))




  const data = useSelector((state)=>state.calendar.modalData)

  console.log('data modal:', data)

    const dispatch = useDispatch()

    const handleToggleSetGroupModal = () => {
        dispatch(toggleSetGroupModal());
      }
      
  return <main className='modal'>
    {children}
    {/* <RequestPrivateLesson /> */}
  </main>
    }
export default Modal
