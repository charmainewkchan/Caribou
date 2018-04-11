import React, { Component } from 'react';
import '../App.css';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      eventDes: '',
      eventLoc: '',
      eventStartTime: '',
      eventEndTime: '',
      eventCap:''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDesChange = this.handleDesChange.bind(this);
    this.handleLocChange = this.handleLocChange.bind(this);
    this.handleSTimeChange = this.handleSTimeChange.bind(this);
    this.handleETimeChange = this.handleETimeChange.bind(this);
    this.handleCapChange = this.handleCapChange.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
  }

  handleNameChange(event) {
    this.setState({eventName: event.target.value});
  }
  handleDesChange(event) {
    this.setState({eventDes: event.target.value});
  }
  handleLocChange(event) {
    this.setState({eventLoc: event.target.value});
  }
  handleSTimeChange(event) {
    this.setState({eventStartTime: event.target.value});
  }
  handleETimeChange(event) {
    this.setState({eventEndTime: event.target.value});
  }
  handleCapChange(event) {
    this.setState({eventCap: event.target.value});
  }

  handleCreateEvent(event) {
    alert('An event was submitted: ' + this.state.eventName + " " + this.state.eventDes + " " + this.state.eventLoc + " " + this.state.eventStartTime +"-" +  + " " + this.state.eventEndTime + " " + this.state.eventCap);
    event.preventDefault();
  }

  render() {
    return (
      <div className="Events-addEvent">

        <div className="form-group row">
          <label for="title" class="col-2 col-form-label">Event</label>
          <div class="col-10">
            <input class="form-control" type="text" id="title" value= {this.state.value} onChange={this.handleNameChange}/>
          </div>
        </div>

        <div className="input-group mb-3">
          <input type="text" className = "Events-inputSmall" placeholder="Description" aria-label="Description" aria-describedby="basic-addon2" value= {this.state.value} onChange={this.handleDesChange}>
          </input>
        </div>

          <div className= "Events-descriptionBox"> Location:
            <input type="text" className = "Events-inputSmall" placeholder="" aria-label="Location" aria-describedby="location" value= {this.state.value} onChange={this.handleLocChange}>
            </input> </div>

            <div className= "Events-descriptionBox"> Time:
              <input type="text" className = "Events-inputSmall" placeholder="Start Time" aria-label="StartTime" aria-describedby="StartTime" value= {this.state.value} onChange={this.handleSTimeChange}>
              </input> -
              <input type="text" className = "Events-inputSmall" placeholder="End Time" aria-label="EndTime" aria-describedby="EndTime" value= {this.state.value} onChange={this.handleETimeChange}>
              </input>
            </div>

              <div className= "Events-descriptionBox"> Capacity:
                <input type="text" className = "Events-inputSmall" placeholder="" aria-label="Description" aria-describedby="basic-addon2" value= {this.state.value} onChange={this.handleCapChange}>
                </input>
              </div>

          <button className="btn btn-success" onClick = {this.handleCreateEvent}> Create </button>
      </div>
    );
  }
}

export default AddEvent;
