import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import axios from 'axios';

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

  /*componentDidMount() {
    const url = "https://bixr.herokuapp.com/api/user/" + localStorage.getItem('netid') + "/";
    axios.get(url) 
    .then(res => {
        this.setState({
          profile_info: res.data[0].fields
        })
      })
    .catch(err => alert(err.response));
  }*/



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
            <Route exact path='/myprofile(|/profile)' render={()=><Profile data={this.state.profile_info}/>} />
            <Route path='/myprofile/account' component={Account}/>
      		</div>
      	</div>
      </div>
    );
  }
}

export default MyProfile;
