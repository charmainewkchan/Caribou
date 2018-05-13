import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import res_college_map from './res_college_map.json'
import EventsCompactList from './Events/EventsCompactList'

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

class User extends Component {

	constructor(){
		super()
    this.state = {
      fields: {},
      events: []
    }

    this.setEventPage = this.setEventPage.bind(this);
	}


  componentDidMount(){
    // reload the data
		const netid = this.props.match.params.netid;
    const url = "https://bixr.herokuapp.com/api/user/" + netid + "/";
		console.log(url);

		axios.get(url).then(res => {
      console.log(res.data);
      this.setState({
        fields: res.data[0].fields
      });

      var get_events_url = "https://bixr.herokuapp.com/api/hosted_events/" + res.data[0].fields.netid + "/"

      axios.post(get_events_url, [])
      .then(res => {
        console.log(res.data);
        this.setState({
          events: res.data
        })
      })
      .catch(err=>console.log(err))

    });


  }


  setEventPage(pk) {
    this.props.history.push('/events/'+pk + "/");
  }


  render() {
    return (
      <div className="user-page">
        <div className="container">
        <div className="user-page-header">
          <h2>{this.state.fields.first_name} {this.state.fields.last_name}</h2>

        </div>

    	  <div className="user-page-body">
          <p>Class of {this.state.fields.year}</p>
					<p>Eating Club: {eatingClubAbr[this.state.fields.eating_club]}</p>
          <p>{res_college_map[this.state.fields.res_college]}</p>
          <a href={"https://tigerbook.herokuapp.com/student/"+this.state.fields.netid} target="_blank">TigerBook</a>

          <hr/>
          <h3>Events {this.state.fields.first_name} is Hosting</h3>
          <div className="user-page-events">
          <EventsCompactList setEventPage={this.setEventPage} events={this.state.events} />
          </div>
        </div>
      </div>
      </div>

    )
  }
}

export default User;
