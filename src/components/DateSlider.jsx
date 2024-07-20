import React, { useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

const DateSlider = () => {
  const [dates, setDates] = useState(generateDatesFromToday(new Date(), 30));
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: false,
    infinite: true, // Enables continuous scrolling
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

  function generateDatesFromToday(startDate, count) {
    const dates = [];

    // Generate dates starting from the specified start date
    for (let i = 0; i < count; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toDateString());
    }

    return dates;
  }

  const loadMoreDates = useCallback(() => {
    if (loading) {
      console.log("issue is not here");
      return;
    }

    setLoading(true);

    // Start generating dates from the day after the last date in the array
    const lastDate = new Date(dates[dates.length - 1]);
    lastDate.setDate(lastDate.getDate() + 1);

    const newDates = generateDatesFromToday(lastDate, 30);

    setDates((prevDates) => [...prevDates, ...newDates]);
    setLoading(false);
  }, [dates, loading]);

  const handleScrollEnd = (currentIndex) => {
    const totalSlides = dates.length;
    const slidesToShow = 6;
    const isNearEnd = currentIndex >= totalSlides - slidesToShow;

    if (isNearEnd) {
      // console.log('problem is not here')
      loadMoreDates();
    }
  };

  return (
    <div className="slider-container">
      <h2>Select Date</h2>
      <Slider {...settings} >
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

// import React, { useState, useCallback } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css"; // Import Swiper styles
// import "../App.css";

// // Import Swiper modules
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// const DateSlider = () => {
//   const [dates, setDates] = useState(generateDatesFromToday(new Date(), 30));
//   const [loading, setLoading] = useState(false);

//   const slidesToShow = 6;

//   const loadMoreDates = useCallback(() => {
//     if (loading) {
//       console.log("Loading in progress");
//       return;
//     }

//     setLoading(true);

//     // Start generating dates from the day after the last date in the array
//     const lastDate = new Date(dates[dates.length - 1]);
//     lastDate.setDate(lastDate.getDate() + 1);

//     const newDates = generateDatesFromToday(lastDate, 30);
//     setDates((prevDates) => [...prevDates, ...newDates]);
//     setLoading(false);
//   }, [dates, loading]);

//   const handleScrollEnd = (swiper) => {
//     const { activeIndex, slides } = swiper;
//     const isNearEnd = activeIndex >= slides.length - slidesToShow;

//     if (isNearEnd) {
//       loadMoreDates();
//     }
//   };

//   return (
//     <div className="slider-container">
//       <h2>Select Date</h2>
//       <Swiper
//         modules={[Navigation, Pagination, Scrollbar, A11y]}
//         spaceBetween={10}
//         slidesPerView={slidesToShow}
//         navigation
//         pagination={{ clickable: true }}
//         onSlideChange={handleScrollEnd}
//         direction="horizontal" // Set direction to horizontal
//         breakpoints={{
//           400: {
//             slidesPerView: 2,
//           },
//           600: {
//             slidesPerView: 4,
//           },
//           1000: {
//             slidesPerView: slidesToShow,
//           },
//         }}
//       >
//         {dates.map((date, index) => (
//           <SwiperSlide key={index}>
//             <h3>{date}</h3>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// function generateDatesFromToday(startDate, count) {
//   const dates = [];
//   // Generate dates starting from the specified start date
//   for (let i = 0; i < count; i++) {
//     const date = new Date(startDate);
//     date.setDate(startDate.getDate() + i);
//     dates.push(date.toDateString());
//   }
//   return dates;
// }

// export default DateSlider;

