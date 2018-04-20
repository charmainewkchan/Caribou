import React, { Component } from 'react';
//import Event from './Event'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import PropTypes from 'prop-types';
import moment from 'moment';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import eating_club_map from './eating_club_map.json';
import '../App.css';

// Constants for time
const format = 'HH:mm';
const options = [
  '01:00','01:15','01:30','01:45',
  '02:00','02:15','02:30','02:45',
  '03:00','03:15','03:30','03:45',
  '04:00','04:15','04:30','04:45',
  '05:00','05:15','05:30','05:45',
  '06:00','06:15','06:30','06:45',
  '07:00','07:15','07:30','07:45',
  '08:00','08:15','08:30','08:45',
  '09:00','09:15','09:30','09:45',
  '10:00','10:15','10:30','10:45',
  '11:00','11:15','11:30','11:45',
  '12:00','12:15','12:30','12:45',
  '13:00','13:15','13:30','13:45',
  '14:00','14:15','14:30','14:45',
  '15:00','15:15','15:30','15:45',
  '16:00','16:15','16:30','16:45',
  '17:00','17:15','17:30','17:45',
  '18:00','18:15','18:30','18:45',
  '19:00','19:15','19:30','19:45',
  '20:00','20:15','20:30','20:45',
  '21:00','21:15','21:30','21:45',
  '22:00','22:15','22:30','22:45',
  '23:00','23:15','23:30','23:45',
  '24:00'
]

class EditableEvent extends Component {
  constructor(props){
    super(props)

    this.state = {
      eventName: this.props.title,
      eventDes: this.props.description,
      eventLoc: this.props.location,
      start:this.props.start,
      end: this.props.end,
      date:this.props.date,
      eventCap:this.props.capacity,
      attendance: this.props.attendance
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this._onSelectStart = this._onSelectStart.bind(this);
    this._onSelectEnd = this._onSelectEnd.bind(this);

  }

  _onSelectStart(event) {
    console.log(event.value);
    this.setState({
      start: event.value
    });
  }
  _onSelectEnd(event) {
    console.log(event.value);
    this.setState({
      end: event.value
    });
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
    else if (this.state.startHour > this.state.endHour || (this.state.startHour == this.state.endHour) && (this.state.startMin > this.state.endMin)){
      alert('Invalid input for time. Please make sure the range is correct.')
    }
    else if (this.state.capacity == '') {
      alert('Please enter a maximum capacity.')
    } else {
      alert('An event was submitted: ' + this.state.eventName + " " + this.state.eventDes + " " + this.state.eventCap + " " + this.state.eventLoc + " " + this.state.date.format().substring(0,10) + " " + this.state.startHour + ":" +
      this.state.startMin +"-" + " " + this.state.endHour + ":" + this.state.endMin + " ");

      var data = [{"capacity": this.state.eventCap, "description" : this.state.eventDes, "title": this.state.eventName, "location": this.state.eventLoc, "start": this.state.startHour + ":" + this.state.startMin,
      "end": this.state.endHour + ":" + this.state.endMin, "date" : this.state.date.format().substring(0,10), "pk": this.props.pk}]

      this.props.onCreateEvent(
        data
      );
    }
  }

  render() {
    return (
      <div className="card Events-event">
  		 <div className="card-header event-header">
  			  <input className = "form-control" type = "text" id = "title" name = "eventName" value = {this.state.eventName} onChange = {this.handleChange}/>
  		    <p>{eating_club_map[this.props.eating_club]} &bull</p>
          // TODO: editable date
          // TODO: editable time
  		 </div>

  	    <div className="card-body event-body">
             <textarea className="form-control" type="text" id="description" name = "eventDes" value= {this.state.eventDes} onChange={this.handleChange}/>
             <SingleDatePicker
             date={this.state.date}
             name = "date"
             placeholder= "Select"
             small = {true}// momentPropTypes.momentObj or null
             onDateChange={date => this.setState({date})} // PropTypes.func.isRequired
             focused={this.state.focused} // PropTypes.bool
             onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
             />

             <div className = "container">
              <div className = "row">
                <label for = "start" className = "col"> Start:</label>
                  <div className = "col">
                      <div>
                        <Dropdown options={options} label = "start" onChange={this._onSelectStart} value={this.state.start} placeholder="00:00" />
                      </div>
                  </div>

                <label for = "dash" className= "col btn"> - </label>
                <label for = "end" className = "col"> End:</label>
                <div className = "col">
                    <div>
                      <Dropdown options={options} label = "end" onChange={this._onSelectEnd} value={this.state.end} placeholder="00:00" />
                    </div>
                </div>

              </div>
             </div>

             <div className = "row">
              <div className = "col">
              <button className = "btn">{this.state.attendance+"/"}</button>
              </div>
              <div className = "col">
              <input className = "form-control" type = "text" id = "capacity" name = "eventCap" value = {this.state.eventCap} onChange = {this.handleChange} placeholder = "Capacity"/>
              </div>
             </div>
        </div>
        <button className="btn btn-success" onClick = {this.handleCreateEvent}> Save Changes </button>
      </div>
    );
  }
}

//

export default EditableEvent;
