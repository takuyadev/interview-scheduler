import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {
   const List = () =>
      props.interviewers.map((interviewer) => (
         <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            onClick={() => props.onChange(interviewer.id)}
            selected={interviewer.id === props.interviewer}
         />
      ));

   return (
      <section className="interviewers">
         <h4 className="interviewers__header text--light">Interviewer</h4>
         <ul className="interviewers__list">
            <List />
         </ul>
      </section>
   );
};

export default InterviewerList;
