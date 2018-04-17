               
import React, { Component } from 'react';
//import Event from './Event'
import eating_club_map from './eating_club_map.json';
import '../App.css';

class Event extends Component {

  render() {
    return (
    	<div>
		 <div className="event-header">
			<h2>{this.props.title}</h2>
		    <p>{eating_club_map[this.props.eating_club]} &bull; {this.props.time}</p>
		 </div>
                
         <p>{this.props.description}</p>
         <p>{this.props.attendance == 0 ? "Be the first to join!" : ""+this.props.attendance+"/"+this.props.capacity+" going!"}</p>
         <button disabled={this.props.attendance==this.props.capacity} className="btn btn-secondary join-button" onClick={() => this.props.onJoinEvent(this.props.pk)}> Join </button>

    </div>
    );
  }
}

//        

export default Event;
