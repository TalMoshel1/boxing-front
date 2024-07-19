import React, { useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DateSlider = () => {
  const [dates, setDates] = useState(generateDates(new Date(), 180)); // Generate 6 months worth of dates
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    swipeToSlide: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
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
    afterChange: (index) => handleScrollEnd(index),
  };

  // Generate a list of dates starting from a given date
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

  // Load more dates when scrolled to the end
  const loadMoreDates = useCallback(() => {
    if (loading) return;

    setLoading(true);
    const newStartDate = new Date(dates[dates.length - 1]);
    newStartDate.setDate(newStartDate.getDate() + 1);
    const newDates = generateDates(newStartDate, 180); // Generate additional dates

    setDates((prevDates) => [...prevDates, ...newDates]);
    setLoading(false);
  }, [dates, loading]);

  // Check if scrolled to the end
  const handleScrollEnd = (currentIndex) => {
    const slideCount = dates.length;
    const slidesToShow = 6; // Number of slides visible at a time
    const isNearEnd = currentIndex >= slideCount - slidesToShow;

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
