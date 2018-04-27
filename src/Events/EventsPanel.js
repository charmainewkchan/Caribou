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
    this.onRemoveEvent = this.onRemoveEvent.bind(this);
    this.onPostEvent = this.onPostEvent.bind(this);
  }

  onJoinEvent(event_id) {
    var data = [{
      event: event_id,
    }]
    axios.post("https://bixr.herokuapp.com/api/join_event/",  data)
    .then(res => this.props.updateData())
    .catch(err => alert(err));
  }

    onPostEvent(event) {
      console.log(event)
      axios.post('https://bixr.herokuapp.com/api/post_event', event)
      .then(res => {
          //console.log(res);
          //console.log(res.data);
          
          this.props.updateData()
        })
      .catch(err => alert(err));
    }

    onRemoveEvent(event, event_id) {
      event.stopPropagation();

      const url = "https://bixr.herokuapp.com/api/delete_event/" + event_id + "/";
      axios.get(url)
      .then(res =>  this.props.updateData())
      .catch(err => alert(err));
    }

  onLeaveEvent(event_id) {
    var data = [{
      event: event_id,
    }]
    alert(JSON.stringify(data));

    axios.post("https://bixr.herokuapp.com/api/unjoin_event/",  data)
    .then(res => this.props.updateData())
    .catch(err => alert(err));

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
                              location={event.fields.location}
                              pk={event.pk}
                              start={event.fields.start}
                              end={event.fields.end}
                              isAttending={event.isAttending}
                              isOwner={event.isOwner}
                              onJoinEvent={this.onJoinEvent}
                              onPostEvent={this.onPostEvent}
                              onRemoveEvent={this.onRemoveEvent}
                              onLeaveEvent={this.onLeaveEvent}
                              isEditable={this.props.isEditable}/>
              </div>)

            }, this)
    );
  }
}

export default EventsPanel;
