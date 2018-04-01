import React, { Component } from 'react';
import '../App.css';

class MyProfile extends Component {
  render() {
    return (
      <div className="MyProfile container">
      	<div className="row">
      		<div className="col-3">
      			<ul className="MyProfile-settings">
      				<li>My Profile</li>
      				<li>My Events</li>
      				<li>Account Settings</li>
      			</ul>
      		</div>
      		<div className="col">
      			<p>Corresponding settings panel would go here</p>
      		</div>
      	</div>
      </div>
    );
  }
}

export default MyProfile;
