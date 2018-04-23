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
      attendance:""
    }
	}

  componentDidMount(){
    // reload the data
    const url = "https://bixr.herokuapp.com/api/event/" + this.state.pk;
    axios.get(url).then(res => {
      console.log(res.data);
      this.setState({
        eventName: res.data[0].field.title,
				eventDes: res.data[0].field.description,
	      eventLoc: res.data[0].field.location,
	      eating_club: res.data[0].field.eating_club_map,
	      start:res.data[0].field.start,
	      end:res.data[0].field.end,
	      date:res.data[0].field.date,
	      pk:res.data[0].pk,
	      eventCap:res.data[0].field.capacity,
	      attendance:res.data[0].field.attendance,
      });
    });
  }



  render() {
    return (
      <div className="card Events-event">
  		 <div className="card-header event-header">
  			  <h2>{this.state.title}</h2>
  		    <p>{eating_club_map[this.state.eating_club]} &bull; </p>
  		 </div>

  	    <div className="card-body event-body">
  	         <p>{this.state.eventDes}</p>
  	         <p>{this.state.attendance == 0 ? "Be the first to join!" : ""+this.state.attendance+"/"+this.state.capacity+" going!"}</p>
  	    </div>

  	    <div className="card-footer event-footer">
  	    	{this.buttons()}
  	    </div>
      </div>
    )
  }
}

export default SingleEvent;
