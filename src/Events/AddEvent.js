import React, { Component } from 'react';
import '../App.css';

class AddEvent extends Component {
  render() {
    return (
      <div className="Events-addEvent">

        <div className="form-group row">
          <label for="title" class="col-2 col-form-label">Event</label>
          <div class="col-10">
            <input class="form-control" type="text" id="title"/>
          </div>
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
                </input> 
              </div>

          <button className="btn btn-success" onClick={this.props.onCreateEvent}> Create </button>
      </div>
    );
  }
}

export default AddEvent;
