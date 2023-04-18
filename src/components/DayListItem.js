import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

const DayListItem = (props) => {
  const listClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.full,
  });

  // Render spots onto page
  const Spots = () => {
    let message = `${props.spots} spots remaining`;

    if (props.spots === 0) {
      message = "no spots remaining";
    }

    if (props.spots === 1) {
      message = "1 spot remaining";
    }

    return <h3 className="text--light">{message}</h3>;
  };

  const handleClick = () => {
    props.setDay(props.name);
  };

  return (
    <li className={listClass} onClick={handleClick}>
      <h2 className="text--regular">{props.name}</h2>
      <Spots />
    </li>
  );
};

export default DayListItem;
