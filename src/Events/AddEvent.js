import React, { Component } from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import PropTypes from 'prop-types';
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
      date:'',
      eventCap:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
  }

  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCreateEvent(event) {
    if(!this.state.eventName){
      alert('Please enter an event name.')
    }
    else if(!this.state.eventLoc){
      alert('Please enter a location.')
    }
    else if (!this.state.date){
      alert('Please select a date.')
    }
    else if (this.state.eventStartTime.match(/[a-z]/i) || this.state.eventEndTime.match(/[a-z]/i) || !this.state.eventStartTime|| !this.state.eventEndTime){
      alert('Invalid input for time. Please only enter numbers.')
    }
    else if (this.state.capacity == '') {
      alert('Please enter a maximum capacity.')
    } else {
      alert('An event was submitted: ' + this.state.eventName + " " + this.state.eventDes + " " + this.state.eventLoc + " " + this.state.date + " " + this.state.eventStartTime +"-" + " " + this.state.eventEndTime + " " + this.state.eventCap);
      /* package data into json, axios.post(url + data) (in events.js), clear fields, get events/ wait for interval update.*/
      var data = [{"author" : "cwkchan", "description" : this.state.eventDes, "title": this.state.eventName, "location": this.state.eventLoc, "eating_club": "CA"}]
      this.props.onCreateEvent(
        data
      );
    }

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

            <div className= "Events-descriptionBox">
            Date:
            <SingleDatePicker
            date={this.state.date}
            name = "date"
            placeholder= "Select"
            small = {true}// momentPropTypes.momentObj or null
            onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            />

            </div>



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
