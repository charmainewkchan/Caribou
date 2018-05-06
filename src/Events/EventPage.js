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
      attendance: this.props.fields.attendance,
      pk: this.props.pk,
      attendees: [],
      firstNames : [],
      lastNames: [],
      netids: []
    }

    this.Item = this.Item.bind(this);


    this.buttons = this.buttons.bind(this);
    this.onJoin = this.onJoin.bind(this);
    this.onLeave = this.onLeave.bind(this);

}

  onJoin(pk){
    this.setState({
      attendance: this.state.attendance+1
    }, () => { this.props.onJoinEvent(pk)})
  }

  onLeave(pk) {
      this.setState({
        attendance: this.state.attendance-1
      }, () => this.props.onLeaveEvent(pk))
  }



  buttons() {

    if (this.props.isOwner) {
      return(<div>
        <button className="btn btn-outline-secondary" onClick={(e) => {this.props.history.push('/events/manage/'+ this.props.pk + "/"); e.stopPropagation();
        }}><FontAwesomeIcon icon="pencil-alt" className="mr-1 mb-1" />Edit</button>

        <button type="button" className="btn btn-outline-secondary" data-toggle="modal" data-target="#attendee"><FontAwesomeIcon icon="user" className="mr-1 mt-1"/>Attendees</button>
        </div>
        );
    } else {
      return(
        <JoinLeaveButton disabled={this.props.fields.attendance==this.props.fields.capacity} isAttending={this.props.isAttending} pk={this.props.pk} join={this.onJoin} leave={this.onLeave}/>
        );
    }
	}

  Item(props) {
    return <li style={{"list-style-type":"none"}}> {props.message} </li>;
  }



  componentDidMount(){
    console.log("attending:" + this.props.isAttending+ " " + this.props.pk);
    const url = "https://bixr.herokuapp.com/api/get_users_for_event/" + this.state.pk + "/";
    var netids;
    var tfirstNames;
    var tlastNames;
    axios.get(url).then(res => {
        netids = res.data.map(user => user.fields.netid);
        tfirstNames = res.data.map(user => user.fields.first_name);
        tlastNames = res.data.map(user => user.fields.last_name);

        this.setState({
          firstNames : tfirstNames,
          lastNames : tlastNames,
          netids : netids
        })

        for (var i = 0; i < this.state.firstNames.length; i++) {
          this.state.attendees.push(this.state.firstNames[i] + " " + this.state.lastNames[i] + "   ");
        }
        console.log(this.state.attendees)

        this.setState({
          attendees: this.state.attendees
        })

    })
    .catch(err => alert("err:" + err))

  }

  shouldComponentUpdate(props, state) {
    return true;
    console.log(this.props.fields.attendance)
    console.log(this.state.attendance)
    return false;
    return (this.props.fields.attendance != this.state.attendance)
  }

  render() {
    return(
    <div className="event-page">
        <div className="event-page-header">
          <Link to="/events/"><FontAwesomeIcon icon="angle-left" className="angle-left"/> All events</Link>
          <h2>{this.props.fields.title}</h2>
          <div className="event-page-author">
            <p>By <Link className="mr-1"to={"/user/"+this.props.author+"/"}>{this.props.author}</Link>({eating_club_map[this.props.fields.eating_club]})</p>
          </div>
        </div>

        <div className="container event-page-body">
          <div className="row">
              <div className="col order-xs-2 order-sm-2  order-md-1 event-page-details">
              <p>{this.props.fields.description}</p>
              </div>
          </div>

              <div>
                  <p className= "event-date">{moment(this.props.fields.date).format("dddd, MMMM DD, YYYY")}</p>

                  <hr/>

                <div className = "row">
                <div className= "col-3">
                <p className = "event-time">{moment((this.props.fields.date + " " + this.props.fields.start), 'YYYY-MM-DD HH:mm').format('h:mmA')}</p>
                <p className = "event-time-small"> to </p>
                <p className = "event-time">{moment((this.props.fields.date + " " + this.props.fields.end), 'YYYY-MM-DD HH:mm').format('h:mmA')}</p>
                </div>

                <div className = "col-1">
                 <div class="vl"></div>
                </div>

                <div className = "col-8">
                <p className = "event-text">{this.props.fields.location}</p>
                 <p className = "event-time-small">{this.state.attendance+"/"+this.props.fields.capacity+" going!"}</p>
                 </div>
                 </div>

                 <hr/>
                 <div>
                  {this.buttons()}



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
              </div>

            </div>
          </div>
      </div>);
  }
}

export default withRouter(EventPage);
