import React, { Component } from 'react';
//import Event from './Event'
import eating_club_map from './eating_club_map.json';

import axios from 'axios'

import '../App.css';

class EventsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.joinEvent = this.joinEvent.bind(this)
  }

  joinEvent(event_id) {
    var data = {
      event: event_id
    }
    alert(JSON.stringify(data));

    axios.post("https://bixr.herokuapp.com/api/join_event",  data)
    .then(res => console.log(res))
    .catch(err => alert(err.response));
}

  render() {
    return (
        <div className="Events-panel">
        	<ul className="Events-list">
          {    
        		this.props.events.map(function(event){
              return <li className="Events-event">
                <div className="event-header">
                  <h2>{event.fields.title}</h2>
                  <p>{eating_club_map[event.fields.eating_club]} &bull; {event.fields.time}</p>
                </div>
                <p>{event.fields.description}</p>
                <p>Capacity: {event.fields.capacity}</p>
                <button className="btn btn-secondary join-button" onClick={() => this.joinEvent(event.pk)}> Join </button>

              </li>;
            }, this)
          }
        	</ul>
        </div>
    );
  }
}

export default EventsPanel;
