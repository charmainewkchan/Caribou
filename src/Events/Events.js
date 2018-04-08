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
  		data: {},
  	}
  }

  componentDidMount() {
    fetch('https://project-caribou.herokuapp.com/api/')
	.then(res=>{
		return res.json();
	}).then(res_data => {
		this.setState({
			data: res_data
		});
	})
  }



  render() {
    return (
      <div>
    	  <p>{this.state.data.test}</p>
	      <div className="Events row">

	        <div className= "col-3">
	        <EventsFilter />
	        </div>

	        <div className= "col-9">
            <div className= "container" style= {{background:'red'}}>
              <div className= "row">
                <AddEvent />
                </div>

                <div className= "row">
                <EventsPanel events = {events_data}/>
                </div>
            </div>
	        </div>

	      </div>
      </div>
    );
  }
}

export default Events;
