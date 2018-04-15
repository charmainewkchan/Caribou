import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';



import Profile from './Profile';
import Account from './Account';

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
      <div className="MyProfile container">
      	<div className="row">
      		<div className="col-3 MyProfile-settings">
      			<ul>
      				<li className="settings" ><NavLink to='/myprofile/profile' activeClassName='active-settings' style={{display:'block',height:'100%'}}>My Profile</NavLink></li>
      				<li className="settings"><NavLink to='/myprofile/account'  activeClassName='active-settings' style={{display:'block',height:'100%'}}>Account Settings</NavLink></li>
      			</ul>
      		</div>
      		<div className="col MyProfile-panel">
            <Route exact path='/myprofile(|/profile)' component={Profile} />
            <Route path='/myprofile/account' component={Account}/>
      		</div>
      	</div>
      </div>
    );
  }
}

export default MyProfile;
