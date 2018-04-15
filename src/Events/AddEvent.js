import React, { Component } from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import PropTypes from 'prop-types';
import '../App.css';
import {TimePicker} from 'antd';
import moment from 'moment';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const format = 'HH:mm';
const hourOptions = [
  '01', '02', '03','04','05', '06', '07','08','09', '10', '11','12','13', '14',
  '15','16','17', '18', '19','20','21', '22', '23','24'
]
const minOptions = [
  '00', '15', '30','45'
]
const defaultOption = [0];


class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      eventDes: '',
      eventLoc: '',
      startHour: '',
      startMin: '',
      endHour: '',
      endMin: '',
      date:'',
      eventCap:''
    };

    this.handleChange = this.handleChange.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
  }

  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    });
  }


  _onSelect(option) {
    console.log(this.state.startHour);
    this.setState({
      [option.timeType]: option.value
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
    /*else if (this.state.eventStartTime.match(/[a-z]/i) || this.state.eventEndTime.match(/[a-z]/i) || !this.state.eventStartTime|| !this.state.eventEndTime){
      alert('Invalid input for time. Please only enter numbers.')
    }*/
    else if (this.state.capacity == '') {
      alert('Please enter a maximum capacity.')
    } else {
      alert('An event was submitted: ' + this.state.eventName + " " + this.state.eventDes + " " + this.state.eventLoc + " " + this.state.date.format().substring(0,10) + " " + this.state.eventStartTime +"-" + " " + this.state.eventEndTime + " " + this.state.eventCap);
      /* package data into json, axios.post(url + data) (in events.js), clear fields, get events/ wait for interval update.*/
      var data = [{"description" : this.state.eventDes, "title": this.state.eventName, "location": this.state.eventLoc, "date": this.state.date.format().substring(0,10), "capacity": this.eventCap}]
       /*start, end*/
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
          </input>
        </div>

        <div className= "Events-descriptionBox">
            Date:
            <SingleDatePicker
            date={this.state.date}
            name = "date"
            placeholder= "Select"
            small = {true}// momentPropTypes.momentObj or null
            onDateChange={date => this.setState({date})} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            />
        </div>

        <div className = "form-group row">
          <div className= "Events-descriptionBox">
          Select Time:
          </div>

          <div style = {{width: 100}}  >
          <Dropdown options={hourOptions} label = "startHour" onChange={this._onSelect} value={defaultOption} placeholder="Hour" />
          </div>
          :
          <div style = {{width: 100}}  >
          <Dropdown options={minOptions}  label = "startMin" onChange={this._onSelect} value={defaultOption} placeholder="Minute" />
          </div>

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
