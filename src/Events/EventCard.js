
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
  }


  toggleEditMode() {
    this.setState({
      edit_mode: !this.state.edit_mode
    });
  }


  displayAttendees(event_pk) {
    alert(event_pk);
    const url = "https://bixr.herokuapps.com/api/get_users_for_event/" + event_pk + "/";
    axios.get(url).then(res => {
        alert(res.data);
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
                                isAttending={this.props.isAttending}
                                isOwner={true}
                                onLeaveEvent={this.props.onLeaveEvent}
                                toggleEditMode={this.toggleEditMode}
                                displayAttendees={this.displayAttendees}
                                onJoinEvent={this.props.onJoinEvent}/>
        );
    }
  }
}

export default EventCard;
