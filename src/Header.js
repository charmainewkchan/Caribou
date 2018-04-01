import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './App.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
	      <ul>
	      	<li><Link to='/'>Home</Link></li>
	      	<li><Link to='/about'>About</Link></li>
	      </ul>
      </div>
    );
  }
}

export default Header;
