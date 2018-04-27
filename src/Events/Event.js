import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';

//import Event from './Event'
import eating_club_map from './eating_club_map.json';
import '../App.css';

class Event extends Component {

	constructor(props){
		super(props)

		this.buttons = this.buttons.bind(this)
	/*	this.getAllEventInfo = this.getAllEventInfo.bind(this)*/
	}


	owner_buttons() {
			return (
				<div className="owner-buttons">
						<button className="btn btn-outline-secondary owner-btn " onClick={() => this.props.displayAttendees(this.props.pk)}> @ </button>
						<button className="btn btn-outline-secondary owner-btn " onClick={() => this.props.toggleEditMode(this.props.toggleEditMode)}> * </button>
						<button className="btn btn-outline-secondary owner-btn" onClick={() => this.props.onRemoveEvent(this.props.pk)}> X </button>
				</div>
				);
	}

	buttons() {

		if (this.props.isAttending) {
			return <button className="btn btn-danger leave-button" onClick={() => this.props.onLeaveEvent(this.props.pk)}> Leave </button>
		} else {
			return <button disabled={this.props.attendance==this.props.capacity} className="btn btn-secondary join-button" onClick={() => this.props.onJoinEvent(this.props.pk)}> Join </button>
		}
	}

	/*getAllEventInfo(pk){
		this.props.history.push('/events/'+ pk);
	}*/

  render() {
    return (
    <div className="card Events-event" >
		 <Link to={'/events/'+this.props.pk + "/"}>
		 		<div className="card-header event-header Events-panel" disabled = {true}>
			 		<div className="row">
			 			<div className="col">
				  		<h2>{this.props.title}</h2>
				  	</div>
				  	{!!this.props.isOwner && 
				  		<div className="col">
				  		  {this.owner_buttons()}
				  	 </div>
				     }

				  </div>

				  <div className="row">
			    	<p>{eating_club_map[this.props.eating_club]} &bull; {this.props.start} - {this.props.end}</p>
			    </div>
				</div>
		 </Link>


	    <div className="card-body event-body">
	         <p>{this.props.description}</p>
	         <p>{this.props.attendance == 0 ? "Be the first to join!" : ""+this.props.attendance+"/"+this.props.capacity+" going!"}</p>
	    </div>

	    <div className="card-footer event-footer">
	    	{this.buttons()}
	    </div>
    </div>
    );
  }
}

//

export default Event;
