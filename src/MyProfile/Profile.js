import React, { Component } from 'react';
import '../App.css';
import user_profile from './profile.json'
import EditableProfile from './EditableProfile'

import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      profile_info: {},
      edit_mode: false
    }
    this.updateData = this.updateData.bind(this);

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
    return (
      <EditableProfile first_name = {this.state.profile_info.first_name}
          last_name= {this.state.profile_info.last_name}
          year= {this.state.profile_info.year}
          res_college={this.state.profile_info.res_college}
          eating_club= {this.state.profile_info.eating_club}
          updateData = {this.updateData}
          toggle
      />
    );
  }
}

export default Profile;
