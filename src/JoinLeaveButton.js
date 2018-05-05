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
  }

  componentDidMount(){
    console.log("is attending: " + this.props.isAttending + " " + this.props.pk)
  }

  onEngage(){

    console.log("boop");



    if (!this.state.isAttending){
      this.props.join(this.props.pk)

      this.setState({
        isAttending: !this.state.isAttending
      })
    } else {

      if (window.confirm('Are you sure you want to leave this event?')) {
        this.props.leave(this.props.pk)

          this.setState({
            isAttending: !this.state.isAttending
          })
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
