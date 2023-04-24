import React from "react";

// @desc Renders out booked appointment with details on appointment
// @props onEdit, onDelete, name, interviewer

const Show = (props) => {

   // Handles event handlers for when edit or delete is pressed
   const handleEdit = () => props.onEdit();
   const handleDelete = () => props.onDelete();

   return (
      <main className="appointment__card appointment__card--show">
         <section className="appointment__card-left">
            <h2 className="text--regular">{props.name}</h2>
            <section className="interviewer">
               <h4 className="text--light">Interviewer</h4>
               <h3 className="text--regular">{props.interviewer.name}</h3>
            </section>
         </section>
         <section className="appointment__card-right">
            <section className="appointment__actions">
               <img
                  className="appointment__actions-button"
                  src="images/edit.png"
                  alt="Edit"
                  onClick={handleEdit}
               />
               <img
                  className="appointment__actions-button"
                  src="images/trash.png"
                  alt="Delete"
                  onClick={handleDelete}
               />
            </section>
         </section>
      </main>
   );
};

export default Show;
