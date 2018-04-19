
import React, { Component } from 'react';
//import Event from './Event'
import eating_club_map from './eating_club_map.json';
import '../App.css';

class EditableEvent extends Component {

  constructor(props){
    super(props)

    this.state = {
      eventName: this.props.title,
      eventDes: this.props.description,
      eventLoc: this.props.location,
      startHour: this.props.start.substring(0,2),
      startMin: this.props.start.substring(3,5),
      endHour: this.props.end.substring(0,2),
      endMin: this.props.end.substring(3,5),
      date:this.props.date,
      eventCap:this.state.capacity
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);

  }

<<<<<<< HEAD
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
      /* package data into json, axios.post(url + data) (in events.js), clear fields, get events/ wait for interval update.*/

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
             <div className = "row">
              <div className = "col-2">
              <p>{this.props.attendance+"/"}</p>
              </div>
              <div className = "col-2">
              <input className = "form-control" type = "text" id = "capacity" name = "eventCap" value = {this.state.eventCap} onChange = {this.handleChange}/>
              </div>
             </div>
        </div>
        <button className="btn btn-success" onClick = {this.handleCreateEvent}> Save Changes </button>
      </div>

=======
  render() {
    return (
    <div className="card Events-event">
     <div className="card-header event-header">
        <div className="form-group">
          <div className="col-10">
            <input className="form-control input-sm col-sm" type="text" id="title" name = "eventName" value={this.state.value} defaultValue={this.props.title} onChange={this.handleChange}/>
          </div>
        </div>

        <p>{eating_club_map[this.props.eating_club]} &bull; {this.props.time}</p>
     </div>

      <div className="card-body event-body">
           <p>{this.props.description}</p>
           <p>{this.props.attendance == 0 ? "Be the first to join!" : ""+this.props.attendance+"/"+this.props.capacity+" going!"}</p>
      </div>

      <div className="card-footer event-footer">
        <button disabled={this.props.attendance==this.props.capacity} className="btn btn-secondary join-button" onClick={() => this.props.onJoinEvent(this.props.pk)}> Join </button>
      </div>
    </div>
>>>>>>> 7ddd208828a707ce2bc9ca08406fe5b6e03d418b
    );
  }
}

//

export default EditableEvent;
