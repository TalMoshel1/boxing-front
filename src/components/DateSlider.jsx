import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DateSlider = () => {
  const [dates, setDates] = useState([]);
  const initialDate = new Date();

  useEffect(() => {
    loadInitialDates(initialDate);
  }, []);

  const loadInitialDates = (centerDate) => {
    const newDates = [];
    for (let i = -5; i <= 5; i++) {
      const date = new Date(centerDate);
      date.setDate(centerDate.getDate() + i);
      newDates.push(date);
    }
    setDates(newDates);
  };

  const extendDates = (direction) => {
    const newDates = [...dates];
    if (direction === 'left') {
      const firstDate = newDates[0];
      for (let i = 1; i <= 5; i++) {
        const newDate = new Date(firstDate);
        newDate.setDate(firstDate.getDate() - i);
        newDates.unshift(newDate);
      }
    } else if (direction === 'right') {
      const lastDate = newDates[newDates.length - 1];
      for (let i = 1; i <= 5; i++) {
        const newDate = new Date(lastDate);
        newDate.setDate(lastDate.getDate() + i);
        newDates.push(newDate);
      }
    }
    setDates(newDates);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      if (next === 0) {
        extendDates('left');
      } else if (next >= dates.length - 3) {
        extendDates('right');
      }
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Slider {...settings} style={{marginTop:'50%'}}>
      {dates.map(date => (
        <div key={date.toISOString()}>
          <h3>{formatDate(date)}</h3>
        </div>
      ))}
    </Slider>
  );
};

export default DateSlider;




