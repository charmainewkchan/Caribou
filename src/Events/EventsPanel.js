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
                <h2>{event.title}</h2>
                <p>{event.desc}</p>
                <p>Location: {event.location}</p>
                <p>Time: {event.time}</p>
                <p>Capacity: {event.capacity}</p>
                <button> Join </button>

              </li>;
            })
          }
        	</ul>
        </div>


    );
  }
}

export default EventsPanel;
