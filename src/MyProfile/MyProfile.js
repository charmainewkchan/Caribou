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

      <div className="MyProfile-width">
          <div className="MyProfile events-wrapper ">
          <Profile/>
          <br/>

          
          <Account/>
        </div>
      </div>
    );
  }
}

export default MyProfile;
