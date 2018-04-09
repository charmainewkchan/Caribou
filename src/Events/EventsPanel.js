import React, { Component } from 'react';
//import Event from './Event'
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
                  <h2>{event.title}</h2>
                  <p>{event.club} &bull; {event.time}</p>
                </div>
                <p>{event.desc}</p>
                <p>Capacity: {event.capacity}</p>
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
