import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

// @desc Render out one of the selectable days in the nav menu
// @props selected, full, spots, message, value, handleClick

const DayListItem = (props) => {
   // Setup dynamic classes
   const listClass = classNames("day-list__item", {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.full,
   });

   // Renders the amount of spots available as a message
   const Spots = () => {
      let message = `${props.spots} spots remaining`;

      // If there is no spots, then no spots remaining should display
      if (props.spots === 0) {
         message = "no spots remaining";
      }

      // If there is only 1 spot, it should not be plural
      if (props.spots === 1) {
         message = "1 spot remaining";
      }

      // Else, return default message defined
      return <h3 className="text--light">{message}</h3>;
   };

   // Handles onClick passed by parent
   const handleClick = () => {
      props.onClick(props.value);
   };

   return (
      <li className={listClass} data-testid="day" onClick={handleClick}>
         <h2 className="text--regular">{props.value}</h2>
         <Spots />
      </li>
   );
};

export default DayListItem;
