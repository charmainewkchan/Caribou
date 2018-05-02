import '../App.css';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import BigCalendar from "react-big-calendar";
import EventCal from './EventCal';
import moment from 'moment';
import PropTypes from 'prop-types';
import "react-big-calendar/lib/css/react-big-calendar.css";
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));



class Home extends Component {

  render() {
    return (
      <div className="Home">
        <div className="anim-fadein">
      	  <h2>Here to mix up the people you meet.</h2>
        </div>
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

      <h2> Official Club Events</h2>
      <EventCal/>
      </div>
    );
  }
}

export default Home;
