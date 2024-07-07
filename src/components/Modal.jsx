import React from "react"
import { useDispatch } from "react-redux";
import { toggleSetmodal } from '../redux/calendarSlice.js'
import { useSelector } from 'react-redux';
import RequestPrivateLesson from '../components/RequestPrivateLesson.jsx'




const Modal = () => {

  const user = localStorage.getItem('boxing')

  console.log('user: ', JSON.parse(user))




  const data = useSelector((state)=>state.calendar.modalData)

  console.log('data modal:', data)

    const dispatch = useDispatch()

    const handleToggleModal = () => {
        dispatch(toggleSetmodal());
      }
      
  return <main className='modal' onClick={()=>handleToggleModal}>
    <RequestPrivateLesson />
  </main>
    }
export default Modal
