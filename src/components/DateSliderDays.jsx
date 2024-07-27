import React, { useState, useCallback, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { isSameDate } from "../functions/compareDatesFormats";
import { IndividualDay } from "./IndividualDay.jsx";
import { setLessonsToDisplay } from "../redux/calendarSlice.js";
import { formatThreeLettersMonthAndDaysToHebrew } from '../functions/formatThreeLettersMonthAndDaysToHebrew';

const DateSlider = () => {
  const [dates, setDates] = useState(generateDatesFrom(new Date(), 30));
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [lessonsMap, setLessonsMap] = useState([]);

  // Function to display lessons based on the selected date
  const handleDisplayData = (data) => {
    const lessons = Object.values(data)[0];
    if (lessons && lessons.length > 0) {
      dispatch(setLessonsToDisplay(lessons));
    } else {
      dispatch(setLessonsToDisplay([]));
    }
  };

  // Update dates when lessonsMap changes
  useEffect(() => {
    if (lessonsMap && lessonsMap.length > 0) {
      const mergedData = mergeDateWithLessons();
      setDates(mergedData);
    }
  }, [lessonsMap]);

  // Slider settings
  const settings = {
    dots: false,
    infinite: false, // Disable infinite scrolling
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0, // Start at the first slide
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (currentIndex) => handleScrollEnd(currentIndex),
  };

  // Generate a range of dates from the starting date
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
      const response = await fetch(
        "https://boxing-back.onrender.com/api/lessons/days",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start: startDate,
            end: endDate,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  // Merge fetched lessons with the current dates
  const mergeDateWithLessons = () => {
    const lessonsMapByDate = (lessonsMap || []).reduce((map, lesson) => {
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

  // Load more dates when scrolling to the end
  const loadMoreDates = useCallback(async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const lastDateKey = Object.keys(dates[dates.length - 1])[0];
    const lastDate = new Date(lastDateKey);
    lastDate.setDate(lastDate.getDate() + 1);

    const newDates = generateDatesFrom(lastDate, 30);

    setDates((prevDates) => [...prevDates, ...newDates]);

    const newLessons = await sendLessonsRequest(
      Object.keys(newDates[0])[0],
      Object.keys(newDates[newDates.length - 1])[0]
    );

    if (newLessons && newLessons.length > 0) {
      setLessonsMap((prevLessons) => [...prevLessons, ...newLessons]);
    }

    setLoading(false);
  }, [dates, loading]);

  // Handle scrolling to the end of the current date list
  const handleScrollEnd = (currentIndex) => {
    const slidesToShow = 4;
    const totalSlides = dates.length;
    const isNearEnd = currentIndex >= totalSlides - slidesToShow;

    // Only load more dates if we're scrolling forward and at the end
    if (isNearEnd) {
      loadMoreDates();
    }
  };

  // Fetch initial lessons data
  useEffect(() => {
    const fetchInitialData = async () => {
      const lessons = await sendLessonsRequest(
        Object.keys(dates[0])[0],
        Object.keys(dates[dates.length - 1])[0]
      );

      if (lessons && lessons.length > 0) {
        setLessonsMap(lessons);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <>
      <div className="slider-container" style={{ position: 'absolute' }}>
        <Slider {...settings}>
          {dates.map((dateObj, index) => {
            const dateKey = Object.keys(dateObj)[0];
            const hasLesson = (lessonsMap || []).some((lesson) =>
              isSameDate(dateKey, new Date(lesson.day).toDateString())
            );

            const day = dateKey.split(',')[0].split(' ')[0]

            return (
              <div
                key={index}
                onClick={() => handleDisplayData(dateObj)}
                className={hasLesson ? "hasLesson slider-item" : "slider-item"}
              >
                <h3 className="item-h">
                  {/* {day} */}
                  {formatThreeLettersMonthAndDaysToHebrew('day',day) ?? 'שבת'}

                  <br />
                  {new Date(dateKey).getDate()}/{new Date(dateKey).getMonth() + 1}/{new Date(dateKey).getFullYear()}
                </h3>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default DateSlider;
