import React, { useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css'

const DateSlider = () => {
  const [dates, setDates] = useState(generateDates(new Date(), 30)); // Initial 30 days
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    swipe: true,
    touchMove: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ],
    afterChange: (currentIndex) => handleScrollEnd(currentIndex),
  };

  function generateDates(start, count) {
    const dates = [];
    const startDate = new Date(start);

    for (let i = 0; i < count; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toDateString());
    }

    return dates;
  }

  const loadMoreDates = useCallback(() => {
    if (loading) return;

    setLoading(true);
    const newStartDate = new Date(dates[dates.length - 1]);
    newStartDate.setDate(newStartDate.getDate() + 1);
    const newDates = generateDates(newStartDate, 30);

    setDates((prevDates) => [...prevDates, ...newDates]);
    setLoading(false);
  }, [dates, loading]);

  const handleScrollEnd = (currentIndex) => {
    const totalSlides = dates.length;
    const slidesToShow = 6;
    const isNearEnd = currentIndex >= totalSlides - slidesToShow;

    if (isNearEnd) {
      loadMoreDates();
    }
  };

  return (
    <div className="slider-container">
      <h2>Select Date</h2>
      <Slider {...settings}>
        {dates.map((date, index) => (
          <div key={index}>
            <h3>{date}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DateSlider;
