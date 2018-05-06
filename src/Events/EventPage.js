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

class EventPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attendance: this.props.fields.attendance
    }

    this.buttons = this.buttons.bind(this);
    this.onJoin = this.onJoin.bind(this);
}

  onJoin(pk){
    this.setState({
      attendance: this.state.attendance+1
    }, () => { this.props.onJoinEvent(pk)})


  }



  buttons() {

    if (this.props.isOwner) {
      return(<div>
        <button className="btn btn-outline-secondary" onClick={(e) => {this.props.history.push('/events/manage/'+ this.props.pk + "/"); e.stopPropagation();
}}><FontAwesomeIcon icon="pencil-alt" className="mr-1 mb-1" />Edit</button>
        <button className="btn btn-outline-secondary" onClick={(e) => this.props.displayAttendees(e,this.props.pk)}><FontAwesomeIcon icon="user" className="mr-1 mt-1"/>Attendees</button>
        </div>
        );
    } else {
      return(
        <JoinLeaveButton disabled={this.props.fields.attendance==this.props.fields.capacity} isAttending={this.props.isAttending} pk={this.props.pk} join={this.onJoin} leave={this.props.onLeaveEvent}/>
        );
    }
	}


  componentDidMount(){
    console.log("attending:" + this.props.isAttending+ " " + this.props.pk);
  }

  shouldComponentUpdate(props, state) {
    console.log(this.props.fields.attendance)
    console.log(this.state.attendance)
    return false;
    return (this.props.fields.attendance != this.state.attendance)
  }

  render() {
    return(
    <div className="event-page">
        <div className="event-page-header">
          <Link to="/events/">All events</Link>
          <h3>{moment(this.props.fields.date).format("ddd, hA") }</h3>
          <h2>{this.props.fields.title}</h2>
          <div className="event-page-author">
            <p>Hosted by <Link className="mr-1"to={"/user/"+this.props.author+"/"}>{this.props.author}</Link>({eating_club_map[this.props.fields.eating_club]})</p>
          </div>
        </div>

        <div className="container event-page-body">
          <div className="row">

              <div className="col-md-9 order-xs-2 order-sm-2  order-md-1 event-page-details">
                <img className="event-img" src={princeton_img} alt="img"/>
                <h3> Details </h3>
                <hr/>
                <p>{this.props.fields.description}</p>
              </div>


              <div className="col-md-3 order-xs-1 order-sm-1  order-md-2 event-page-info">
                  <p>{moment(this.props.fields.date).format("ddd MMM d")}</p>
                 <p>{this.props.fields.location}</p>
                 <p>{this.props.fields.start} - {this.props.fields.end}</p>
                 <p>{this.state.attendance+"/"+this.props.fields.capacity+" going!"}</p>
                 <hr/>
                 <div>
                  {this.buttons()}
                 </div>
              </div>

            </div>
          </div>
      </div>);
  }
}

export default withRouter(EventPage);
