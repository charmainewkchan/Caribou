import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { render } from 'react-dom'
import BigCalendar from "react-big-calendar";
import moment from 'moment';
import axios from 'axios'
import { getEvents } from './gcal'

import "react-big-calendar/lib/css/react-big-calendar.css";
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));



const eventstemp = [
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
      events : []
    };

  }

  componentDidMount () {
  getEvents((events) => {
    this.setState({events})
  })
}


  render() {
        return (
          <BigCalendar
          className = "Home-cal"
          style={{height: '1000px'}}
          step={60}
          showMultiDayTimes
          events={this.state.events}
          defaultDate={new Date(2018, 4, 27)}        />
      )
    }
}

export default EventCal;
