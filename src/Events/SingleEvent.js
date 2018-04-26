import React, { Component } from 'react';
import eating_club_map from './eating_club_map.json';
import '../App.css';
import axios from 'axios'


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
	      eating_club: res.data[0].fields.eating_club_map,
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
			<div className= "container">
      <div className="card Events-event">
  		 <div className="card-header event-header">
  			  <h2>{this.state.eventName}</h2>
  		    <p>{eating_club_map[this.state.eating_club]} &bull; </p>
  		 </div>

  	    <div className="card-body event-body">
  	         <p>{this.state.eventDes}</p>
						 <p>{this.state.date}</p>
						 <p>{this.state.eventLoc}</p>
						 <p>{this.state.start} - {this.state.end}</p>
  	         <p>{this.state.attendance+"/"+this.state.eventCap+" going!"}</p>
  	    </div>
      </div>
		</div>
    )
  }
}

export default SingleEvent;
