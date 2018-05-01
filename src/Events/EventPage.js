import React, { Component } from 'react';
import eating_club_map from './eating_club_map.json';
import '../App.css';
import axios from 'axios'
import princeton_img from '../Resources/princeton1.jpg'
import {Link} from 'react-router-dom';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class EventPage extends Component {
  constructor(props) {
        super()
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
            capacity:""
    }
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
        author:res.data[0].author
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
        author:res.data[0].author
      });
    });
  }

  shouldComponentUpdate(props, state) {
    console.log(this.props.match.params.event_id)
    console.log(this.state.pk)
    return this.props.match.params.event_id != this.state.pk;
  }

  render() {
    return(
    <div className="event-page">
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
                 <button className="btn btn-outline-secondary"> Join </button>
              </div>

            </div>
          </div>
      </div>);
  }
}

export default withRouter(EventPage);