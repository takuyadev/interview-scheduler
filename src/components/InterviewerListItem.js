import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss"

const InterviewerListItem = (props) => {
   const liClass = classNames("interviewers__item", {
      "interviewers__item--selected": props.selected,
   });

   const imgClass = classNames("interviewers__item-image", {
      "interviewers__item-image": props.selected,
   });

   return (
      <li onClick={props.onClick} className={liClass}>
         <img className={imgClass} src={props.avatar} alt={props.name} />
         {props.selected && props.name}
      </li>
   );
};

export default InterviewerListItem;