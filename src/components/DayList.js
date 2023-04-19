import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  return (
    <ul>
      {props.days.map((day, i) => (
        <DayListItem
          key={i}
          value={day.name}
          selected={props.day === day.name}
          spots={day.spots}
          message={day.message}
          onClick={props.onChange}
        />
      ))}
    </ul>
  );
};

export default DayList;
