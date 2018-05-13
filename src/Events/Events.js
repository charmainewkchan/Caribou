import React, { Component } from 'react';
import EventsList from './EventsList';
import EventsFilter from './EventsFilter';
import AddEvent from './AddEvent.js';

import { Link, Switch, withRouter, Route, Router, NavLink } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
//import events_data from './events.json';
import filter_data from './filters.json';
import eating_club_map from './eating_club_map.json';
import EditableEvent from './EditableEvent';

import EventPageContainer from './EventPageContainer';
import ManageEvent from './ManageEvent';
import DropDownBar from '../DropDownBar';

import axios from 'axios'

import SidePanel from './SidePanel'

import '../App.css';

class Events extends Component {
  constructor() {
  	super();
  	this.state = {
  		filter: {
  			clubs: filter_data.clubs
  		},
  		events: [],
      sort: {
        ascending: true,
        field: "date"
      },
      currentPage: 0,
      listSelected: 0,
      currentListUrl: "https://bixr.herokuapp.com/api/get_events/",
      numPages:2,
      eating_club_filter: Object.keys(eating_club_map)
  	}

    this.onPostEvent = this.onPostEvent.bind(this);
    this.onRemoveEvent = this.onRemoveEvent.bind(this);

    this.updateAll = this.updateAll.bind(this);
    //this.updateHosting = this.updateHosting.bind(this);
    //this.updateAttending = this.updateAttending.bind(this);
    this.updateSidePanel = this.updateSidePanel.bind(this);
    //this.updateEvents = this.updateEvents.bind(this);

    this.changeList = this.changeList.bind(this);
    this.setList = this.setList.bind(this);

    this.setEventPage = this.setEventPage.bind(this);
    this.changePage = this.changePage.bind(this);

    this.applyFilter = this.applyFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.updateSidePanel = this.updateSidePanel.bind(this)
  }

  updateSidePanel() {
    this.refs.child.updateData();
  }

  componentDidMount() {
    this.updateAll();
  }


  onRemoveEvent(event, event_id) {
      event.stopPropagation();

      if(window.confirm("Are you sure you want to delete this event?")) {
        const url = "https://bixr.herokuapp.com/api/delete_event/" + event_id + "/";
        axios.get(url)
        .then(res =>  this.updateAll())
        .catch(err => console.log(err));

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
    var netid = localStorage.getItem('netid')
    console.log("switch to " + list)

    this.props.history.push('/events/')

    var newUrl = this.state.currentListUrl;
    var listSelection = 0;

    switch(list) {
      case "list":
        listSelection = 0;
        newUrl = "https://bixr.herokuapp.com/api/get_events/";
        break;
      case "hosting":
              listSelection = 1;
        newUrl = "https://bixr.herokuapp.com/api/hosted_events/" + netid + "/";
        break;
     case "attending":
             listSelection = 2;
        newUrl = "https://bixr.herokuapp.com/api/get_events_for_user/" + netid + "/";
       break;
     }
      this.setState({
        currentListUrl: newUrl,
        listSelected:listSelection
      }, () => this.setList());
        
  }

  setList() {
    var data = [{
      page_num: this.state.currentPage,
      page_size: 10,
      eating_club_filter: this.state.eating_club_filter
    }]
    console.log(data)

    axios.post(this.state.currentListUrl, data)
      .then(res => {
        console.log(res.data);
        this.setState({
          numPages: res.data.slice(-1)[0]['num_pages'],
          events: res.data.slice(0,-1)
        })
       })
      .catch(err=>console.log(err))
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


  updateAll(){
    // reload the data
    const url = this.state.currentListUrl;
    var data = [{
      page_num: this.state.currentPage,
      page_size: 10,
      eating_club_filter: this.state.eating_club_filter
    }]
    console.log(data)

    this.updateSidePanel()

    axios.post(url, data).then(res => {
      console.log(res.data);
      this.setState({
        numPages: res.data.slice(-1)[0]['num_pages'],
        events: res.data.slice(0,-1)
      });
    })
  }


  setEventPage(pk) {
    this.props.history.push('/events/'+pk + "/");
    this.forceUpdate();
  }


  render() {
    return (
    	<div>


        <SidePanel ref="child" mobile={true} changeList={this.changeList} setEventPage={this.setEventPage}/>

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
              <div className="container-fluid">

                <div className="row mb-3">
                  <button className="btn btn-secondary w-100" onClick={(e) => {this.props.history.push('/events/manage/')}}><FontAwesomeIcon icon="plus" className="mr-3"/>Create an Event</button>
                </div>

                <SidePanel ref="child" mobile={false} changeList={this.changeList} setEventPage={this.setEventPage}/>

                <div className="row events-wrapper">
                  <EventsFilter clearFilter={this.clearFilter} applyFilter={this.applyFilter} />
                </div>
              </div>
            </div>

  	        <div className="col-md-6">
               <Switch>
                  <Route path='/events/manage/:event_id(\d+)?' render={({ match }) => <ManageEvent event_id={match.params.event_id} onRemoveEvent={this.onRemoveEvent} onPostEvent={this.onPostEvent}/>}/>
                  <Route exact path='/events/(list/)?' component={()=><EventsList changePage={this.changePage} currentPage={this.state.currentPage} numPages={this.state.numPages} events={this.state.events} updateData={this.updateAll}/>}/>
                  <Route exact path='/events/:event_id(\d+)/' component={()=><EventPageContainer updateSidePanel={this.updateSidePanel}/>}/>
                </Switch>
  	         </div>
          </div>
        </div>
	    </div>
    );
  }
}

export default withRouter(Events);
