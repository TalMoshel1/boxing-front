import React from "react";
import HourList from "./HourList";
import "../css-components/Day.css";

export function Day({ date }) {
  return (
    <div className="day">
      {date}
      <HourList />
    </div>
  );
}

export default Day;
