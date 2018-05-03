import React, { Component } from 'react';
import '../App.css';

class Account extends Component {
  
  render() {
    return (
      <div className="mt-4">
        <h2 className="profile-header"> Account </h2>
        <hr/>


        <div className="form-check">
              <input className="form-check-input" type="checkbox" name="date_asc" id="date_asc" value="date_asc"/>
              <label className="form-check-label" for="date_asc">
                Receive Emails
              </label>
         </div>
         <br/>


        <button className="btn"> Delete Account </button>
      </div>
    );
  }
}

export default Account;
