import React from "react";

// @desc Renders out a single + button, if there is no appointment
// @props onAdd

const Empty = (props) => {
   const handleClick = () => {
      props.onAdd();
   };

   return (
      <main className="appointment__add">
         <img
            className="appointment__add-button"
            src="images/add.png"
            alt="Add"
            onClick={handleClick}
         />
      </main>
   );
};

export default Empty;
