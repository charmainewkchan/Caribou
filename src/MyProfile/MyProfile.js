import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Profile from './Profile';
import Account from './Account';
import EventsAttending from './EventsAttending';
import EventsHosting from './EventsHosting';

import '../App.css';
class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile_info: {}
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row d-block d-md-none">
      	  <nav className="navbar navbar-light bg-light ">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#dashboard" aria-controls="dashboard" aria-expanded="false" aria-label="Toggle dashboard">
                  <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="dashboard">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item" ><NavLink to='/myprofile/profile' activeClassName='active-settings' >My Profile</NavLink></li>
                  <li className="nav-item"><NavLink to='/myprofile/account'  activeClassName='active-settings' >Account Settings</NavLink></li>
                  <li className="nav-item"><NavLink to='/myprofile/eventsattending'  activeClassName='active-settings'>Events Attending</NavLink></li>
                  <li className="nav-item"><NavLink to='/myprofile/eventshosting'  activeClassName='active-settings' >Events Hosting</NavLink></li>
                </ul>
            </div>
          </nav>

        </div>


        <div className="row">

      		<nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
        			<ul className="nav flex-column">
        				<li className="nav-item" ><NavLink to='/myprofile/profile' activeClassName='active-settings' >My Profile</NavLink></li>
        				<li className="nav-item"><NavLink to='/myprofile/account'  activeClassName='active-settings' >Account Settings</NavLink></li>
                <li className="nav-item"><NavLink to='/myprofile/eventsattending'  activeClassName='active-settings'>Events Attending</NavLink></li>
                <li className="nav-item"><NavLink to='/myprofile/eventshosting'  activeClassName='active-settings' >Events Hosting</NavLink></li>
            	</ul>
            </div>
      		</nav>


      		<div className="col-md-9 ml-sm-auto col-lg-10 ">
            <div className="MyProfile-panel">
              <Route exact path='/myprofile(|/profile)' component={Profile} />
              <Route path='/myprofile/account' component={Account}/>
              <Route path='/myprofile/eventsattending' component={EventsAttending}/>
              <Route path='/myprofile/eventshosting' component={EventsHosting}/>
            </div>
      		</div>


      	</div>
      </div>
    );
  }
}

export default MyProfile;
