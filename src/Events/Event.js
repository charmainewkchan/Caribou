import React, { Component } from 'react';
//import { withRouter } from 'react-router';
import {Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';



//import Event from './Event'
import eating_club_map from './eating_club_map.json';
import '../App.css';

class Event extends Component {

	constructor(props){
		super(props)

		this.buttons = this.buttons.bind(this)
		this.descriptionString = this.descriptionString.bind(this)
	/*	this.getAllEventInfo = this.getAllEventInfo.bind(this)*/
	}

	componentDidMount(){
		console.log(this.props.loc)
	}

	owner_buttons() {
			return (
				<div className="owner-buttons">
						<button className="btn btn-outline-secondary owner-btn " onClick={(e) => this.props.displayAttendees(e,this.props.pk)}><FontAwesomeIcon icon="user" /></button>
						<button className="btn btn-outline-secondary owner-btn " onClick={(e) => {this.props.history.push('/events/manage/'+this.props.pk + "/"); e.stopPropagation();
}}><FontAwesomeIcon icon="pencil-alt" /></button>
				</div>
				);
	}

	buttons() {
		if (this.props.isAttending) {
			return <button className="btn btn-danger" onClick={() => this.props.onLeaveEvent(this.props.pk)}> Leave </button>
		} else {
			return <button disabled={this.props.attendance==this.props.capacity || this.props.isOwner} className="btn btn-primary" onClick={() => this.props.onJoinEvent(this.props.pk)}> Join </button>
		}
	}

	descriptionString() {
		var cutOff = 200;
		if (this.props.description.length > cutOff) {
				return this.props.description.substring(0, cutOff) + "...";
		}
		return this.props.description;
	}



  render() {

  	return(
    <div className="Events-event event-wrapper" >

		 <div onClick={()=> this.props.history.push('/events/'+this.props.pk + "/")}>
		 		<div className="event-header container-fluid" disabled = {true}>

		 			<div className="row">
		 				<div className="col-3 d-none d-md-block events-date">
		 					<h3>{moment(this.props.date, "YYYY-MM-DD").format('MMM')}</h3>
		 					<h4>{moment(this.props.date, "YYYY-MM-DD").format('D')}</h4>
		 				</div>

		 				<div className="col-9 events-content">
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

						  <div className="row"><div className="col">
					    	<p>{eating_club_map[this.props.eating_club]} &bull; {moment(this.props.date, "YYYY-MM-DD").format('MMM D')}, {this.props.start} - {this.props.end}</p>
					    	</div>
					    </div>

					    <div className="event-body">
					         <p>{this.descriptionString()}</p>
					         <p style={{fontStyle:'italic'}}>{"Location: "+ this.props.loc}</p>
					         <p>{this.props.attendance == 0 ? "Be the first to join!" : ""+this.props.attendance+"/"+this.props.capacity+" going!"}</p>
					    </div>

					    <div className="event-footer">
					    	{this.buttons()}
					    </div>
		 				</div>
		 			</div>
				</div>
		 </div>

    </div>
    );
  }
}

//

export default withRouter(Event);
