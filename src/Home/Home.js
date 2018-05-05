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
        <div className="container-fluid">
          <div className="row splash">
            <div className="col">
              <div className="anim-fadein">
                <h2>Here to mix up the people you meet.</h2>
              </div>
              <div className = "row ">
                     <Link to='/events' className = "btn splash-btn btn-outline-light">Student Events</Link>
            	 </div>
               <p> Make events, join events, and get to know other Tigers! </p>
             </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
