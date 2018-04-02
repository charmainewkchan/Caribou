import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './Home/Home'
import About from './About/About'
import Events from './Events/Events'
import MyProfile from './MyProfile/MyProfile'

class Main extends React.Component {
  render() {
    return(
		  <main className="container-fluid">
			<Switch>
				<Route exact path='/' component={Home}/>
				<Route path='/events' component={Events}/>
			  <Route path='/about' component={About}/>
			  <Route path='/myprofile' component={MyProfile}/>
			</Switch>
			</main>
		);
  }
}

export default Main;
