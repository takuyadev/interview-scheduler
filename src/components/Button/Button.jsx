import React from "react";
import classNames from "classnames";
import "./Button.scss";

// @desc Renders single button
// @props confirm, danger

export default function Button(props) {
   // Render button based on provided props
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger,
   });

   return (
      <button className={buttonClass} {...props}>
         {props.children}
      </button>
   );
}
