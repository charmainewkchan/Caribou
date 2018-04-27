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

    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }


    updateData(){
    // reload the data
    const netid = localStorage.getItem('netid');
    const url = "https://bixr.herokuapp.com/api/get_events_for_user/" + netid + "/";
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({
        eventsAttending: res.data,
      });
    })
    .catch(err=>alert(err));
  }


  render() {
    return (
        <div>
          <h2>Events Attending</h2>
          <hr/>
          <EventsPanel events={this.state.eventsAttending} updateData={this.updateData}/>
        </div>
    );
  }
}

export default EventsAttending;
