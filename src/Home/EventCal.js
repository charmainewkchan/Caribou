
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Calendar from "react-big-calendar";
import moment from 'moment';
import axios from 'axios'

import "react-big-calendar/lib/css/react-big-calendar.css";
Calendar.setLocalizer(Calendar.momentLocalizer(moment));




const events = [
    {
        start: '2018-04-20',
        end: '2018-04-28',
        eventClasses: 'optionalEvent',
        title: 'Colonial Tours',
        description: 'This is a test description of an event',
    },
    {
        start: '2018-04-19',
        end: '2018-04-19',
        title: 'Cap Sophomore Meal night',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];

class EventCal extends Component {
  constructor() {
    super()

    this.state = {
      myEvents : events
    };


  }


  render() {
        return (
          <Calendar
          className = "Home-cal"
          style={{height: '1000px'}}
          events={this.state.myEvents}
        />
      )
    }
}

export default EventCal;
