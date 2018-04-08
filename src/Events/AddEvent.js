import React, { Component } from 'react';
import events_data from './events.json';
import '../App.css';

class AddEvent extends Component {
  render() {
    return (
      <div className= "Events-event">
      <div className="input-group mb-3">
        <input type="text" className = "Events-inputBig" placeholder="Event Name" aria-label="Event Name" aria-describedby="Event Name">
        </input>
      </div>
      <div className="input-group mb-3">
        <input type="text" className = "Events-inputSmall" placeholder="Description" aria-label="Description" aria-describedby="basic-addon2">
        </input>
      </div>

        <div className= "Events-descriptionBox"> Location:
          <input type="text" className = "Events-inputSmall" placeholder="" aria-label="Location" aria-describedby="location">
          </input> </div>
          
          <div className= "Events-descriptionBox"> Time:
            <input type="text" className = "Events-inputSmall" placeholder="Start Time" aria-label="StartTime" aria-describedby="StartTime">
            </input> -
            <input type="text" className = "Events-inputSmall" placeholder="End Time" aria-label="EndTime" aria-describedby="EndTime">
            </input>
            </div>

            <div className= "Events-descriptionBox"> Capacity:
              <input type="text" className = "Events-inputSmall" placeholder="" aria-label="Description" aria-describedby="basic-addon2">
              </input> </div>
        <button> Create </button>
      </div>
    );
  }
}

export default AddEvent;
