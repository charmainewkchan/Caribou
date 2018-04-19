import React, { Component } from 'react';
import '../App.css';
import axios from 'axios'
import EventsPanel from '../Events/EventsPanel';

class EventsHosting extends Component {
  constructor(props) {
    super(props)

    this.state={
      eventsHosting: []
    };

    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    updateData();
  }

  updateData(){
    // reload the data
    const netid = localStorage.getItem('netid');
    const url = "https://bixr.herokuapp.com/api/hosted_events/" + netid + "/";
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({
        eventsHosting: res.data,
      });
    })
    .catch(err=>alert(err));
  }

  render() {
    return (
        <div>
          <h2>Events Hosting</h2>
          <EventsPanel events={this.state.eventsHosting} updateData={this.updateData}/>
        </div>
    );
  }
}

export default EventsHosting;
