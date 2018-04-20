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


    this.onJoinEvent = this.onJoinEvent.bind(this);
    this.onLeaveEvent = this.onLeaveEvent.bind(this);
  }




  onJoinEvent(event_id) {
    var data = [{
      event: event_id,
    }]
    axios.post("https://bixr.herokuapp.com/api/join_event/",  data)
    .then(res => console.log(res))
    .catch(err => alert(err));

    this.props.updateData();
  }

  onEditEvent(event_id) {

  }

  onLeaveEvent(event_id) {
    var data = [{
      event: event_id,
    }]
    alert(JSON.stringify(data));

    axios.post("https://bixr.herokuapp.com/api/unjoin_event/",  data)
    .then(res => console.log(res))
    .catch(err => alert(err));

    this.props.updateData();
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
                            isAttending={event.isAttending}
                            isOwner={event.isOwner}
                            onJoinEvent={this.onJoinEvent}
                            onEditEvent={this.onEditEvent}
                            onLeaveEvent={this.onLeaveEvent}/>
              </div>)

            }, this)
    );
  }
}

export default EventsPanel;
