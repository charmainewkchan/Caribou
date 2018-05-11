  import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import '../App.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import EventsCompactList from './EventsCompactList'

import axios from 'axios';

class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state={
      eventsHosting: [],
      eventsAttending: []
    }

    this.updateHosting = this.updateHosting.bind(this)
    this.updateAttending = this.updateAttending.bind(this)
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  updateData(){
    this.updateHosting();
    this.updateAttending();
  }

  updateHosting(){
    const netid = localStorage.getItem('netid');
    const url = "https://bixr.herokuapp.com/api/hosted_events/" + netid + "/";
    axios.post(url, []).then(res => {
      console.log(res.data);
      this.setState({
        eventsHosting: res.data,
      });
    })
    .catch(err=>{
      console.log(err);
      //window.location.replace("https://bixr.herokuapp.com/login/");
    });
  }

  updateAttending(){
    // reload the data
    const netid = localStorage.getItem('netid');
    const url = "https://bixr.herokuapp.com/api/get_events_for_user/" + netid + "/";
    axios.post(url, []).then(res => {
      console.log(res.data);

        this.setState({
          eventsAttending: res.data,
        });
    })
    .catch(err=>console.log(err));
  }

  showAlert() {
    alert('Hello World');
  }


  eventsPanel() {
    return (
          <div>
            <div className="row events-wrapper">
                <h2>Hosting</h2>
                <hr/>
                <EventsCompactList setEventPage={this.props.setEventPage} location={this.props.location} events={this.state.eventsHosting}/>

            </div>

            <div className="row events-wrapper">
                <h2>Attending</h2>
                <hr/>
               <EventsCompactList setEventPage={this.props.setEventPage} location={this.props.location} events={this.state.eventsAttending}/>

            </div>
        </div>)
  }

  eventsPanelMobile() {
    return (
      <div className="row d-md-none eventsPanel-mobile" >
        <div className="col-4 cursor-hover">
          <p onClick={()=>this.props.changeList("list")}>Events</p>
        </div>
        <div className="col-4 cursor-hover">
          <p onClick={()=>this.props.changeList("hosting")}>Hosting</p>
        </div>
        <div className="col-4 cursor-hover">
          <p onClick={()=>this.props.changeList("attending")}>Attending</p>
        </div>

      </div>
      )
  }


  render() {
    if (this.props.mobile){
        return this.eventsPanelMobile();
    } else {
        return this.eventsPanel();
    }
  }
}

export default SidePanel;


