import React, { Component } from 'react';
import eating_club_map from './eating_club_map.json';
import '../App.css';
import axios from 'axios'
import princeton_img from '../Resources/princeton1.jpg'
import {Link} from 'react-router-dom';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class EventPage extends Component {
  constructor(props) {
        super(props)
    this.state = {
      eventName: "",
      eventDes: "",
      eventLoc: "",
      eating_club: "",
      start:"",
      end:"",
      date:"",
      pk:0,
      eventCap:"",
      capacity:"",
    }

    this.buttons = this.buttons.bind(this)
    this.onJoinEvent = this.onJoinEvent.bind(this);
    this.onLeaveEvent = this.onLeaveEvent.bind(this);
}

  componentDidMount(){
    // reload the data
        const event_id = this.props.match.params.event_id;
        const url = "https://bixr.herokuapp.com/api/event/" + event_id + "/";
        console.log(url);

        axios.get(url).then(res => {
      console.log(res.data);
      this.setState({
          eventName: res.data[0].fields.title,
          eventDes: res.data[0].fields.description,
          eventLoc: res.data[0].fields.location,
          eating_club: res.data[0].fields.eating_club,
          start:res.data[0].fields.start,
          end:res.data[0].fields.end,
          date:res.data[0].fields.date,
          pk:res.data[0].pk,
          eventCap:res.data[0].fields.capacity,
          attendance:res.data[0].fields.attendance,
          author:res.data[0].author,
          isOwner: res.data[0].isOwner,
          isAttending: res.data[0].isAttending
      });

    });


  }

  componentDidUpdate(){
        const event_id = this.props.match.params.event_id;
        const url = "https://bixr.herokuapp.com/api/event/" + event_id + "/";

        axios.get(url).then(res => {
          this.setState({
          eventName: res.data[0].fields.title,
          eventDes: res.data[0].fields.description,
          eventLoc: res.data[0].fields.location,
          eating_club: res.data[0].fields.eating_club,
          start:res.data[0].fields.start,
          end:res.data[0].fields.end,
          date:res.data[0].fields.date,
          pk:res.data[0].pk,
          eventCap:res.data[0].fields.capacity,
          attendance:res.data[0].fields.attendance,
          author:res.data[0].author,

      });
    });

  }

  buttons() {
		if (this.state.isAttending == "1") {
			return <button className="btn btn-danger" onClick={() => this.props.onLeaveEvent(this.state.pk)}> Leave </button>
		} else if (this.state.isOwner == "1") {
      return <button className="btn btn-outline-secondary" onClick={(e) => {this.props.history.push('/events/manage/'+ this.state.pk + "/"); e.stopPropagation();
}}><FontAwesomeIcon icon="pencil-alt" className="mr-1" />Edit</button>

    }
    else {
      console.log(this.state.attendance)
			return <button disabled={this.state.attendance==this.state.eventCap} className="btn btn-primary" onClick={() => this.props.onJoinEvent(this.state.pk)}> Join </button>
		}
	}

  onJoinEvent(event_id) {
    var data = [{
      event: event_id,
    }]
    axios.post("https://bixr.herokuapp.com/api/join_event/",  data)
    .then(res => this.props.updateData())
    .catch(err => {
          if(err.response.status == 401) {
            // redirect
            if(window.confirm("You must complete your profile before joining an event. Press OK to go to Profile page.")) {
              this.props.history.push('/myprofile/');
            }
          }
    });

  }

  onLeaveEvent(event_id) {
    var data = [{
      event: event_id,
    }]
    //alert(JSON.stringify(data));
    if (window.confirm('Are you sure you want to leave this event?')) {

    axios.post("https://bixr.herokuapp.com/api/unjoin_event/",  data)
    .then(res => this.props.updateData())
    .catch(err => alert(err));
  }

  }



  shouldComponentUpdate(props, state) {
    console.log(this.props.match.params.event_id)
    console.log(this.state.pk)
    return this.props.match.params.event_id != this.state.pk;
  }



  render() {
    return(
    <div className="event-page anim-fadeinright">
        <div className="event-page-header">
          <Link to="/events/">All events</Link>
          <h3>{moment(this.state.date).format("ddd, hA") }</h3>
          <h2>{this.state.eventName}</h2>
          <div className="event-page-author">
            <p>Hosted by <Link className="mr-1"to={"/user/"+this.state.author+"/"}>{this.state.author}</Link>({eating_club_map[this.state.eating_club]})</p>
          </div>
        </div>

        <div className="container event-page-body">
          <div className="row">

              <div className="col-md-9 order-xs-2 order-sm-2  order-md-1 event-page-details">
                <img className="event-img" src={princeton_img} alt="img"/>
                <h3> Details </h3>
                <hr/>
                <p>{this.state.eventDes}</p>
              </div>


              <div className="col-md-3 order-xs-1 order-sm-1  order-md-2 event-page-info">
                  <p>{this.state.date}</p>
                 <p>{this.state.eventLoc}</p>
                 <p>{this.state.start} - {this.state.end}</p>
                 <p>{this.state.attendance+"/"+this.state.eventCap+" going!"}</p>
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
