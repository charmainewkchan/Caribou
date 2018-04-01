import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import About from './About'


class Main extends React.Component {
  render() {
    return(
		  <main>
			<Switch>
				<Route exact path='/' component={Home}/>
			  <Route path='/about' component={About}/>
			</Switch>
			</main>
		);
  }
}

export default Main;