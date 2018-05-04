import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
      localStorage.setItem('netid', 'dsawicki');
      this.setState({username: 'dsawicki'});

      const url = "https://bixr.herokuapp.com/api/netid/";

    axios.get(url).then(res => {
      console.log(res.data);
      localStorage.setItem('netid', res.data.netid);
      this.setState({username: res.data.netid});
    }).catch(err => alert(err));
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
              <li className="nav-item"><Link to='/' className="nav-link-header ">HOME</Link></li>
              <li className="nav-item"><Link to='/events' className="nav-link-header">EVENTS</Link></li>
              <li className="nav-item"><Link to='/myprofile' className="nav-link-header">PROFILE</Link></li>
            </ul>
          </div>
      </nav>
    );
  }
}

export default Header;
