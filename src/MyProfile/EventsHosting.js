import React, { Component } from 'react';
import '../App.css';

import axios from 'axios';

class EventsHosting extends Component {
	constructor(){
		super();

		this.state = {
			events : {}
		}
	}

	componentDidMount() {

	}


  render() {
    return (
      <div>
    	<h2>My Events</h2>
      </div>
    );
  }
}

export default EventsHosting;
