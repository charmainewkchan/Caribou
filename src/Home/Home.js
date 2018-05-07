import '../App.css';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import BigCalendar from "react-big-calendar";
import EventCal from './EventCal';
import moment from 'moment';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import "react-big-calendar/lib/css/react-big-calendar.css";
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));



class Home extends Component {

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
              <div className = "row ">
                     <Link to='/events' className = "btn splash-btn btn-outline-light">Student Events</Link>
            	 </div>
               <p> Make events, join events, and get to know other Tigers! </p>
             </div>
            </div>
        </div>

        <div className="container">
        	<div className="row">
        		<div className="col-md-4 ">

                    <div className="card hovercard">
                        <div className="cardheader">

                        </div>
                        <div className="avatar">
                          <img src="https://image.ibb.co/cMDfKS/077_A1053_copy.jpg" alt="077_A1053_copy" border="0"/>
                        </div>
                        <div className="info">
                            <div className="title">
                              <p2 className= "card-name">Charmaine Chan</p2>
                            </div>
                            <div className="desc">Class of 2020</div>
                            <div className="desc">Hong Kong</div>
                            <div className="desc">Computer Science A.B.</div>
                        </div>
                        <div className="bottom">

                            <a className="btn2 btn-dark btn-sm" rel="publisher" href="https://www.linkedin.com/in/charmainechan98/">
                                <i className="fab fa-linkedin-in"> </i>
                            </a>
                        </div>
                    </div>

                </div>

                <div className="col-md-4 ">

                        <div className="card hovercard">
                            <div className="cardheader">

                            </div>
                            <div className="avatar">
                            <img src="https://i.pinimg.com/originals/ce/a3/fd/cea3fdb66b63e2c4996ad69575742e6a.png" border="0"/>
                           </div>
                            <div className="info">
                                <div className="title">
                                  <p2 className= "card-name">Lucy Jing</p2>
                                </div>
                                <div className="desc">Class of 2020</div>
                                <div className="desc">Toronto, Canada</div>
                                <div className="desc">Computer Science A.B.</div>
                            </div>
                            <div className="bottom">

                                <a className="btn2 btn-dark btn-sm" rel="publisher" href="https://www.linkedin.com/in/jinglucy/">
                                    <i className="fab fa-linkedin-in"> </i>
                                </a>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-4">

                            <div className="card hovercard">
                                <div className="cardheader">

                                </div>
                                <div className="avatar">
                                <img src="https://image.ibb.co/gHnMtn/31959182_1848636945198865_1110419706541506560_n.jpg" alt="31959182_1848636945198865_1110419706541506560_n" border="0"/>
                               </div>
                                <div className="info">
                                    <div className="title">
                                      <p2 className= "card-name">Derek Sawicki</p2>
                                    </div>
                                    <div className="desc">Class of 2020</div>
                                    <div className="desc">Connecticut, USA</div>
                                    <div className="desc">Computer Science B.S.E</div>
                                </div>
                                <div className="bottom">
                                <a className="btn2 btn-dark btn-sm" rel="publisher" href="https://www.linkedin.com/in/derek-sawicki/">
                                    <i className="fab fa-linkedin-in"> </i>
                                </a>
                                </div>
                            </div>

                        </div>

        	</div>
        </div>




      </div>
    );
  }
}

export default Home;
