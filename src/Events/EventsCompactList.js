import React, { Component } from 'react';
import eating_club_map from './eating_club_map.json';

import axios from 'axios';
import { withRouter } from 'react-router-dom';
import EventCompact from './EventCompact';

import '../App.css';

class EventsCompactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.contents = this.contents.bind(this);

  }

  contents() {
  	 if (Object.keys(this.props.events).length == 0) {
            return (
            	<p style={{fontStyle:'italic', fontSize:'.8em', padding:'0',fontFamily:'roboto'}}>No events to display</p>
            	)
           } else {
           	return (
            this.props.events.map(function(event){
              return (
                  <EventCompact title={event.fields.title}
                              description={event.fields.description}
                              loc={event.fields.location}
                              pk={event.pk}
                              start={event.fields.start}
                              location={this.props.location}
                              setEventPage={this.props.setEventPage}
                              date={event.fields.date}/>);
              },this)
            )
        	 
        }
     }


  render() {
    return (
           <div className="event-compact-list">
     			{this.contents()}
          </div>
          )
    }
}

export default withRouter(EventsCompactList);
