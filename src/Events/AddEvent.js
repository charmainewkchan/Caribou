import React, { Component } from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
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

    this.handleChange = this.handleChange.bind(this);
    /*this.handleDesChange = this.handleDesChange.bind(this);
    this.handleLocChange = this.handleLocChange.bind(this);
    this.handleSTimeChange = this.handleSTimeChange.bind(this);
    this.handleETimeChange = this.handleETimeChange.bind(this);
    this.handleCapChange = this.handleCapChange.bind(this);*/
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
  }

  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCreateEvent(event) {
    if (this.state.eventStartTime.match(/[a-z]/i) || this.state.eventEndTime.match(/[a-z]/i)){
      alert('Invalid input for time. Please only enter numbers.')
    }
      /*alert('An event was submitted: ' + this.state.eventName + " " + this.state.eventDes + " " + this.state.eventLoc + " " + this.state.eventStartTime +"-" + " " + this.state.eventEndTime + " " + this.state.eventCap);
    */
    event.preventDefault();
  }

  render() {
    return (
      <div className="Events-addEvent">

        <div className="form-group row">
          <label for="title" class="col-2 col-form-label">Event</label>
          <div class="col-10">
            <input class="form-control" type="text" id="title" name = "eventName" value= {this.state.value} onChange={this.handleChange}/>
          </div>
        </div>

        <div className="input-group mb-3">
          <input type="text" className = "Events-inputSmall" name = "eventDes" placeholder="Description" aria-label="Description" aria-describedby="basic-addon2" value= {this.state.value} onChange={this.handleChange}>
          </input>
        </div>

          <div className= "Events-descriptionBox"> Location:
            <input type="text" className = "Events-inputSmall" name = "eventLoc" placeholder="" aria-label="Location" aria-describedby="location" value= {this.state.value} onChange={this.handleChange}>
            </input> </div>

            Date: <SingleDatePicker
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            />


            <div className= "Events-descriptionBox"> Time:
              <input type="text" className = "Events-inputSmall" name = "eventStartTime" placeholder="Start Time" aria-label="StartTime" aria-describedby="StartTime" value= {this.state.value} onChange={this.handleChange}>
              </input> -
              <input type="text" className = "Events-inputSmall" name = "eventEndTime" nplaceholder="End Time" aria-label="EndTime" aria-describedby="EndTime" value= {this.state.value} onChange={this.handleChange}>
              </input>
            </div>

              <div className= "Events-descriptionBox"> Capacity:
                <input type="text" className = "Events-inputSmall" name = "eventCap" placeholder="" aria-label="Description" aria-describedby="basic-addon2" value= {this.state.value} onChange={this.handleChange}>
                </input>
              </div>

          <button className="btn btn-success" onClick = {this.handleCreateEvent}> Create </button>
      </div>
    );
  }
}

export default AddEvent;
