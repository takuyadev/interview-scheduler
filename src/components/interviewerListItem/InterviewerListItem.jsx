import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

// @desc Render one interviewer as a clickable avatar
// @props selected, name, avatar, onClick

const InterviewerListItem = (props) => {
   // Dynamic rendering with classes, provided with props
   const liClass = classNames("interviewers__item", {
      "interviewers__item--selected": props.selected,
   });

   const imgClass = classNames("interviewers__item-image", {
      "interviewers__item-image": props.selected,
   });

   return (
      <li onClick={props.onClick} className={liClass}>
         <img
            data-testid="interviewer-list-item"
            className={imgClass}
            src={props.avatar}
            alt={props.name}
         />
         {props.selected && props.name}
      </li>
   );
};

export default InterviewerListItem;
