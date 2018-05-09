import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import './App.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import axios from 'axios';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      username:''
    }
  }

  componentDidMount() {
    const url = "https://bixr.herokuapp.com/api/netid/";

    axios.get(url).then(res => {
      console.log(res.data);
      localStorage.setItem('netid', res.data.netid);
      this.setState({username: res.data.netid});
    }).catch(err => {
      window.location.replace("https://bixr.herokuapp.com/login/")
      console.log(err)
    });
  }


  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
          <Link to='/' className="navbar-brand">Bixr</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <FontAwesomeIcon icon="bars"/>
            </button>
         <div className="collapse navbar-collapse navbar-collapse-custom"  id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto navbar-collapse borderXwidth">
              <li className="nav-item"><NavLink to='/' exact activeClassName="nav-link-header-active" className="nav-link-header ">HOME</NavLink></li>
              <li className="nav-item"><NavLink to='/events' activeClassName="nav-link-header-active" className="nav-link-header">EVENTS</NavLink></li>
              <li className="nav-item"><NavLink to='/myprofile' activeClassName="nav-link-header-active" className="nav-link-header">PROFILE</NavLink></li>
            </ul>
          </div>
      </nav>
    );
  }
}

export default Header;
