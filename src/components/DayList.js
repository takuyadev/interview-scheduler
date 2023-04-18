import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  return (
    <ul>
      {props.days.map((day, i) => (
        <DayListItem
          key={i}
          name={day.name}
          selected={props.day === day.name}
          spots={day.spots}
          message={day.message}
          setDay={props.setDay}
        />
      ))}
    </ul>
  );
};

export default DayList;
