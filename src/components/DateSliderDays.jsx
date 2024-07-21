import React, { useState, useCallback, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import { useDispatch } from "react-redux";
import { isSameDate } from "../functions/compareDatesFormats";
import {IndividualDay} from './IndividualDay.jsx'
import {setLessonsToDisplay} from '../redux/calendarSlice.js'
import {formatDateInHebrew} from '../functions/formatDateInHebrew.js'

const DateSlider = () => {
  const [dates, setDates] = useState(generateDatesFrom(new Date(), 30));
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [lessonsMap, setLessonsMap] = useState([]);
  const [displayedData, setDisplayedData] = useState()


  const handleDisplayData = (data) => {
    const lessons = Object.values(data)[0]
    if (lessons.length > 0) {
      dispatch(setLessonsToDisplay(lessons))
    }
  }



  useEffect(() => {
    if (lessonsMap.length > 0) {
      const mergedData = mergeDateWithLessons();
      setDates(mergedData);
    }
  }, [lessonsMap]);



  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (currentIndex) => handleScrollEnd(currentIndex),
  };

  function generateDatesFrom(startDate, count) {
    const dates = [];
    for (let i = 0; i < count; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateObj = {
        [date.toDateString()]: [],
      };
      dates.push(dateObj);
    }
    return dates;
  }

  const sendLessonsRequest = async (startDate, endDate) => {
    try {
      const response = await fetch("http://localhost:3000/api/lessons/days", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start: startDate,
          end: endDate,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const mergeDateWithLessons = () => {
    const lessonsMapByDate = lessonsMap.reduce((map, lesson) => {
      const lessonDate = new Date(lesson.day).toDateString();
      if (!map[lessonDate]) {
        map[lessonDate] = [];
      }
      map[lessonDate].push(lesson);
      return map;
    }, {});

    const updatedDates = dates.map((dateObj) => {
      const dateKey = Object.keys(dateObj)[0];
      const matchingLessons = lessonsMapByDate[dateKey] || [];
      return {
        [dateKey]: matchingLessons,
      };
    });

    return updatedDates;
  };

  const loadMoreDates = useCallback(async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const lastDateKey = Object.keys(dates[dates.length - 1])[0];
    const lastDate = new Date(lastDateKey);
    lastDate.setDate(lastDate.getDate() + 1);

    const newDates = generateDatesFrom(lastDate, 30);

    console.log("This update is from here");
    setDates((prevDates) => [...prevDates, ...newDates]);

    const newLessons = await sendLessonsRequest(
      Object.keys(newDates[0])[0],
      Object.keys(newDates[newDates.length - 1])[0]
    );

    setLessonsMap((prevLessons) => [...prevLessons, ...newLessons]);

    setLoading(false);
  }, [dates, loading]);

  const handleScrollEnd = (currentIndex) => {
    const slidesToShow = 6;
    const totalSlides = dates.length;
    const isNearEnd = currentIndex >= totalSlides - slidesToShow;

    if (isNearEnd) {
      loadMoreDates();
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const lessons = await sendLessonsRequest(
        Object.keys(dates[0])[0],
        Object.keys(dates[dates.length - 1])[0]
      );

      setLessonsMap(lessons);
    };

    fetchInitialData();
  }, []);

  return (
    <>
     <div className="slider-container">
      <Slider {...settings}>
        {dates.map((dateObj, index) => {
          const dateKey = Object.keys(dateObj)[0];
          const hasLesson = lessonsMap.some((lesson) =>
            isSameDate(dateKey, new Date(lesson.day).toDateString())
          );


          return (
            <div
              key={index}
              onClick={() => handleDisplayData(dateObj)}
              className={hasLesson ? 'hasLesson slider-item': 'slider-item'}
            >
              <h3 className='item-h'>{formatDateInHebrew(dateKey)}</h3>
            </div>
          );
        })}
      </Slider>
    </div>


    {displayedData &&
    <ul>
          <IndividualDay displayedData={displayedData}/>

    </ul>


    }
    </>
   
  );
};

export default DateSlider;
