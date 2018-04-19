import React, { Component } from 'react';
import eating_club_map from '../Events/eating_club_map.json';
import '../App.css';
import axios from 'axios'
import EventsPanel from '../Events/EventsPanel';

class EventsHosting extends Component {
  constructor(props) {
    super(props)
    this.state={
      eventsHosting: []
    };
  }

  componentDidMount() {
    const netid = localStorage.getItem('netid') + "/";
    const url = "https://bixr.herokuapp.com/api/get_events";

    axios.get(url
            ).then(res => {
      console.log(res.data);
      this.setState({
        eventsHosting: res.data
      });
    });
  }

  render() {
    return (
        <div>
          <h2>Events Hosting</h2>
          <EventsPanel events = {this.state.eventsHosting} onJoinEvent={null} isEditable= {true}/>
        </div>
    );
  }
}

export default EventsHosting;
