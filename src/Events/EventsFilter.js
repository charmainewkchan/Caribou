import React, { Component } from 'react';
import events_data from './events.json';
import '../App.css';

class EventsFilter extends Component {
  render() {
    return (
      <div className = "row">
        <div className = "Events-filter">
        <p> Search: </p>
        <p> Filter Options:</p>
        </div>
      </div>
    );
  }
}

export default EventsFilter;
