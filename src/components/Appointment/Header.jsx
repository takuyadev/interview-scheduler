import React from "react";

// @desc Renders out header; time of appointment
// @props time

const Header = (props) => {
   return (
      <div>
         <header className="appointment__time">
            <h4 className="text--semi-bold">{props.time}</h4>
            <hr className="appointment__separator" />
         </header>
      </div>
   );
};

export default Header;
