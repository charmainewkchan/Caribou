import React, { Component } from 'react';
import '../App.css';
import user_profile from './profile.json'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import axios from 'axios';

const years = [2019,2020,2021,2022];

class EditableProfile extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      year: this.props.year,
      res_college:this.props.res_college,
      eating_club: this.props.eating_club,
      edit_mode:this.props.edit_mode
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSelectYear = this.onSelectYear.bind(this);
    this.onSelectEatingClub = this.onSelectEatingClub.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  onSelectYear(event) {

  }

  onSelectEatingClub(event) {

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
        <div className = 'row'>
            <h2>My Profile</h2>
        </div>

        <h3>First name: </h3>
        <input className = "form-control" type = "text" id = "first_name" name = "first_name" placeholder = "" value = {this.state.first_name} onChange = {this.handleChange}/>
        <h3>Last name: </h3>
        <input className = "form-control" type = "text" id = "last name" name = "last_name" placeholder = "" value = {this.state.last_name} onChange = {this.handleChange}/>

        <div>
        <h3>Year: </h3>
        <Dropdown options = {years} label = "years" onChange = {this.onSelectYear} value = {this.state.year}/>
        </div>

        <h3>College: </h3><p>{this.state.res_college}</p>
        <h3>Eating Club: </h3><p>{this.state.eating_club}</p>
        <button onClick={this.props.toggleEditMode}> Save</button>
      </div>
    );
  }
}

export default EditableProfile;
