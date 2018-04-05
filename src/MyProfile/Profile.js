import React, { Component } from 'react';
import '../App.css';
import user_profile from './profile.json'

class Profile extends Component {
  render() {
    return (
      <div>
        <h2>Profile Settings</h2> 
        <h3>Name: </h3><p>{user_profile.name}</p>
        <h3>Year: </h3><p>{user_profile.year}</p>
        <h3>College: </h3><p>{user_profile.college}</p>
        <h3>Description: </h3><p>{user_profile.desc}</p>
      </div>
    );
  }
}

export default Profile;
