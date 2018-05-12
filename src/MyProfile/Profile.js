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
      edit_mode: false,
      doNotMail: false
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
    this.updateData()
  }

  updateData() {
       const url = "https://bixr.herokuapp.com/api/user/" + localStorage.getItem('netid') + "/";
    axios.get(url)
    .then(res => {
      console.log(res.data[0].fields)
        this.setState({
          profile_info: res.data[0].fields,
          doNotMail: res.data[0].fields.isDoNotMail
        })
      })
    .catch(err => console.log(err));
  }



  deleteAccount() {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios.get("https://bixr.herokuapp.com/api/delete_user")
      .then(res => {
        console.log(res)
      })
      .catch( err => {
        console.log(err)
        window.location.replace("https://fed.princeton.edu/cas/logout?service=https://bixr.herokuapp.com")
      })
    }
  }


  handleMailListChange(e){
      axios.get("https://bixr.herokuapp.com/api/toggle_mail/")
      .then(res => {
        console.log(res);
        this.setState({
          doNotMail: !this.state.doNotMail
        });
      })
      .catch( err => console.log(err))
  }



  render() {
        if (!this.state.edit_mode) {
    return (
      <div className="MyProfile">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossorigin="anonymous"/>

        <div className = 'row'>
          <div className = 'col-9'>
            <h2 className="profile-header">My Profile ({localStorage.getItem('netid')})</h2>

          </div>

          <div className = 'col-3'>
           <button className="btn btn-outline-secondary" onClick={this.toggleEditMode}><i class="fas fa-user-edit"></i></button>
          </div>
        </div>
        <hr/>

        <form>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label font-weight-bold">Name</label>
          <div className="col-sm-10">
            <input type="text" disabled={true} readonly className="form-control-plaintext" id="name" value={ this.state.profile_info.first_name +" " + this.state.profile_info.last_name}/>
           </div>
        </div>

        <div className="form-group row">
          <label htmlFor="year" className="col-sm-2 col-form-label font-weight-bold">Year</label>
          <div className="col-sm-10">
            <input type="text" disabled={true}  readonly className="form-control-plaintext" id="year" value={ this.state.profile_info.year }/>
           </div>
        </div>

        <div className="form-group row">
          <label htmlFor="res_college" className="col-sm-2 col-form-label font-weight-bold">College</label>
          <div className="col-sm-10">
            <input type="text" disabled={true}  readonly className="form-control-plaintext" id="res_college" value={rescollegeAbr[this.state.profile_info.res_college]}/>
           </div>
        </div>

          <div className="form-group row">
          <label htmlFor="eating_club" className="col-sm-2 col-form-label font-weight-bold">Eating Club</label>
          <div className="col-sm-10">
            <input type="text" disabled={true} readonly className="form-control-plaintext" id="eating_club" value={eatingClubAbr[this.state.profile_info.eating_club]}/>
           </div>
        </div>

        </form>


        <br/>
        <div className="mt-4">
          <h2 className="profile-header"> Account </h2>
          <hr/>


          <div className="form-check">
                <input className="form-check-input" type="checkbox" name="date_asc" id="date_asc" checked={!this.state.doNotMail} onChange={(e) => this.handleMailListChange(e)}/>
                <label className="form-check-label" for="date_asc">
                  Receive Emails
                </label>
           </div>
           <br/>


          <button className="btn" onClick={()=>this.deleteAccount()}> Delete Account </button>
         </div>

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
