import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import EventCal from './EventCal'

import '../App.css';


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
        <EventCal />
      </div>
    );
  }
}

export default Home;
