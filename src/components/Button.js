import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
  return (
    <button className={classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger,
    })} {...props}>
      {props.children}
    </button>
  );
}
