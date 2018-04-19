
import React, { Component } from 'react';
//import Event from './Event'
import '../App.css';

import Event from './Event'
import EditableEvent from './EditableEvent'

class EventCard extends Component {

  render() {
    if (this.props.isEditable) {
        return (
              <EditableEvent title={this.props.title} 
                                eating_club={this.props.eating_club} 
                                time={this.props.time} 
                                attendance={this.props.attendance} 
                                capacity={this.props.capacity} 
                                description={this.props.description}
                                pk={this.props.pk}
                                onLeaveEvent={null}
                                onJoinEvent={this.props.onJoinEvent}/>

        )
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
                                onLeaveEvent={null}
                                onJoinEvent={this.props.onJoinEvent}/>
        )
    }
  }
}

export default EventCard;
