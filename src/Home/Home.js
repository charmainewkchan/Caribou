import '../App.css';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Calendar from "react-big-calendar";
import EventCal from './EventCal';
import moment from 'moment';
import PropTypes from 'prop-types';
import "react-big-calendar/lib/css/react-big-calendar.css";
Calendar.setLocalizer(Calendar.momentLocalizer(moment));



class Home extends Component {

  render() {
    return (
      <div className="Home">
      	<h2>Welcome to Bixr!</h2>

        <div className="Home container">
          <div className = "homeButton row">

        		  <div className="col">
                 <Link to='/events' className = "btn btn-primary">Student Events</Link>
        	     </div>
               <div className="col-2" >
               </div>
               <div className="col">
                  <a href="#" className = "btn btn-primary">Official Club Events</a>
         	     </div>

          </div>
        </div>
        <p>Here to help you meet people.</p>
      <EventCal/>
      </div>
    );
  }
}

export default Home;
