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
      eventsHosting: [],
      eventsAttending: [],
      sort: {
        ascending: true,
        field: "date"
      },
      currentPage: 0,
      listSelected: 0,
      numPages:2,
      eating_club_filter: Object.keys(eating_club_map)
  	}

    this.onPostEvent = this.onPostEvent.bind(this);
    this.onRemoveEvent = this.onRemoveEvent.bind(this);
    this.onJoinEvent = this.onJoinEvent.bind(this);
    this.onLeaveEvent = this.onLeaveEvent.bind(this);


    this.updateAll = this.updateAll.bind(this);
    this.updateHosting = this.updateHosting.bind(this);
    this.updateAttending = this.updateAttending.bind(this);
    //this.updateEvents = this.updateEvents.bind(this);





    this.setSort = this.setSort.bind(this);
    this.eventsPanel = this.eventsPanel.bind(this);
    this.setEventPage = this.setEventPage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeList = this.changeList.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  componentDidMount() {
    this.updateAll();
    this.setState({"listSelected": 0});
  }



  onRemoveEvent(event, event_id) {
      event.stopPropagation();

      if(window.confirm("Are you sure you want to delete this event?")) {
        const url = "https://bixr.herokuapp.com/api/delete_event/" + event_id + "/";
        axios.get(url)
        .then(res =>  this.updateAll())
        .catch(err => alert(err));

        this.props.history.push('/events/list/')
      }
  }

  changePage(pageNum){
    if (pageNum != this.state.currentPage){
      this.setState({
        currentPage: pageNum
      }, ()=>{this.updateAll()});
    }
  }

  changeList(list){
    this.currentPage = 0;
    switch(list) {
      case "list":
        this.setState({"listSelected":0});
        break;
      case "hosting":
        this.setState({"listSelected":1});
        break;
     case "attending":
        this.setState({"listSelected":2});
        break;
    }
    this.props.history.push("/events/"+list+"/")
  }

  onPostEvent(event){
    console.log(event)
    axios.post('https://bixr.herokuapp.com/api/post_event', event)
    .then(res => {
        //console.log(res);
        //console.log(res.data);
        this.updateAll();

        this.props.history.push('/events/list/')
      })
    .catch(err => alert(err));
  }

  onJoinEvent(event_id) {
    var data = [{
      event: event_id,
    }]
    console.log(("join" + event_id))
    axios.post("https://bixr.herokuapp.com/api/join_event/",  data)
    .then(res => this.updateAll())
    .catch(err => {
          if(err.response.status == 401) {
            // redirect
            if(window.confirm("You must complete your profile before joining an event. Press OK to go to Profile page.")) {
              this.props.history.push('/myprofile/');
            }
          }
    });
  }

  clearFilter(){

      this.setState({
        eating_club_filter: Object.keys(eating_club_map)
      }, ()=>this.updateAll())
  }

  applyFilter(filter){
      var filterAsList = Object.keys(filter).filter(val=>filter[val]==true);

      this.setState({
        eating_club_filter:  (filterAsList.length == 0 ? Object.keys(eating_club_map) : filterAsList)
      }, ()=>this.updateAll())
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
    }, ()=>{this.updateAll()})
  }

  updateAll(){
    // reload the data

    this.updateHosting();
    this.updateAttending();

    const url = "https://bixr.herokuapp.com/api/get_events";
    var data = [{
      page_num: this.state.currentPage,
      page_size: 10,
      eating_club_filter: this.state.eating_club_filter
    }]
    console.log(data)

    axios.post(url, data).then(res => {
      console.log(res.data);
      this.setState({
        numPages: res.data.slice(-1)[0]['num_pages'],
        events: res.data.slice(0,-1)
      });
    });
  }

  updateHosting(){
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

  updateAttending(){
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


  onLeaveEvent(event_id) {
    var data = [{
      event: event_id,
    }]
    //alert(JSON.stringify(data));
    if (window.confirm('Are you sure you want to leave this event?')) {
      axios.post("https://bixr.herokuapp.com/api/unjoin_event/",  data)
      .then(res => this.updateAll())
      .catch(err => alert(err));
    }
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

                <EventsCompactList setEventPage={this.setEventPage} location={this.props.location} events={this.state.eventsHosting}/>

            </div>

            <div className="row events-wrapper">
                <h2>Attending</h2>
                <hr/>
               <EventsCompactList setEventPage={this.setEventPage} location={this.props.location} events={this.state.eventsAttending}/>

            </div>

            <div className="row events-wrapper">
              <EventsFilter clearFilter={this.clearFilter} applyFilter={this.applyFilter} setSort={this.setSort} sort_by={this.state.sort.field+"-"+(this.state.sort.ascending?"1":"0")}  onClubFilterChange={this.onClubFilterChange}/>
            </div>
        </div>)
  }

  eventsPanelMobile() {
    return (
      <div className="row d-md-none eventsPanel-mobile" >
        <div className="col-4 cursor-hover">
          <p onClick={()=>this.changeList("list")}>Events</p>
        </div>
        <div className="col-4 cursor-hover">
          <p onClick={()=>this.changeList("hosting")}>Hosting</p>
        </div>
        <div className="col-4 cursor-hover">
          <p onClick={()=>this.changeList("attending")}>Attending</p>
        </div>

      </div>
      )
  }


   //<AddEvent onCreateEvent={this.onCreateEvent}/>


  render() {
    return (
    	<div>

        {this.eventsPanelMobile()}

        <div className="d-md-none mb-2">
          <DropDownBar id="filter_dropdown"><EventsFilter clearFilter={this.clearFilter} applyFilter={this.applyFilter} setSort={this.setSort} sort_by={this.state.sort.field+"-"+(this.state.sort.ascending?"1":"0")}  onClubFilterChange={this.onClubFilterChange}/></DropDownBar>
        </div>

        <div className="Events container-fluid">

          {this.state.listSelected==1 &&
              <div className="row mb-2 d-md-none">
                <button className="btn btn-secondary w-100" onClick={(e) => {this.props.history.push('/events/manage/')}}><FontAwesomeIcon icon="plus" className="mr-3"/>Create an Event</button>
              </div>
            }

          <div className="row">
            <div className="col-md-3 d-none d-md-block eventsPanel">
              {this.eventsPanel()}
            </div>
  	        <div className="col m-scene">
               <Switch>
                  <Route path='/events/manage/:event_id(\d+)?' render={({ match }) => <ManageEvent event_id={match.params.event_id} onRemoveEvent={this.onRemoveEvent} onPostEvent={this.onPostEvent}/>}/>
                  <Route exact path='/events/(list/)?' component={()=><EventsList changePage={this.changePage} currentPage={this.state.currentPage} numPages={this.state.numPages} events={this.state.events} updateData={this.updateAll}/>}/>
                  <Route exact path='/events/hosting/' component={()=><EventsList changePage={this.changePage} currentPage={this.state.currentPage} numPages={this.state.numPages} events={this.state.eventsHosting} updateData={this.updateHosting}/>}/>
                  <Route exact path='/events/attending/' component={()=><EventsList changePage={this.changePage} currentPage={this.state.currentPage} numPages={this.state.numPages} events={this.state.eventsAttending} updateData={this.updateAttending}/>}/>
                  <Route exact path='/events/:event_id(\d+)/' component={()=><EventPage onLeaveEvent={this.onLeaveEvent} onJoinEvent={this.onJoinEvent} />}/>
                </Switch>
  	         </div>
          </div>
        </div>
	    </div>
    );
  }
}

export default withRouter(Events);
