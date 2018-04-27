import React, { Component } from 'react';
import eating_club_map from './eating_club_map.json';
import '../App.css';
import axios from 'axios'
import princeton_img from '../Resources/princeton1.jpg'


class SingleEvent extends Component {

	constructor(){
		super()
    this.state = {
      eventName: "",
      eventDes: "",
      eventLoc: "",
      eating_club: "",
      start:"",
      end:"",
      date:"",
      pk:"",
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
      });
    });
  }



  render() {
    return (
      <div>
        <div className="event-page-header">
          <h3>{this.state.date}</h3>
          <h2>{this.state.eventName}</h2>
          <div className="event-page-author">
            <p>Hosted by author</p>
            <p>Of {eating_club_map[this.state.eating_club]}</p>
          </div>
        </div>

    	  <div className="container-fluid event-page-body">
        <div className="row">

              <div className="col-md-9 order-sm-2 order-xs-2 order-md-1 event-page-details">
                <img className="event-img" src={princeton_img} alt="img"/>
                <h3> Details </h3>
                <hr/>
                <p>{this.state.eventDes}</p>
              </div>

                          
              <div className="col-md-3 order-sm-1 order-xs-1 order-md-2 event-page-info ml-3">
                  <p>{this.state.date}</p>
                 <p>{this.state.eventLoc}</p>
                 <p>{this.state.start} - {this.state.end}</p>
                 <p>{this.state.attendance+"/"+this.state.eventCap+" going!"}</p>
              </div>

            </div>
          </div>
      </div>

    )
  }
}

export default SingleEvent;
