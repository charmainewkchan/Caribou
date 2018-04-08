import React, { Component } from 'react';
import EventsPanel from './EventsPanel';
import EventsFilter from './EventsFilter';
import AddEvent from './AddEvent.js';
import events_data from './events.json';

import '../App.css';

class Events extends Component {
  constructor() {
  	super();
  	this.state = {
  		filter: {
  			location: ['Colonial', 'Tower']
  		},
  		events: []
  	}
  }

  componentDidMount() {
    fetch('https://project-caribou.herokuapp.com/api/')
	.then(res=>{
		return res.json();
	}).then(res_data => {

		// location filter
		var filtered = events_data.filter(event => this.state.filter['location'].includes(event.location));

		this.setState({
			events: filtered
		});
	})
  }

  onLocationFilterChange(event){
  	alert("here");
  }

  render() {
    return (
      <div>
	      <div className="Events row">

	        <div className= "col-3">
	        <EventsFilter onLocationFilterChange={this.onLocationFilterChange}/>
	        </div>

	        <div className= "col-9">
	            <div className= "container">
	              <div className= "row">
	                <AddEvent />
	                </div>

	                <div className= "row">
	                <EventsPanel events = {this.state.events}/>
	                </div>
	            </div>
	        </div>

	      </div>
      </div>
    );
  }
}

export default Events;
