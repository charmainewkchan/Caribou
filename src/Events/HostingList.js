import React, { Component } from 'react';
import '../App.css';
import axios from 'axios'
import EventsCompactList from './EventsCompactList';
import { withRouter } from 'react-router-dom';
class HostingList extends Component {
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
          <EventsCompactList setEventPage={this.props.setEventPage} location={this.props.location} events={this.state.eventsHosting}/>
    );
  }
}

export default withRouter(HostingList);
//