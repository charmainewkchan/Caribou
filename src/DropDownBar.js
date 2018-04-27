import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './App.css';

class DropDownBar extends Component {
  render() {
    return(
      <nav className="navbar navbar-light bg-light ">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target={"#"+this.props.id} aria-controls={this.props.id} aria-expanded="false" aria-label={"Toggle "+this.props.id}>
                  <span className="navbar-toggler-icon"></span>
        </button>
            <div className="collapse navbar-collapse" id={this.props.id}>
              {this.props.children}
            </div>
     </nav>
    );
  }
}

export default DropDownBar;
