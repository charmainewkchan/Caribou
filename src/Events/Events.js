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
      showNewCard: false,
      sort: {
        ascending: true,
        field: "date"
      }
  	}
    this.onClubFilterChange = this.onClubFilterChange.bind(this);

    this.onPostEvent = this.onPostEvent.bind(this);
    this.onHostEvent = this.onHostEvent.bind(this);
    this.updateData = this.updateData.bind(this);
    this.setSort = this.setSort.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
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
        this.setState({
          showNewCard: false
        })
      })
    .catch(err => alert(err));
  }


  filterEvents(){
    console.log(this.state.events_data);
  	var filtered = this.state.events_data.filter(event => this.state.filter.clubs.includes(event.fields.eating_club));

    console.log(filtered);
    filtered.sort(function(a,b) {
       var a_item = a.fields[this.state.sort.field]
       var b_item = b.fields[this.state.sort.field]

       if (a_item > b_item)
        return this.state.sort.ascending ? 1 : -1;
       if (a_item < b_item)
        return this.state.sort.ascending? -1 : 1;
       return 0;
    }.bind(this))
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
      console.log(mod.length)
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

  setSort(ascending, field) {
    console.log("SET SORT");
    console.log(ascending);
    console.log(field);
    this.setState({
      sort: {
        ascending: (ascending==1?true:false),
        field: field
      }
    }, this.updateData())
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
          <DropDownBar id="filter"><EventsFilter sort_by={this.state.sort.field+"-"+(this.state.sort.ascending?"1":"0")} setSort={this.setSort} onClubFilterChange={this.onClubFilterChange}/></DropDownBar>
        </div>

	      <div className="row mt-2">
	        <div className= "col-3 d-none d-md-block">
	         <EventsFilter setSort={this.setSort} sort_by={this.state.sort.field+"-"+(this.state.sort.ascending?"1":"0")}  onClubFilterChange={this.onClubFilterChange}/>
	        </div>

	        <div className= "col-md-6">
	           <div className= "container">
	              <div className= "row">
                    {this.newCard()}
                </div>

  	             <EventsPanel events={this.state.events} updateData={this.updateData}/>

	            </div>
	        </div>
	      </div>
	    </div>
    );
  }
}

export default Events;
