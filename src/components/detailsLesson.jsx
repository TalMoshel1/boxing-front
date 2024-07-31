import React from "react"
import { useSelector } from "react-redux";

const DetailsLesson  = (props) => {
    const details = useSelector(
        (state) => state.calendar.detailsLessonModalData
      );


      console.log(details.lesson.description)
  return (
    <section>
        <p style={{direction:'rtl', color: 'black'}}>{details.lesson.description}</p>
      
    </section>
  )
};

export default DetailsLesson;
