import "./InterviewerList.scss";
import React from "react";
import PropTypes from 'prop-types'; 
import InterviewerListItem from "../interviewerListItem/InterviewerListItem.jsx";

// @props interviewers, onChange
// @desc Render out all interviewers in a list

const InterviewerList = (props) => {
   // Render out lists of interviews, passed in by props
   const List = () =>
      props.interviewers.map((interviewer) => {
         // For every interviewer, add onClick event handler to update state
         return (
            <InterviewerListItem
               data-testid="interviewer-list-item"
               key={interviewer.id}
               name={interviewer.name}
               avatar={interviewer.avatar}
               onClick={() => props.onClick(interviewer.id)}
               selected={interviewer.id === props.interviewer}
            />
         );
      });

   return (
      <section className="interviewers">
         <h4 className="interviewers__header text--light">Interviewer</h4>
         <ul className="interviewers__list">
            <List />
         </ul>
      </section>
   );
};

InterviewerList.propTypes = {
   interviewers: PropTypes.array.isRequired,
   onClick: PropTypes.func.isRequired
}

export default InterviewerList;
