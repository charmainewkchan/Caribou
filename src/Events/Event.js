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


	buttons() {
		if (this.props.isOwner) {
			return (
				<div className="row">
					<div className="col">
						<button className="btn btn-outline-secondary owner-btn " style={{margin:''}}onClick={() => this.props.displayAttendees(this.props.pk)}> @ </button>
					</div>
					<div className="col">
						<button className="btn btn-outline-secondary owner-btn " onClick={() => this.props.toggleEditMode(this.props.toggleEditMode)}> * </button>
					</div>
					<div className="col">
						<button className="btn btn-outline-secondary owner-btn" onClick={() => this.props.onRemoveEvent(this.props.pk)}> X </button>
					</div>
				</div>
				);
		}
		else if (this.props.isAttending) {
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
		<Link to={'/events/'+this.props.pk + "/"} className="navbar-brand">
		 <div className="card-header event-header">
			  <h2>{this.props.title}</h2>
		    <p>{eating_club_map[this.props.eating_club]} &bull; {this.props.time}</p>
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
