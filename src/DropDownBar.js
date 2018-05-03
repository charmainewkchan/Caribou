import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import './App.css';

class DropDownBar extends Component {
  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-light  bg-light navbar-drop">
        <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target={"#"+this.props.id} aria-controls={this.props.id} aria-expanded="false" aria-label={"Toggle "+this.props.id}>
          <FontAwesomeIcon icon="caret-down"/>
        </button>

        <div className="collapse navbar-collapse" id={this.props.id}>
          <div className="nav navbar-nav d-block">
          {this.props.children}
          </div>
        </div>
     </nav>
    );
  }
}

export default DropDownBar;
