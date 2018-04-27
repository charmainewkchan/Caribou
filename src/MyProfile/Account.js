import React, { Component } from 'react';
import '../App.css';

class Account extends Component {
  
  render() {
    return (
      <div>
        <h2> Account </h2>
        <hr/>
        <button className="btn btn-danger"> Delete Account </button>
      </div>
    );
  }
}

export default Account;
