import React, { Component } from 'react';
import EventsPanel from './EventsPanel';
import EventsFilter from './EventsFilter';
import events_data from './events.json';

import '../App.css';

class Events extends Component {
  render() {
    return (
      <div>

      <div className="Events row">
        <div className= "col-3">
        <EventsFilter />
        </div>
        <div className= "col-9">
      	<EventsPanel events = {events_data}/>
        </div>
      </div>
      </div>
    );
  }
}

export default Events;
