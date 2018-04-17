               
import React, { Component } from 'react';
//import Event from './Event'
import '../App.css';

import Event from './Event'

class EventCard extends Component {

  render() {
    return  (
    	  <Event title={this.props.title} 
                            eating_club={this.props.eating_club} 
                            time={this.props.time} 
                            attendance={this.props.attendance} 
                            capacity={this.props.capacity} 
                            description={this.props.description}
                            pk={this.props.pk}
                            onJoinEvent={this.props.onJoinEvent}/>
    )
  }
}

export default EventCard;
