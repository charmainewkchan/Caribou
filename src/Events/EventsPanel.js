import React, { Component } from 'react';
//import Event from './Event'


import axios from 'axios';
import EventCard from './EventCard';

import '../App.css';

class EventsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="Events-panel">
        	<ul className="Events-list">
          {    
        		this.props.events.map(function(event){
              return <li className="Events-event">
                <EventCard title={event.fields.title} 
                            eating_club={event.fields.eating_club} 
                            time={event.fields.time} 
                            attendance={event.fields.attendance} 
                            capacity={event.fields.capacity} 
                            description={event.fields.description}
                            pk={event.pk}
                            onJoinEvent={this.props.onJoinEvent}/>
              </li>;
            }, this)
          }
        	</ul>
        </div>
    );
  }
}

export default EventsPanel;
