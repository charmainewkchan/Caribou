               
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
    <div className="card Events-event">
     <div className="card-header event-header">
        <div className="form-group">
          <div className="col-10">
            <input className="form-control input-sm col-sm" type="text" id="title" name = "eventName" value={this.state.value} defaultValue={this.props.title} onChange={this.handleChange}/>
          </div>
        </div>

        <p>{eating_club_map[this.props.eating_club]} &bull; {this.props.time}</p>
     </div>

      <div className="card-body event-body">
           <p>{this.props.description}</p>
           <p>{this.props.attendance == 0 ? "Be the first to join!" : ""+this.props.attendance+"/"+this.props.capacity+" going!"}</p>
      </div>

      <div className="card-footer event-footer">
        <button disabled={this.props.attendance==this.props.capacity} className="btn btn-secondary join-button" onClick={() => this.props.onJoinEvent(this.props.pk)}> Save </button>
      </div>
    </div>
    );
  }
}

//        

export default EditableEvent;
