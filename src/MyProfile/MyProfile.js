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


  render() {
    return (

      <div className="container events-wrapper MyProfile-width">
          <div className="MyProfile">
          <Profile/>
          <br/>

          
          <Account/>
        </div>
      </div>
    );
  }
}

export default MyProfile;
