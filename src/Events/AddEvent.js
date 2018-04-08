import React, { Component } from 'react';
import events_data from './events.json';
import '../App.css';

class AddEvent extends Component {
  render() {
    return (
      <div className= "Events-event">
      <div className="input-group mb-3">

        <input type="text" placeholder="Event Name" aria-label="Event Name" aria-describedby="basic-addon2">
        </input>
        <input type="text" className = "Events-description" placeholder="Description" aria-label="Description" aria-describedby="basic-addon2">
        </input>

      </div>

        <p>Location:___</p>
        <p>Time:___</p>
        <p>Capacity: __</p>
        <button> Create </button>
      </div>
    );
  }
}

export default AddEvent;
