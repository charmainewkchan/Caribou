import React, { Component } from 'react';
//import { withRouter } from 'react-router';
import {Link, withRouter } from 'react-router-dom';
import moment from 'moment';


//import Event from './Event'
import eating_club_map from './eating_club_map.json';
import '../App.css';

class EventCompact extends Component {

	constructor(props){
		super(props)
	/*	this.getAllEventInfo = this.getAllEventInfo.bind(this)*/
	}

	componentDidMount(){
	}

  render() {

  	return(
    <div onClick={()=> this.props.setEventPage(this.props.pk)} className="event-compact" >
    	<div className="row">
	    	<div className="compact-date col-3">
	    		<h1>{moment(this.props.date, 'YYYY-MM-DD').format('MMM D')}</h1>
	    		<h2>{moment((this.props.date + " " + this.props.start), 'YYYY-MM-DD HH:mm').format('hA')}</h2>
	    	</div>
	    	<div className="col-9">
		    	<p className="capitalize">{this.props.title}</p>
		    	<p style={{color:'#777'}}>{this.props.loc}</p>
	    	</div>
	    </div>
    </div>
    );
  }
}

//

export default withRouter(EventCompact);
