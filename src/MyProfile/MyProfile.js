import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Profile from './Profile';
import Account from './Account';
import EventsAttending from './EventsAttending';
import EventsHosting from './EventsHosting';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import DropDownBar from '../DropDownBar'

import '../App.css';
class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile_info: {}
    }
  }

  settingsList() {
    return (
                <ul className="navbar-nav ml-sm-auto">
                  <li className="nav-item" ><NavLink to='/myprofile/profile' activeClassName='active-settings' ><FontAwesomeIcon icon="user" className="mr-3"/>My Profile</NavLink></li>
                  <li className="nav-item"><NavLink to='/myprofile/account'  activeClassName='active-settings' ><FontAwesomeIcon icon="cog" className="mr-3"/>Account Settings</NavLink></li>
                  <li className="nav-item"><NavLink to='/myprofile/eventsattending'  activeClassName='active-settings'><FontAwesomeIcon icon="calendar-art" className="mr-3" />Events Attending</NavLink></li>
                  <li className="nav-item"><NavLink to='/myprofile/eventshosting'  activeClassName='active-settings' ><FontAwesomeIcon icon="address-book" className="mr-3"/>Events Hosting</NavLink></li>
                </ul>
      )
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row d-block d-md-none">
      	  <DropDownBar id="dashboard">{this.settingsList()}</DropDownBar>
        </div>


        <div className="row">

      		<nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
        			<ul className="nav flex-column text-left pl-2">
   <li className="nav-item" ><NavLink to='/myprofile/profile' activeClassName='active-settings' ><FontAwesomeIcon icon="user" className="mr-3"/>My Profile</NavLink></li>
                  <li className="nav-item"><NavLink to='/myprofile/account'  activeClassName='active-settings' ><FontAwesomeIcon icon="cog" className="mr-3" />Account Settings</NavLink></li>
                  <li className="nav-item"><NavLink to='/myprofile/eventsattending'  activeClassName='active-settings'><FontAwesomeIcon icon="calendar-alt" className="mr-3"/>Events Attending</NavLink></li>
                  <li className="nav-item"><NavLink to='/myprofile/eventshosting'  activeClassName='active-settings' ><FontAwesomeIcon icon="address-book" className="mr-3"/>Events Hosting</NavLink></li>
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
