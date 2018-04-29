
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
    };

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
        return  (
        	  <Event title={this.props.title}
                                eating_club={this.props.eating_club}
                                time={this.props.time}
                                attendance={this.props.attendance}
                                capacity={this.props.capacity}
                                description={this.props.description}
                                loc={this.props.location}
                                date={this.props.date}
                                pk={this.props.pk}
                                start = {this.props.start}
                                end = {this.props.end}

                                isAttending={this.props.isAttending}
                                isOwner={this.props.isOwner}

                                onRemoveEvent={this.props.onRemoveEvent}
                                onLeaveEvent={this.props.onLeaveEvent}

                                displayAttendees={this.displayAttendees}
                                onJoinEvent={this.props.onJoinEvent}/>
        );
    }
}

export default EventCard;
