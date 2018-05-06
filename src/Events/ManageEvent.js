import React, { Component } from 'react';
//import Event from './Event'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import PropTypes from 'prop-types';
import moment from 'moment';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import eating_club_map from './eating_club_map.json';
import '../App.css';
import axios from 'axios'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';



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

var eatingClubAbr = {
  "CL":"Cloister",
  "TO":"Tower",
  "NN":"None",
  "CO":"Colonial",
  "CN":"Cannon",
  "CA":"Cap",
  "IV":"Ivy",
  "TI":"TigerInn",
  "QD":"Quad",
  "TE":"Terrace",
  "CT":"Cottage",
  "CH":"Charter"
}

class ManageEvent extends Component {
  constructor(props){
    super(props)

    this.state = {
      eventName: '',
      eventDes: '',
      eventLoc: '',
      eating_club: '',
      start:"00:00",
      end: "00:00",
      date:"",
      eventCap:0,
      attendance: 0,
      pk: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this._onSelectStart = this._onSelectStart.bind(this);
    this._onSelectEnd = this._onSelectEnd.bind(this);
    this.cancel = this.cancel.bind(this);

  }

  componentDidMount() {
      if ('event_id' in this.props) {
        const event_id = this.props.event_id;
        const url = "https://bixr.herokuapp.com/api/event/" + event_id + "/";
        console.log(url);

        axios.get(url).then(res => {
          console.log(res.data);
          this.setState({
              eventName: res.data[0].fields.title,
              eventDes: res.data[0].fields.description,
              eventLoc: res.data[0].fields.location,
              eating_club: res.data[0].fields.eating_club,
              start:res.data[0].fields.start,
              end:res.data[0].fields.end,
              date: moment(res.data[0].fields.date),
              pk:res.data[0].pk,
              eventCap:res.data[0].fields.capacity,
              attendance:res.data[0].fields.attendance,
              author:res.data[0].author
          });
        });

        const url2 = "https://bixr.herokuapp.com/api/user/" + localStorage.getItem('netid') + "/";
        axios.get(url2).then(res => {
          console.log(res.data);
          this.setState({
              eating_club: eatingClubAbr[res.data[0].fields.eating_club]
          });
        });

      } else {
        const url2 = "https://bixr.herokuapp.com/api/user/" + localStorage.getItem('netid') + "/";
        axios.get(url2).then(res => {
          console.log(res.data);
          this.setState({
              eating_club: eatingClubAbr[res.data[0].fields.eating_club]
          });
        });

      }
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

  cancel(){
    this.props.history.push('/events/list/')
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
      alert('Congrats on submitting your event!');

      var data = [{"capacity": this.state.eventCap, "description" : this.state.eventDes, "title": this.state.eventName, "location": this.state.eventLoc, "start": this.state.start,
      "end": this.state.end, "date" : this.state.date.format().substring(0,10), "pk": this.state.pk}]

      console.log(data)
      this.props.onPostEvent(
        data
      );
    }
  }

  render() {
    return (
      <div className="card Events-event anim-fadeinright">
             <div className="input-group Events-addEvent">
                <input className = "form-control" type = "text" id = "title" placeholder = "Event Name" name = "eventName" value = {this.state.eventName} onChange = {this.handleChange}/>
             </div>

             <div className = "input-group Events-addEvent">
              <textarea className="form-control " type="text" id="description" placeholder = "Description" name = "eventDes" value= {this.state.eventDes} onChange={this.handleChange}/>
             </div>

             <div className="input-group Events-addEvent">

              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Date</span>
              </div>

               <SingleDatePicker
               numberOfMonths={1}
               initialDate={null}
               date={this.state.date}
               name = "date"
               placeholder= "Select"
               small = {false}// momentPropTypes.momentObj or null
               onDateChange={date => this.setState({date})} // PropTypes.func.isRequired
               focused={this.state.focused} // PropTypes.bool
               onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
               />
             </div>


             <div className="input-group Events-addEvent">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Start Time</span>
              </div>

              <Dropdown options={options} label = "start" onChange={this._onSelectStart} value={this.state.start} placeholder="00:00" />

              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">End Time</span>
              </div>
              <Dropdown options={options} label = "end" onChange={this._onSelectEnd} value={this.state.end} placeholder="00:00" />
             </div>

             <div className="input-group Events-addEvent">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Capacity</span>
              </div>
              <input className = "form-control" type = "text" id = "capacity" name = "eventCap" value = {this.state.eventCap} onChange = {this.handleChange} placeholder = ""/>
             </div>

             <div className="input-group Events-addEvent">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Location</span>
              </div>
              <input className = "form-control" type = "text" id = "location" name = "eventLoc" value = {this.state.eventLoc} onChange = {this.handleChange} placeholder = ""/>
             </div>

             <div className="row input-group float-right">

                {this.state.pk != '' &&
               <div className = "col float-center">
                  <button className="btn btn-danger" onClick = {(e)=>this.props.onRemoveEvent(e, this.state.pk)} style ={{width:100}} ><FontAwesomeIcon className="mr-1" icon="trash-alt"/>Delete</button>
               </div>
                }

                <div className = "col float-right">
                  <button className="btn btn-success" style ={{width:100}} onClick = {this.handleCreateEvent}><FontAwesomeIcon className="mr-1" icon="save"/>Save</button>
                </div>

                <div className = "col float-right">
                  <button className="btn" style ={{width:100}} onClick = {this.cancel}>Cancel</button>
                </div>


              </div>

      </div>
    );
  }
}

//

export default withRouter(ManageEvent);
