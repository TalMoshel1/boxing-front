import React from "react";
import "../css-components/HourList.css"

const HourList = () => {
  const hours = Array.from({ length: 24 }, (_, index) => {
    const hour = index < 10 ? `0${index}:00` : `${index}:00`;
    return hour;
  });

  return (
              <div  className="hour-container">
          <div className="hour">00:00</div>
          <div className="hour-event">
            lorem500
          </div>
        </div>
      /* {hours.map((hour, index) => (
        <div key={index} className="hour-container">
          <div className="hour">{hour}</div>
          <div className="hour-event">
            lorem500
          </div>
        </div>
      ))} */
  );
};

export default HourList;
