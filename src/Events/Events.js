import React, { Component } from 'react';
import EventsPanel from './EventsPanel';
import EventsFilter from './EventsFilter';
import AddEvent from './AddEvent.js';

//import events_data from './events.json';
import filter_data from './filters.json';
import eating_club_map from './eating_club_map.json';

import axios from 'axios'

import '../App.css';

class Events extends Component {
  constructor() {
  	super();
  	this.state = {
  		filter: {
  			clubs: filter_data.clubs
  		},
  		events: [],
      events_data: []
  	}


    this.onClubFilterChange = this.onClubFilterChange.bind(this);
    this.onCreateEvent = this.onCreateEvent.bind(this);
  }

  componentDidMount() {
    const url = "https://bixr.herokuapp.com/api/get_events";
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({
        events_data: res.data,
        events: res.data
      });
    });
  }

  filterEvents(){
    console.log(this.state.events_data);
	var filtered = this.state.events_data.filter(event => this.state.filter.clubs.includes(event.fields.eating_club));

	this.setState({
		events: filtered
	});
  }

  onClubFilterChange(event){
    console.log(event.target.name);

  	var mod = this.state.filter.clubs.slice();

  	if (event.target.checked) { // add to filter
  		if (mod.length == filter_data.clubs.length) // full
  			mod = [];
  		mod.push(event.target.name);
  	} else { // remove from filter
  		// if filter empty, filter should be full..?
  		mod.splice(mod.indexOf(event.target.name), 1)
  		if (mod.length == 0) {
  			mod = filter_data.clubs;
  		}
  	}

  	this.setState({
  		filter: {
  			clubs: mod
  		}
  	}, function() {this.filterEvents()});
  }

  onCreateEvent(event){
  	var new_event = 	{
		"title": "NewEvent",
		"desc": "Come check out this new event",
		"club": "Tower",
		"time": "2:00am",
		"capacity": "0/2"
	  }

  	var mod = this.state.events
  	mod.unshift(new_event)
  	this.setState({
  		events: mod
  	})
  }

  render() {
    return (
    	<div className="Events container">
	      <div className="row">
	        <div className= "col-3">
	        <EventsFilter onClubFilterChange={this.onClubFilterChange}/>
	        </div>

	        <div className= "col-9">
	           <div className= "container">
	              <div className= "row">
	                <AddEvent onCreateEvent={this.onCreateEvent}/>
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
