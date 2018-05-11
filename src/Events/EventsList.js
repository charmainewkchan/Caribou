import React, { Component } from 'react';
import Event from './Event'
import eating_club_map from './eating_club_map.json';
import moment from 'moment';

import axios from 'axios';
import EventCard from './EventCard';

import Pagination from '../Pagination';

import {withRouter } from 'react-router-dom';

import '../App.css';

class EventsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events : this.props.events,
    };

    console.log("***");
    console.log(this.props.events);

    this.onJoinEvent = this.onJoinEvent.bind(this);
    this.onLeaveEvent = this.onLeaveEvent.bind(this);
    this.onPostEvent = this.onPostEvent.bind(this);
  }

  componentDidMount() {
    console.log("events list mounted");
    //this.props.updateData();
  }

  onJoinEvent(event_id, eventref) {
    var data = [{
      event: event_id,
    }]
    axios.post("https://bixr.herokuapp.com/api/join_event/",  data)
    .then(res => this.props.updateData())
    .catch(err => {
          if(err.response.status == 401) {
            // redirect

            eventref.setAttendance(false);

            if(window.confirm("You must complete your profile before joining an event. Press OK to go to Profile page.")) {
              this.props.history.push('/myprofile/');
            }
          }
    });

  }

  displayAttendees(event, event_pk) {
    event.stopPropagation();
    console.log(event);
    const url = "https://bixr.herokuapp.com/api/get_users_for_event/" + event_pk + "/";
    axios.get(url).then(res => {
        var netids = res.data.map(user => user.fields.netid);
        alert(netids);
    })
    .catch(err => alert("err:" + err))
  }

    onPostEvent(event) {
      console.log(event)
      axios.post('https://bixr.herokuapp.com/api/post_event', event)
      .then(res => {
          //console.log(res);
          //console.log(res.data);

          this.props.updateData()
        })
        .catch(err => {
              if(err.response.status == 401) {
                // redirect
                if(window.confirm("You must complete your profile before joining an event. Press OK to go to Profile page.")) {
                  this.props.history.push('/myprofile/');
                }
              }
        });
    }


  onLeaveEvent(event_id, eventref) {
    var data = [{
      event: event_id,
    }]
    //alert(JSON.stringify(data));

      axios.post("https://bixr.herokuapp.com/api/unjoin_event/",  data)
      .then(res => this.props.updateData())
      .catch(err => alert(err));

  }

  render() {
     if (Object.keys(this.props.events).length == 0) {
            return (
              <p style={{fontStyle:'italic', fontSize:'.8em', padding:'0',fontFamily:'roboto'}}>No events to display</p>
              )
     } else {
      return (
            <div className="events-list">
             <div className="container-fluid">
              {this.state.events.map(function(event){
                  return (

                    <div key={event.pk} className="row event-row-buffer">
                      <Event title={event.fields.title}
                                  eating_club={event.fields.eating_club}
                                  time={event.fields.time}
                                  attendance={event.fields.attendance}
                                  capacity={event.fields.capacity}
                                  description={event.fields.description}
                                  location={event.fields.location}
                                  pk={event.pk}

                                  start={event.fields.start}
                                  end={event.fields.end}
                                  date={event.fields.date}
                                  isAttending={event.isAttending}
                                  isOwner={event.isOwner}
                                  onJoinEvent={this.onJoinEvent}
                                  onPostEvent={this.onPostEvent}
                                  onLeaveEvent={this.onLeaveEvent}
                                  isEditable={this.props.isEditable}/>
                    </div>);
                },this)
              }
              </div>
              <Pagination changePage={this.props.changePage} currentPage={this.props.currentPage} numPages={this.props.numPages}/>
            </div>
            )
        }
      }
}

export default withRouter(EventsPanel);
