import '../App.css';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import $ from 'jquery'




class Home extends Component {


  aboutUsCard(name, year, location, degree, email, linkedIn, imgSrc ){
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
            <div className="desc">{email}</div>

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
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossOrigin="anonymous"/>


        <div className="container-fluid">
          <div className="row splash">
            <div className="col justify-content-center" >
              <div className="anim-fadein" >
                <h2 className="splashh2">Here to mix up the people you meet.</h2>
              </div>
             <p> Make events, join events, and get to know other Tigers! </p>
              <div className = "row m-auto mt-5" >
                     <Link to='/events' className = "btn home-main-btn">Student Events <FontAwesomeIcon className="btn-icon" icon="angle-right"/></Link>
              </div>

             <div className="Home-aboutUsButton">
                <button className="btn btn-outline-light" onClick={()=>this.scrollTo("#bixer")}><i class="fas fa-angle-down"></i></button>
              </div>
             </div>
            </div>

        </div>

        <div className="bixer-section col-md" id="bixer">
          <div className="container w-50">
          <h3> BIXR </h3>
          <p4>We think getting to know members of a club should be done over a period of weeks not days. Bixr allows students to host and join events throughout the year
          so that you can get to know members the way you want to. </p4>
          <p4> How do you use Bixr? </p4>
            <ol>
              <li>Complete your profile</li>
              <li>Create/Join an Event</li>
              <li>Meet up when the event happens!</li>
            </ol>

          </div>
        </div>


        <div className="about-section" id="about">
         <div className="container">
          <h3> WHO WE ARE </h3>
          <div className="row">
              <div className="col-md-4">
                {this.aboutUsCard("Charmaine Chan", "2020", "Hong Kong", "Computer Science A.B.", "cwkchan@princeton.edu", "charmainechan98", "https://image.ibb.co/cMDfKS/077_A1053_copy.jpg")}
              </div>
              <div className="col-md-4">
                {this.aboutUsCard("Lucy Jing", "2020", "Toronto, Canada", "Computer Science A.B.","ljing@princeton.edu", "jinglucy", "https://i.pinimg.com/originals/ce/a3/fd/cea3fdb66b63e2c4996ad69575742e6a.png")}
              </div>
              <div className="col-md-4">
                {this.aboutUsCard("Derek Sawicki", "2020", "Connecticut, USA", "Computer Science B.S.E.","dsawicki@princeton.edu", "derek-sawicki", "https://image.ibb.co/gHnMtn/31959182_1848636945198865_1110419706541506560_n.jpg")}
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
