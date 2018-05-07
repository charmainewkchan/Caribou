import '../App.css';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import BigCalendar from "react-big-calendar";
import EventCal from './EventCal';
import moment from 'moment';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import $ from 'jquery'

import "react-big-calendar/lib/css/react-big-calendar.css";
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));



class Home extends Component {


  aboutUsCard(name, year, location, degree, linkedIn, imgSrc ){
    return(<div className="card hovercard about-us-card">
        <div className="cardheader">

        </div>
        <div className="avatar">
          <img src={imgSrc} alt="077_A1053_copy" border="0"/>
        </div>
        <div className="info">
            <div className="title">
              <p2 className= "card-name">{name}</p2>
            </div>
            <div className="desc">Class of {year}</div>
            <div className="desc">{location}</div>
            <div className="desc">{degree}</div>
        </div>
        <div className="bottom">

            <a className="btn2 btn-dark btn-sm" rel="publisher" href={"https://www.linkedin.com/in/" + linkedIn+ "/"}>
                <i className="fab fa-linkedin-in"> </i>
            </a>
        </div>
    </div>)
  }



  scrollTo(div_id) {
    $('html, body').animate({
        scrollTop: $(div_id).offset().top
    }, 1000);
  }

  render() {
    return (
      <div className="Home">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossorigin="anonymous"/>


        <div className="container-fluid">
          <div className="row splash">
            <div className="col">
              <div className="anim-fadein">
                <h2>Here to mix up the people you meet.</h2>
              </div>
             <p> Make events, join events, and get to know other Tigers! </p>
              <div className = "row m-auto mt-5" >
                     <Link to='/events' className = "btn home-main-btn">Student Events <FontAwesomeIcon className="btn-icon" icon="angle-right"/></Link>
              </div>

              <div className="row mt-2 Home-aboutUsButton">
                <div className = "col-1">
                <button className="btn btn-outline-light" onClick={()=>this.scrollTo("#about")}><i class="fas fa-users"></i></button>
                </div>
              </div>


             </div>


            </div>

        </div>

        <div className="bixer-section">
          <div className="container">
          <h3> BIXER </h3>
          <p> what is it???</p>
          </div>
        </div>


        <div className="about-section" id="about">
         <div className="container">
          <h3> WHO WE ARE </h3>
          <div className="row">
              <div className="col-md-4">
                {this.aboutUsCard("Charmaine Chan", "2020", "Hong Kong", "Computer Science A.B.", "charmainechan98", "https://image.ibb.co/cMDfKS/077_A1053_copy.jpg")}
              </div>
              <div className="col-md-4">
                {this.aboutUsCard("Lucy Jing", "2020", "Toronto, Canada", "Computer Science A.B.", "jinglucy", "https://i.pinimg.com/originals/ce/a3/fd/cea3fdb66b63e2c4996ad69575742e6a.png")}
              </div>
              <div className="col-md-4">
                {this.aboutUsCard("Derek Sawicki", "2020", "Connecticut, USA", "Computer Science B.S.E.", "derek-sawicki", "https://image.ibb.co/gHnMtn/31959182_1848636945198865_1110419706541506560_n.jpg")}
              </div>
            </div>
          </div>
        </div>

        <div className="acknowledgements">
          <div className="container">
              <h3> THANKS TO </h3>
              <p> Ashley Kling, COS 333 TA </p>
              <p> Brian Kernighan, COS 333 Professor </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
