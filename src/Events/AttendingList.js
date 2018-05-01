import React, { Component } from 'react';
import '../App.css';
import axios from 'axios'
import EventsCompactList from './EventsCompactList';

class AttendingList extends Component {
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
       <EventsCompactList events={this.state.eventsAttending}/>
    );
  }
}

export default AttendingList;
//