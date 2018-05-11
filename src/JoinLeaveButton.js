import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import './App.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import axios from 'axios';

class JoinLeaveButton extends Component {
  constructor(props) {
    super(props);
    this.state={
      isAttending: this.props.isAttending
    }

    this.onEngage = this.onEngage.bind(this)
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
  }

  componentDidMount(){
    console.log("is attending: " + this.props.isAttending + " " + this.props.pk)
  }


  join(){
      console.log("undo leave");
      this.setState({
        isAttending: true
      })
  }

  leave() {
    console.log("undo join");
    this.setState({
      isAttending: false
    })
  }

  onEngage(){

    console.log("boop");

    if (!this.state.isAttending){
      this.props.join(this.props.pk, this)
      this.join();
    } else {

      if (window.confirm('Are you sure you want to leave this event?')) {
        this.props.leave(this.props.pk, this)
        this.leave();
      }
    }


  }

  render() {
    if (!this.state.isAttending){
      return <button disabled={this.props.disabled} className="btn btn-primary" onClick={(e) => {e.stopPropagation(); this.onEngage()}}> Join </button>
    } else {
     return (
      <button className="btn btn-danger" onClick={(e) => {e.stopPropagation(); this.onEngage()}}> Leave </button>
      );
    }
  }
}

export default JoinLeaveButton;
