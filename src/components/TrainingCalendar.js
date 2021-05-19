import React, { useState, useEffect } from "react";
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';

function TrainingCalendar() {

  const localizer = momentLocalizer(moment);
  const [trainings, setTrainings] = React.useState([]);

  useEffect(() => {
      fetchTrainings();
  }, []);

  const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err))
  }


  const events = trainings.map((training)=>{

    return {
        id: training.id,
        start: new Date(training.date),
        end: new Date(new Date(training.date).setMinutes(new Date(training.date).getMinutes() + training.duration)),
        title: training.activity + ' - ' + training.customer.firstname + ' ' + training.customer.lastname
      }
  })

    return (
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={events}
          style={{ height: "120vh" }}
        />)
    }

    export default TrainingCalendar;