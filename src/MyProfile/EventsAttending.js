import React, { Component } from 'react';
import eating_club_map from '../Events/eating_club_map.json';
import '../App.css';
import axios from 'axios'
import EventsPanel from '../Events/EventsPanel';

class EventsAttending extends Component {
  constructor(props) {
    super(props)
    this.state={
      eventsAttending: []
    };

    /*this.handleDelete = this.handleDelete.bind(this);*/
  }

  componentDidMount() {
    const netid = localStorage.getItem('netid') + "/";
    const url = "https://bixr.herokuapp.com/api/get_events";

    axios.get(url
            ).then(res => {
      console.log(res.data);
      this.setState({
        eventsAttending: res.data
      });
    });
  }



  render() {
    return (
        <div>
          <h2>Events Attending</h2>
          <EventsPanel events = {this.state.eventsAttending} onJoinEvent={null}/>
        </div>
    );
  }
}

export default EventsAttending;