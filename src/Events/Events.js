import React, { Component } from 'react';
import EventsList from './EventsList';
import EventsFilter from './EventsFilter';
import AddEvent from './AddEvent.js';

import { Link, Switch, withRouter, Route, Router, NavLink } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
//import events_data from './events.json';
import filter_data from './filters.json';
import eating_club_map from './eating_club_map.json';
import EventCard from './EventCard';
import EditableEvent from './EditableEvent';

import EventPage from './EventPage';
import ManageEvent from './ManageEvent';
import HostingList from './HostingList';
import AttendingList from './AttendingList';
import DropDownBar from '../DropDownBar';
import EventsCompactList from './EventsCompactList'

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
      },
      currentPage: 0,
      numPages:0
  	}
    this.onClubFilterChange = this.onClubFilterChange.bind(this);

    this.onPostEvent = this.onPostEvent.bind(this);
    this.onHostEvent = this.onHostEvent.bind(this);
    this.updateData = this.updateData.bind(this);
    this.setSort = this.setSort.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.eventsPanel = this.eventsPanel.bind(this);
    this.setEventPage = this.setEventPage.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }


  changePage(pageNum){
    this.setState({
      currentPage: pageNum
    }, this.updateData());
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


  toggleEditMode(){
    this.setState({
      showNewCard: false
    })
  }

  filterEvents(){
    console.log(this.state.events_data);
  	var filtered = this.state.events_data.filter(event => this.state.filter.clubs.includes(event.fields.eating_club));

    console.log(filtered);
    filtered.sort(function(a,b) {
       var a_item = a.pk
       var b_item = b.pk

       if (a_item < b_item)
        return this.state.sort.ascending ? 1 : -1;
       if (a_item > b_item)
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
    var data = [{
      page_num: this.state.pageNum,
      page_size: 10
    }]
    axios.post(url, data).then(res => {
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


  setEventPage(pk) {
    this.props.history.push('/events/'+pk + "/");
    this.forceUpdate();
  }

  eventsPanel() {
    return (
          <div className="container-fluid">
            <div className="row events-wrapper">
                <h2>Hosting</h2>
                <hr/>
                <button className="btn btn-secondary w-100" onClick={(e) => {this.props.history.push('/events/manage/')}}><FontAwesomeIcon icon="plus" className="mr-3"/>Create an Event</button>
                
                  <HostingList setEventPage={this.setEventPage}/>


            </div>

            <div className="row events-wrapper">
                <h2>Attending</h2>
                <hr/>
                <AttendingList/>

            </div>

            <div className="row events-wrapper">
              <EventsFilter setSort={this.setSort} sort_by={this.state.sort.field+"-"+(this.state.sort.ascending?"1":"0")}  onClubFilterChange={this.onClubFilterChange}/>
            </div>
        </div>)
  }


   //<AddEvent onCreateEvent={this.onCreateEvent}/>


  render() {
    return (
    	<div className="Events container-fluid">
        <div className="row">
          <div className="col-md-3 eventsPanel">
            {this.eventsPanel()}

          </div>
	        <div className="col m-scene">
             <Switch>
                <Route path='/events/manage/:event_id(\d+)?' render={({ match }) => <ManageEvent event_id={match.params.event_id} onPostEvent={this.onPostEvent}/>}/>
                <Route exact path='/events/(list/)?' component={()=><EventsList changePage={this.changePage} currentPage={this.state.currentPage} numPages={this.state.numPages} events={this.state.events} updateData={this.updateData}/>}/>
                <Route exact path='/events/:event_id(\d+)/' component={EventPage}/>
              </Switch>
	         </div>
        </div>
	    </div>
    );
  }
}

export default withRouter(Events);
