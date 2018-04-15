import React, { Component } from 'react';
import '../App.css';
import user_profile from './profile.json'

class Profile extends Component {
  render() {
    return (
      <div>
        <h2>Profile Information</h2> 
        <h3>Name: </h3><p>{this.props.first_name} {this.props.last_name}</p>
        <h3>Year: </h3><p>{this.props.year}</p>
        <h3>College: </h3><p>{this.props.res_college}</p>
        <h3>Eating Club: </h3><p>{this.props.eating_club}</p>
      </div>
    );
  }
}

export default Profile;
