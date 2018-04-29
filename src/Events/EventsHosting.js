import React, { Component } from 'react';
import '../App.css';
import axios from 'axios'
import EventsList from './EventsList';

class EventsHosting extends Component {
  constructor(props) {
    super(props)

    this.state={
      eventsHosting: []
    };

    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData();
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
            <EventsList events={this.state.eventsHosting} updateData={this.updateData}/>
    );
  }
}

export default EventsHosting;
