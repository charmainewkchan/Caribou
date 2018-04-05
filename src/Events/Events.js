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
        <EventsFilter />
      	<EventsPanel events={events_data}/>
      </div>
      </div>
    );
  }
}

export default Events;
