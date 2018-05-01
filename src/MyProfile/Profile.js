import React, { Component } from 'react';
import '../App.css';
import user_profile from './profile.json'
import EditableProfile from './EditableProfile'

import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

var eatingClubAbr = {
  "CL":"Cloister",
  "TO":"Tower",
  "NN":"None",
  "CO":"Colonial",
  "CN":"Cannon",
  "CA":"Cap",
  "IV":"Ivy",
  "TI":"TigerInn",
  "QD":"Quad",
  "TE":"Terrace",
  "CT":"Cottage",
  "CH":"Charter"
}

var rescollegeAbr = {
  'NN' : "None",
  'MA' : "Mathey",
  'RO' : "Rocky",
  'BU' : "Butler",
  'WI' : "Wilson",
  'WH' : "Whitman",
  'FO' : "Forbes"
}

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      profile_info: {},
      edit_mode: false
    }
    this.updateData = this.updateData.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

 toggleEditMode() {
      this.setState({
        edit_mode: !this.state.edit_mode
      });
    }

  componentDidMount() {
       const url = "https://bixr.herokuapp.com/api/user/" + localStorage.getItem('netid') + "/";
    axios.get(url)
    .then(res => {
      console.log(res.data[0].fields)
        this.setState({
          profile_info: res.data[0].fields
        })
      })
    .catch(err => alert(err.response));
  }

  updateData() {
    const url = "https://bixr.herokuapp.com/api/user/" + localStorage.getItem('netid') + "/";
    axios.get(url)
    .then(res => {
      console.log(res.data[0].fields)
        this.setState({
          profile_info: res.data[0].fields
        })
      })
    .catch(err => alert(err.response));
  }



  render() {
        if (!this.state.edit_mode) {
    return (
      <div>
        <div className = 'row'>
          <div className = 'col-6'>
            <h2>My Profile</h2>
          </div>

          <div className = 'col-6'>
            <button onClick={this.toggleEditMode}> Edit Profile </button>
          </div>
        </div>
        <h3>Name: </h3><p>{this.state.profile_info.first_name} {this.state.profile_info.last_name}</p>
        <h3>Year: </h3><p>{this.state.profile_info.year}</p>
        <h3>College: </h3><p>{rescollegeAbr[this.state.profile_info.res_college]}</p>
        <h3>Eating Club: </h3><p>{eatingClubAbr[this.state.profile_info.eating_club]}</p>
      </div>
    );
  } else {
    return (
      <EditableProfile first_name = {this.state.profile_info.first_name}
          last_name= {this.state.profile_info.last_name}
          year= {this.state.profile_info.year}
          res_college={this.state.profile_info.res_college}
          eating_club= {this.state.profile_info.eating_club}
          updateData = {this.updateData}
          toggleEditMode = {this.toggleEditMode}
      />
    );
  }
  }
}

export default Profile;
