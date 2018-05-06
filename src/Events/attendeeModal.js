import React, { Component } from 'react';
import eating_club_map from './eating_club_map.json';
import '../App.css';
import axios from 'axios'
import princeton_img from '../Resources/princeton1.jpg'
import {Link} from 'react-router-dom';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import JoinLeaveButton from '../JoinLeaveButton';
class AttendeeModal extends Component {

render() {

  return (
<div class="modal" id="attendee" tabindex="-1" role="dialog" aria-labelledby="attendeeTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="attendeeTitle">Attendees</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <ul>
        {this.state.attendees.map((name) => <this.Item key = {name} message = {name}/>)}
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
)
}

}

export default AttendeeModal;
