import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import Profile from './Profile';
import Account from './Account'

import '../App.css';
class MyProfile extends Component {
  render() {
    return (
      <div className="MyProfile container">
      	<div className="row">
      		<div className="col-3">
      			<ul className="MyProfile-settings">
      				<li><Link to='/myprofile/profile'>My Profile</Link></li>
      				<li><Link to='/myprofile/account'>Account Settings</Link></li>
      			</ul>
      		</div>
      		<div className="col">
            <p>Corresponding settings panel would go here</p>
            <Route exact path='/myprofile(|/profile)' component={Profile}/>  
            <Route path='/myprofile/account' component={Account}/>
      		</div>
      	</div>
      </div>
    );
  }
}

export default MyProfile;
