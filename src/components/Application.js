import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";


export default function Application(props) {
   const [days, setDays] = useState([]);
   const [appointments, setAppointments] = useState(null)
   const [day, setDay] = useState("Monday");

   useEffect(()=>{
      axios.get('http://localhost:8001/api/days').then((res)=>{
         setDays(res.data)
      })

      axios.get('http://localhost:8001/api/appointments').then((res)=>{
         setAppointments(res.data)
      })
   },[])


   const AppointmentList = () => {
      return Object.values(appointments).map((appointment, i) => (
         <Appointment key={i} {...appointment} />
      ));
   };

   return (
      <main className="layout">
         <section className="sidebar">
            <img
               className="sidebar--centered"
               src="images/logo.png"
               alt="Interview Scheduler"
            />
            <hr className="sidebar__separator sidebar--centered" />
            <nav className="sidebar__menu">
               <DayList days={days} day={day} setDay={setDay} />
            </nav>
            <img
               className="sidebar__lhl sidebar--centered"
               src="images/lhl.png"
               alt="Lighthouse Labs"
            />
         </section>
         <section className="schedule">{appointments && <AppointmentList />}</section>
      </main>
   );
}
