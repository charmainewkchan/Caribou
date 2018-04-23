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
      <div className="MyProfile container-fluid">
      	<div className="row">
      		<div className="col-3 MyProfile-settings">
      			<ul>
      				<li className="settings" ><NavLink to='/myprofile/profile' activeClassName='active-settings' style={{display:'block',height:'100%'}}>My Profile</NavLink></li>
      				<li className="settings"><NavLink to='/myprofile/account'  activeClassName='active-settings' style={{display:'block',height:'100%'}}>Account Settings</NavLink></li>
              <li className="settings"><NavLink to='/myprofile/eventsattending'  activeClassName='active-settings' style={{display:'block',height:'100%'}}>Events Attending</NavLink></li>
              <li className="settings"><NavLink to='/myprofile/eventshosting'  activeClassName='active-settings' style={{display:'block',height:'100%'}}>Events Hosting</NavLink></li>
          	</ul>
      		</div>
      		<div className="col-9 MyProfile-panel">
            <Route exact path='/myprofile(|/profile)' component={Profile} />
            <Route path='/myprofile/account' component={Account}/>
            <Route path='/myprofile/eventsattending' component={EventsAttending}/>
            <Route path='/myprofile/eventshosting' component={EventsHosting}/>
      		</div>
      	</div>
      </div>
    );
  }
}

export default MyProfile;
