import React, { Component } from 'react';
import '../App.css';
import user_profile from './profile.json'

import axios from 'axios';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      profile_info: {}
    }
  }

  componentDidMount() {
    const url = "https://bixr.herokuapp.com/api/user/" + localStorage.getItem('netid') + "/";
    axios.get(url)
    .then(res => {
        this.setState({
          profile_info: res.data[0].fields
        })
      })
    .catch(err => alert(err.response));
  }

  render() {
    return (
      <div>
        <h2>Profile Information</h2>
        <h3>Name: </h3><p>{this.state.profile_info.first_name} {this.state.profile_info.last_name}</p>
        <h3>Year: </h3><p>{this.state.profile_info.year}</p>
        <h3>College: </h3><p>{this.state.profile_info.res_college}</p>
        <h3>Eating Club: </h3><p>{this.state.profile_info.eating_club}</p>
      </div>
    );
  }
}

export default Profile;
