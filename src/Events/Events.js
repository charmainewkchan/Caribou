import React, { Component } from 'react';
import EventsPanel from './EventsPanel';

import '../App.css';

class Events extends Component {
  render() {
    return (
      <div className="Events">
      	<EventsPanel />
      </div>
    );
  }
}

export default Events;