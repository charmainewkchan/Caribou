import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './Home/Home'
import Events from './Events/Events'

import MyProfile from './MyProfile/MyProfile'
import User from './User'

class Main extends Component {
  render() {
    return(

		  <main>
			<Switch>
				<Route exact path='/' component={Home}/>
				<Route path='/events' component={Events}/>
        		<Route path='/user/:netid/' component={User}/>
			  	<Route path='/myprofile' component={MyProfile}/>
			</Switch>
			</main>
		);
  }
}

export default Main;
