import React, { Component } from 'react';
import EventsPanel from './EventsPanel';
import EventsFilter from './EventsFilter';
import AddEvent from './AddEvent.js';

//import events_data from './events.json';
import filter_data from './filters.json';
import eating_club_map from './eating_club_map.json';
import EventCard from './EventCard';
import EditableEvent from './EditableEvent';

import DropDownBar from '../DropDownBar';

import axios from 'axios'

import '../App.css';

class Events extends Component {
  constructor() {
  	super();
  	this.state = {
  		filter: {
  			clubs: filter_data.clubs
  		},
  		events: [],
      events_data: [],
      showNewCard: false
  	}
    this.onClubFilterChange = this.onClubFilterChange.bind(this);

    this.onPostEvent = this.onPostEvent.bind(this);
    this.onHostEvent = this.onHostEvent.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }


  onPostEvent(event){
    console.log(event)
    axios.post('https://bixr.herokuapp.com/api/post_event', event)
    .then(res => {
        //console.log(res);
        //console.log(res.data);
        this.updateData();
      })
    .catch(err => alert(err));
  }


  filterEvents(){
  console.log(this.state.events_data);
	var filtered = this.state.events_data.filter(event => this.state.filter.clubs.includes(event.fields.eating_club));

  console.log(filtered);
  filtered.sort(function(a,b) {
     var a_item = a.pk
     var b_item = b.pk

     if (a_item > b_item)
      return -1;
     if (a_item < b_item)
      return 1;
     return 0;
  })
  console.log(filtered);

	this.setState({
		events: filtered
	});
  }

  onClubFilterChange(event){
    /* mod = new clubs in filter, deep copy */
  	var mod = this.state.filter.clubs.slice();

  	if (event.target.checked) { // add to filter
  		if (mod.length == filter_data.clubs.length) // full
  			mod = [];
  		mod.push(event.target.name);
  	} else { // remove from filter
  		// if filter empty, filter should be full..?
  		mod.splice(mod.indexOf(event.target.name), 1)
  		if (mod.length == 0) {
  			mod = filter_data.clubs;
  		}
  	}

  	this.setState({
  		filter: {
  			clubs: mod
  		}
  	}, function() {this.filterEvents()});
  }



  updateData(){
    // reload the data
    const url = "https://bixr.herokuapp.com/api/get_events";
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({
        events_data: res.data,
      }, function() {this.filterEvents()});
    });
  }

  onHostEvent() {
    this.setState({
      showNewCard: true
    })
  }


   //<AddEvent onCreateEvent={this.onCreateEvent}/>

  newCard() {
    if (this.state.showNewCard) {
      return (
                    <EditableEvent title=""
                              eating_club="Eating Club"
                              time=""
                              attendance="0"
                              capacity=""
                              description=""
                              pk=""
                              start=""
                              end=""
                              newCard = {true}
                              onDataChange={this.onDataChange}
                              onPostEvent={this.onPostEvent}
                              toggleEditMode={(e)=>console.log(e)}
                              isEditable={true}/>
      );
    } else {
      return (
        <button onClick={this.onHostEvent} className="host-btn btn Events-event">Host an Event!</button>
        );
    }
  }

  render() {
    return (
    	<div className="Events container-fluid">

        <div className="row d-block d-md-none">
          <DropDownBar id="filter"><EventsFilter onClubFilterChange={this.onClubFilterChange}/></DropDownBar>
        </div>

	      <div className="row">
	        <div className= "col-3 d-none d-md-block">
	         <EventsFilter onClubFilterChange={this.onClubFilterChange}/>
	        </div>

	        <div className= "col-md-9">
	           <div className= "container">
	              <div className= "row">
                  <div className="col-md-6 event-row-buffer">
                    {this.newCard()}
                  </div>

  	               <EventsPanel events={this.state.events} updateData={this.updateData}/>

                </div>
	            </div>
	        </div>
	      </div>
	    </div>
    );
  }
}

export default Events;
