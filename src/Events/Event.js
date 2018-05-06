import React, { Component } from 'react';
//import { withRouter } from 'react-router';
import {Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import JoinLeaveButton from '../JoinLeaveButton';



//import Event from './Event'
import eating_club_map from './eating_club_map.json';
import '../App.css';

class Event extends Component {

	constructor(props){
		super(props)

		this.state = {
			attendance: this.props.attendance
		}

		this.buttons = this.buttons.bind(this)
		this.descriptionString = this.descriptionString.bind(this)

		this.onJoin = this.onJoin.bind(this)
		this.onLeave = this.onLeave.bind(this)
	/*	this.getAllEventInfo = this.getAllEventInfo.bind(this)*/
	}

	componentDidMount(){
	}

	owner_buttons() {
			return (
				<div className="owner-buttons">
						<button className="btn btn-outline-secondary owner-btn " onClick={(e) => {this.props.history.push('/events/manage/'+this.props.pk + "/"); e.stopPropagation();
}}><FontAwesomeIcon icon="pencil-alt" /></button>
				</div>
				);
	}

	buttons() {
		if(!this.props.isOwner) {
			return <JoinLeaveButton pk={this.props.pk} disabled={this.props.attendance==this.props.capacity} join={this.onJoin} leave={this.onLeave} isAttending={this.props.isAttending}/>
		}
	}

	descriptionString() {
		var cutOff = 200;
		if (this.props.description.length > cutOff) {
				return this.props.description.substring(0, cutOff) + "...";
		}
		return this.props.description;
	}



  onJoin(pk){
    this.setState({
      attendance: this.state.attendance+1
    }, () => { this.props.onJoinEvent(pk)})
  }

  onLeave(pk) {
      this.setState({
        attendance: this.state.attendance-1
      }, () => this.props.onLeaveEvent(pk))
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

		 				<div className="col events-content">
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
					         <p>{this.state.attendance == 0 ? "Be the first to join!" : ""+this.state.attendance+"/"+this.props.capacity+" going!"}</p>
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
