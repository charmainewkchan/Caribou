
import React, { Component } from 'react';
//import Event from './Event'
import '../App.css';

import Event from './Event'
import EditableEvent from './EditableEvent'

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
                                isOwner={this.props.isOwner}
                                onLeaveEvent={this.props.onLeaveEvent}
                                toggleEditMode={this.toggleEditMode}
                                onJoinEvent={this.props.onJoinEvent}/>
        );
    }
  }
}

export default EventCard;
