import React, { Component } from 'react';
import EventsPanel from './EventsPanel';
import EventsFilter from './EventsFilter';


import '../App.css';

class Events extends Component {
  render() {
    return (
      <div>

      <div className="Events row">
        <EventsFilter />
      	<EventsPanel />
      </div>
      </div>
    );
  }
}

export default Events;
