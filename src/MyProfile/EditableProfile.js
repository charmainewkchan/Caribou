import React, { Component } from 'react';
import '../App.css';
import user_profile from './profile.json'
import Dropdown from 'react-dropdown'
import eating_club_map from '../Events/eating_club_map.json';
import 'react-dropdown/style.css'
import axios from 'axios';

const years = [2019,2020,2021,2022];
const eatingclubs = ["Cloister","Tower","None","Colonial","Cannon","Cap","Ivy","TigerInn","Quad","Terrace","Cottage","Charter"]
const rescollege = ["Butler", "Wilson", "Mathey", "Rocky", "Whitman","Forbes"]

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

var eatingClubAbrReverse = {
  "Cloister": 'CL',
  "Tower":'TO',
  "None":'NN',
  "Colonial":'CO',
  "Cannon":'CN',
  "Cap":'CA',
  "Ivy":'IV',
  "TigerInn":'TI',
  "Quad":'QD',
  "Terrace":'TE',
  "Cottage":'CT',
  "Charter":'CH'
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

var rescollegeAbrReverse = {
  "None" : 'NN',
	"Mathey" : 'MA',
	"Rocky" : 'RO',
	"Butler" : 'BU',
	"Wilson" : 'WI',
	"Whitman" : 'WH',
	"Forbes" : 'FO'
}



class EditableProfile extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      year: this.props.year,
      res_college: rescollegeAbr[this.props.res_college],
      eating_club: eatingClubAbr[this.props.eating_club],
      edit_mode:this.props.edit_mode,
      toggleEditMode: this.props.toggleEditMode,
      updateDate: this.props.updateData


    }

    this.handleChange = this.handleChange.bind(this);
    this.onSelectYear = this.onSelectYear.bind(this);
    this.onSelectEatingClub = this.onSelectEatingClub.bind(this);
    this.onSelectResCollege = this.onSelectResCollege.bind(this);
    this.save = this.save.bind(this);
  }

  save(event) {

    if(!this.state.first_name) {
      alert('Please enter your first name.')
    }
    else if(!this.state.last_name) {
      alert('Please enter you last name.')
    }
    else if (!this.state.year) {
      alert('Please enter your year.')
    }
    else if (!this.state.res_college){
      alert('Please enter your residential college.')

    }
    else if (!this.state.eating_club) {
      alert('Please enter your eating club.')
    } else {
      //* post data to url *//
      var data = [{
      "first_name": this.state.first_name,
      "last_name": this.state.last_name,
      "year": this.state.year,
      "res_college":rescollegeAbrReverse[this.state.res_college],
      "eating_club": eatingClubAbrReverse[this.state.eating_club]}]


      console.log(data)
      axios.post('https://bixr.herokuapp.com/api/post_user', data)
      .then(res => {
          console.log(res);
          console.log(res.data);
        })
      .catch(err => alert(err));

      this.props.updateData();
      this.props.toggleEditMode();
    }
  }

  componentDidMount(){
       const url = "https://bixr.herokuapp.com/api/user/" + localStorage.getItem('netid') + "/";
    axios.get(url)
    .then(res => {
      console.log(res.data[0].fields)
        this.setState({
           "first_name": res.data[0].fields.first_name,
            "last_name": res.data[0].fields.last_name,
            "year": res.data[0].fields.year,
            "res_college":rescollegeAbrReverse[res.data[0].fields.res_college],
            "eating_club": eatingClubAbrReverse[res.data[0].fields.eating_club]
        })
      })
    .catch(err => alert(err.response));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  onSelectYear(event) {
      year: event.value
  }

  onSelectEatingClub(event) {
    this.setState({
      eating_club: event.value
    });
  }

  onSelectResCollege(event){
    this.setState({
      res_college: event.value
    });
  }

  render() {
    return (
      <div className="EditableProfile">
            <h2>Profile Details</h2>
            <hr/>


        <h3>First name: </h3>
        <input className = "form-control" type = "text" id = "first_name" name = "first_name" value = {this.state.first_name} onChange = {this.handleChange}/>
        <h3>Last name: </h3>
        <input className = "form-control" type = "text" id = "last name" name = "last_name"  value = {this.state.last_name} onChange = {this.handleChange}/>

        <div>
        <h3>Year: </h3>
        <Dropdown options = {years} label = "years" onChange = {this.onSelectYear} value = {this.state.year}/>
        </div>

        <h3>College: </h3>
        <Dropdown options = {rescollege} label = "rescollege" name = "res_college" onChange = {this.onSelectResCollege} value = {this.state.res_college} defaultValue = {this.state.res_college}/>

        <h3>Eating Club: </h3>
          <Dropdown options = {eatingclubs} label = "eatingclubs" onChange = {this.onSelectEatingClub} value = {this.state.eating_club} defaultValue = {this.state.eating_club}/>
        <button className="btn btn-success mt-2" onClick={this.save}> Save</button>
      </div>
    );
  }
}

export default EditableProfile;
