import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
        <p>Princeton can be a stressful place. Academics are one thing, but social life here can be stressful too, especially when it comes to bicker. Did you ever feel the need to impress someone? To make someone like you after one conversation? Did that stress you out? Bicker is meant to help people get to know each other, but a 10 minute conversation or game won’t really help you do that.
              Our solution is Bixer, a platform for members of eating clubs to advertise their availability to hang out with underclassmen throughout the year so that when the time comes to bicker, those involved will have had the opportunity to get to know each other in a more laid-back context. Through a system of event postings and email notifications, Bixer will make it simple for users will to connect over activities like pool or eating a meal.
              It helps you meet people before the intense 3 days of Bicker so that you can get to know people in a more realistic setting. Bridger will also serve to consolidate all Eating Club event information on to one convenient page. Never miss a free sophomore meal again!
                </p>
      </div>
    );
  }
}

export default Home;
