import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './Home/Home'
import About from './About/About'
import Events from './Events/Events'
import SingleEvent from './Events/SingleEvent'

import MyProfile from './MyProfile/MyProfile'
import User from './User'

class Main extends Component {
  render() {
    return(

		  <main>
			<Switch>
				<Route exact path='/' component={Home}/>
				<Route exact path='/events' component={Events}/>
        		<Route path='/events/:event_id/' component={SingleEvent}/>
        		<Route path='/user/:netid/' component={User}/>
			  	<Route path='/about' component={About}/>
			  	<Route path='/myprofile' component={MyProfile}/>
			</Switch>
			</main>
		);
  }
}

export default Main;
