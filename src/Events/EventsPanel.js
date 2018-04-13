import React, { Component } from 'react';
//import Event from './Event'
import eating_club_map from './eating_club_map.json';
import '../App.css';

class EventsPanel extends Component {
  constructor(props) {
    super(props);
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
                <button className="btn btn-secondary join-button"> Join </button>

              </li>;
            })
          }
        	</ul>
        </div>
    );
  }
}

export default EventsPanel;
