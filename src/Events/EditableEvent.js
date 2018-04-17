               
import React, { Component } from 'react';
//import Event from './Event'
import eating_club_map from './eating_club_map.json';
import '../App.css';

class EditableEvent extends Component {

  constructor(props){
    super()

    this.state = {
      value:""
    }
  }

  render() {
    return (
    	<div>
      <form>
		 <div className="event-header">


        <div className="form-group">
          <label for="title" className="col-2 col-form-label">Title</label>
          <div className="col-10">
            <input className="form-control" type="text" id="title" name = "eventName" value={this.state.value} defaultValue={this.props.title} onChange={this.handleChange}/>
          </div>
        </div>

		    <p>{eating_club_map[this.props.eating_club]} &bull; {this.props.time}</p>
		 </div>
                
         <p>{this.props.description}</p>
         <p>{this.props.attendance == 0 ? "Be the first to join!" : ""+this.props.attendance+"/"+this.props.capacity+" going!"}</p>
         <button disabled={this.props.attendance==this.props.capacity} className="btn btn-secondary join-button" onClick={() => this.props.onJoinEvent(this.props.pk)}> Join </button>
      </form>


    </div>

    );
  }
}

//        

export default EditableEvent;
