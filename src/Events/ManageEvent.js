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
import hours from './hours.json'
import Util from '../Util'

// Constants for time
const format = 'HH:mm';

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
              start: Util.timeTo12Hour(res.data[0].fields.start),
              end: Util.timeTo12Hour(res.data[0].fields.end),
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
    var numbers = /^[0-9]+$/;

    if(!this.state.eventName){
      alert('Please enter an event name.')
    }

    else if (!this.state.date){
      alert('Please select a date.')
    }
    //else if (!Util.validTime(this.state.start, this.state.end)){
    // alert('Invalid input for time. Please make sure the range is correct.')
    //}
    else if (this.state.eventCap == '') {
      alert('Please enter a maximum capacity.')
    }
    else if (this.state.eventCap > 10000 ) {
      alert('Please event a valid number for capacity.');
    }
    else if(!this.state.eventLoc){
      alert('Please enter a location.')
    }
    else {
      alert('Congrats on submitting your event!');

      var data = [{
        "capacity": this.state.eventCap, 
        "description" : this.state.eventDes, 
        "title": this.state.eventName, 
        "location": this.state.eventLoc, 
        "start": Util.timeTo24Hour(this.state.start),
        "end": Util.timeTo24Hour(this.state.end), 
        "date" : this.state.date.format().substring(0,10), 
        "pk": this.state.pk
      }]

      console.log(data)
      this.props.onPostEvent(
        data
      );
    }
  }

  render() {
    return (
      <div className="events-wrapper Events-event anim-fadeinright pb-2">
        <div className="container-fluid">

             <div className="input-group row Events-addEvent">
                <input className = "form-control" type = "text" id = "title" placeholder = "Event Name" name = "eventName" value = {this.state.eventName} onChange = {this.handleChange}/>
             </div>

             <div className = "input-group row Events-addEvent">
              <textarea className="form-control " type="text" id="description" placeholder = "Description" name = "eventDes" value= {this.state.eventDes} onChange={this.handleChange}/>
             </div>

             <div className="input-group row Events-addEvent">

              <div className="input-group-prepend ">
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

             {/*START TIME AND END TIME */}
             <div className="row">

              <div className="col-md-6">
               <div className="input-group row Events-addEvent">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Start</span>
                </div>
                <Dropdown options={hours} className="form-control"label = "start" onChange={this._onSelectStart} value={this.state.start} placeholder="00:00" aria-describedby="basic-addon1"/>
               </div>
               </div>

              <div className="col-md-6">
               <div className="input-group row Events-addEvent">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon2">End</span>
                </div>
                <Dropdown options={hours} label="end" className="form-control" onChange={this._onSelectEnd} value={this.state.end} placeholder="00:00" aria-describedby="basic-addon2"/>
               </div>
              </div>

            </div>

             <div className="input-group row Events-addEvent">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Capacity</span>
              </div>
              <input className = "form-control" type = "number" id = "eventCap" name = "eventCap" value = {this.state.eventCap} onChange = {this.handleChange} placeholder = ""/>
             </div>

             <div className="input-group row Events-addEvent">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Location</span>
              </div>
              <input className = "form-control" type = "text" id = "location" name = "eventLoc" value = {this.state.eventLoc} onChange = {this.handleChange} placeholder = ""/>
             </div>

             <div className="row input-group">

                {this.state.pk != '' &&
               <div className = "col-sm-4 mb-2">
                  <button className="btn btn-sm btn-danger" onClick = {(e)=>this.props.onRemoveEvent(e, this.state.pk)} style ={{width:100}} ><FontAwesomeIcon className="mr-1" icon="trash-alt"/>Delete</button>
               </div>
                }

                <div className = "col-sm-4  mb-2">
                  <button className="btn btn-sm btn-success" style ={{width:100}} onClick = {this.handleCreateEvent}><FontAwesomeIcon className="mr-1" icon="save"/>Save</button>
                </div>

                <div className = "col-sm-4  mb-2">
                  <button className="btn btn-sm" style ={{width:100}} onClick = {this.cancel}>Cancel</button>
                </div>


              </div>
          </div>
      </div>
    );
  }
}

//

export default withRouter(ManageEvent);
