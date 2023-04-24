import React from "react";
import DayListItem from "./DayListItem";

// @desc Render all selectable dates in the nav menu
// @props day, onChange

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
