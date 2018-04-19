import React, { Component } from 'react';
import Event from './Event'
import eating_club_map from './eating_club_map.json';

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
        		this.props.events.map(function(event){
              return (
                <div className="col-md-6 event-row-buffer">
                <EventCard title={event.fields.title}
                            eating_club={event.fields.eating_club}
                            time={event.fields.time}
                            attendance={event.fields.attendance}
                            capacity={event.fields.capacity}
                            description={event.fields.description}
                            pk={event.pk}
                            onJoinEvent={this.props.onJoinEvent}
                            isEditable={false}/>
                </div>);
            }, this)
    );
  }
}

export default EventsPanel;
