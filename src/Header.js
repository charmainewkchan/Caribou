import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './App.css';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to='/' className="navbar-brand">ProjectTitle</Link>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item"><Link to='/' className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to='/events' className="nav-link">Events</Link></li>
            <li className="nav-item"><Link to='/myprofile' className="nav-link">MyProfile</Link></li>
            <li className="nav-item"><Link to='/about' className="nav-link">About</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
