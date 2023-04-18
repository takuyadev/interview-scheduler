import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  return (
    <ul>
      {props.days.map((day) => (
        <DayListItem name={day.name} spots={day.spots} message={day.message} />
      ))}
    </ul>
  );
};

export default DayList;
