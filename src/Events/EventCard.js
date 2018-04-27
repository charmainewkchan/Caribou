
import React, { Component } from 'react';
//import Event from './Event'
import '../App.css';

import Event from './Event'
import EditableEvent from './EditableEvent'

import axios from 'axios'

class EventCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit_mode : false
    };


    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.updateData= this.updateData.bind(this);
    this.onCreateEvent=this.onCreateEvent.bind(this);
  }


  toggleEditMode(event) {
    event.stopPropagation();

    this.setState({
      edit_mode: !this.state.edit_mode
    });
  }

  updateData(){
    // reload the data
    const url = "https://bixr.herokuapp.com/api/get_events";
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({
        events_data: res.data,
      }, function() {this.filterEvents()});
    });
  }

  onCreateEvent(event){
    console.log(event)
    axios.post('https://bixr.herokuapp.com/api/post_event', event)
    .then(res => {
        console.log(res);
        console.log(res.data);
      })
    .catch(err => alert(err));

  }


  displayAttendees(event, event_pk) {
    event.stopPropagation();
    console.log(event);
    const url = "https://bixr.herokuapp.com/api/get_users_for_event/" + event_pk + "/";
    axios.get(url).then(res => {
        var netids = res.data.map(user => user.fields.netid);
        alert(netids);
    })
    .catch(err => alert("err:" + err))
  }

  render() {
    if (this.state.edit_mode) {
        return (
              <EditableEvent title={this.props.title}
                                eating_club={this.props.eating_club}
                                time={this.props.time}
                                attendance={this.props.attendance}
                                capacity={this.props.capacity}
                                description={this.props.description}
                                pk={this.props.pk}
                                start = {this.props.start}
                                end = {this.props.end}
                                newCard= {false}

                                onDataChange={this.onDataChange}
                                onCreateEvent={this.onCreateEvent}
                                isEditable={true}

                                isOwner={true}
                                isAttending={false}
                                onLeaveEvent={null}
                                onSubmitEdit={null}
                                toggleEditMode={this.toggleEditMode}
                                displayAttendees={this.displayAttendees}
                                onJoinEvent={this.props.onJoinEvent}/>

        );
    }
    else {
        return  (
        	  <Event title={this.props.title}
                                eating_club={this.props.eating_club}
                                time={this.props.time}
                                attendance={this.props.attendance}
                                capacity={this.props.capacity}
                                description={this.props.description}
                                pk={this.props.pk}
                                start = {this.props.start}
                                end = {this.props.end}
                                isAttending={this.props.isAttending}
                                onRemoveEvent={this.props.onRemoveEvent}
                                isOwner={this.props.isOwner}
                                onLeaveEvent={this.props.onLeaveEvent}
                                toggleEditMode={this.toggleEditMode}
                                displayAttendees={this.displayAttendees}
                                onJoinEvent={this.props.onJoinEvent}/>
        );
    }
  }
}

export default EventCard;
