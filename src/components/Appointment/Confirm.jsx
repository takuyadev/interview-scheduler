import React from "react";
import Button from "../Button/Button.jsx";

// @desc Renders confirm page before deletion
// @props onCancel, onConfirm

const Confirm = (props) => {
   const handleCancel = () => {
      props.onCancel();
   };

   const handleConfirm = () => {
      props.onConfirm();
   };

   return (
      <main className="appointment__card appointment__card--confirm">
         <h1 className="text--semi-bold">Delete the appointment?</h1>
         <section className="appointment__actions">
            <Button onClick={handleCancel} danger>
               Cancel
            </Button>
            <Button onClick={handleConfirm} danger>
               Confirm
            </Button>
         </section>
      </main>
   );
};

export default Confirm;
