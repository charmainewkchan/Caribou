
import React, { Component } from 'react';
//import Event from './Event'
import eating_club_map from './eating_club_map.json';
import '../App.css';

class Event extends Component {


	buttons() {
		if (this.prop.isAttending) {
			return <button className="btn btn-danger join-button" onClick={() => this.props.onLeaveEvent(this.props.pk)}> Leave </button>
		} else {
			<button disabled={this.props.attendance==this.props.capacity} className="btn btn-secondary join-button" onClick={() => this.props.onJoinEvent(this.props.pk)}> Join </button>
		}
	}

  render() {
    return (
    <div className="card Events-event">
		 <div className="card-header event-header">
			  <h2>{this.props.title}</h2>
		    <p>{eating_club_map[this.props.eating_club]} &bull; {this.props.time}</p>
		 </div>

	    <div className="card-body event-body">
	         <p>{this.props.description}</p>
	         <p>{this.props.attendance == 0 ? "Be the first to join!" : ""+this.props.attendance+"/"+this.props.capacity+" going!"}</p>
	    </div>

	    <div className="card-footer event-footer">
	    	{this.butons()}
	    </div>
    </div>
    );
  }
}

//

export default Event;
