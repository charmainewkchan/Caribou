import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './App.css';

import axios from 'axios';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      username:''
    }
  }


  componentDidMount() {
    const url = "https://bixr.herokuapp.com/api/netid";
    axios.get(url).then(res => {
      console.log(res.data);
      localStorage.setItem('netid', res.data.netid);
      this.setState({username: res.data.netid});
    }).catch(err => alert(err));
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to='/' className="navbar-brand">Bixr - Welcome {this.state.username}</Link>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item"><Link to='/' className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to='/events' className="nav-link">Events</Link></li>
            <li className="nav-item"><Link to='/myprofile' className="nav-link">MyProfile</Link></li>
            <li className="nav-item"><Link to='/about' className="nav-link">About Us</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
