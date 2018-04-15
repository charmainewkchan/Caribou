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


class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      eventDes: '',
      eventLoc: '',
      startHour: '00',
      startMin: '00',
      endHour: '00',
      endMin: '00',
      date:'',
      eventCap:''
    };

    this.handleChange = this.handleChange.bind(this);
    this._onSelect1 = this._onSelect1.bind(this);
    this._onSelect2 = this._onSelect2.bind(this);
    this._onSelect3 = this._onSelect3.bind(this);
    this._onSelect4 = this._onSelect4.bind(this);

    this.handleCreateEvent = this.handleCreateEvent.bind(this);
  }

  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  _onSelect1(event) {
    console.log(event.value);
    this.setState({
      startHour: event.value
    });
  }

  _onSelect2(event) {
    console.log(event.value);
    this.setState({
      startMin: event.value
    });
  }

  _onSelect3(event) {
    console.log(event.value);
    this.setState({
      endHour: event.value
    });
  }

  _onSelect4(event) {
    console.log(event.value);
    this.setState({
      endMin: event.value
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
    else if (this.state.startHour > this.state.endHour || (this.state.startHour == this.state.endHour) && (this.state.startMin > this.state.endMin)){
      alert('Invalid input for time. Please make sure the range is correct.')
    }
    else if (this.state.capacity == '') {
      alert('Please enter a maximum capacity.')
    } else {
      alert('An event was submitted: ' + this.state.eventName + " " + this.state.eventDes + " " + this.state.eventLoc + " " + this.state.date.format().substring(0,10) + " " + this.state.startHour + ":" +
      this.state.startMin +"-" + " " + this.state.endHour + ":" + this.state.endMin + " " + this.state.eventCap);
      /* package data into json, axios.post(url + data) (in events.js), clear fields, get events/ wait for interval update.*/

      var data = [{"author" : localStorage.getItem('netid'), "description" : this.state.eventDes, "title": this.state.eventName, "location": this.state.eventLoc, "start": this.state.startHour + ":" + this.state.startMin,
      "end": this.state.endHour + ":" + this.state.endMin}]
      console.log(data)

      this.props.onCreateEvent(
        data
      );
    }

    event.preventDefault();
  }



  render() {
    return (
      <div className="Events-addEvent">

        <div className="form-group">
          <label for="title" class="col-2 col-form-label">Title</label>
          <div class="col-10">
            <input class="form-control" type="text" id="title" name = "eventName" value= {this.state.value} onChange={this.handleChange}/>
          </div>
        </div>

        <div className="form-group">
          <label for="description" class="col-2 col-form-label">Description</label>
          <div class="col-10">
            <textarea class="form-control" type="text" id="description" name = "eventDes" value= {this.state.value} onChange={this.handleChange}/>
          </div>
        </div>

        <div className="form-group">
          <label for="location" class="col-2 col-form-label">Location</label>
          <div class="col-10">
            <input class="form-control" type="text" id="location" name = "eventLoc" value= {this.state.value} onChange={this.handleChange}/>
          </div>
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
          Start Time:
          </div>

          <div style = {{width: 100}}  >
          <Dropdown options={hourOptions} label = "startHour" onChange={this._onSelect1} value={this.state.startHour} placeholder="Hour" />
          </div>
          :
          <div style = {{width: 100}}  >
          <Dropdown options={minOptions}  label = "startMin" onChange={this._onSelect2} value={this.state.startMin} placeholder="Minute" />
          </div>

          <div className= "Events-descriptionBox">
          End Time:
          </div>

          <div style = {{width: 100}}  >
          <Dropdown options={hourOptions} label = "endHour" onChange={this._onSelect3} value={this.state.endHour} placeholder="Hour" />
          </div>
          :
          <div style = {{width: 100}}  >
          <Dropdown options={minOptions}  label = "endMin" onChange={this._onSelect4} value={this.state.endMin} placeholder="Minute" />
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
