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
            <h2 className="profile-header">My Profile</h2>

          </div>

          <div className = 'col-6'>
            <button onClick={this.toggleEditMode}> Edit Profile </button>
          </div>
        </div>
        <hr/>

        <form>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label font-weight-bold">Name</label>
          <div className="col-sm-10">
            <input type="text" readonly className="form-control-plaintext" id="name" value={ this.state.profile_info.first_name +" " + this.state.profile_info.last_name}/>
           </div>
        </div>

        <div className="form-group row">
          <label htmlFor="year" className="col-sm-2 col-form-label font-weight-bold">Year</label>
          <div className="col-sm-10">
            <input type="text" readonly className="form-control-plaintext" id="year" value={ this.state.profile_info.year }/>
           </div>
        </div>

        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bold">College</label>
          <div className="col-sm-10">
            <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={rescollegeAbr[this.state.profile_info.res_college]}/>
           </div>
        </div>

                <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bold">Eating Club</label>
          <div className="col-sm-10">
            <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={eatingClubAbr[this.state.profile_info.eating_club]}/>
           </div>
        </div>

        </form>

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
