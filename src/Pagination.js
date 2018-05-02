import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import axios from 'axios';

class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }




  render() {
    return (
      <div>
        <div className="btn d-inline" onClick={()=> this.props.changePage(0) }><FontAwesomeIcon icon="angle-double-left" /></div>
        <div  className="btn d-inline" onClick={()=> this.props.changePage((this.props.currentPage-1<0?0:this.props.currentPage-1)) }><FontAwesomeIcon icon="angle-left" /></div>
        <p  className="btn d-inline" >Page {this.props.currentPage+1} of {this.props.numPages}</p>
        <div  className="btn d-inline" onClick={()=> this.props.changePage((this.props.currentPage+1>this.props.numPages-1?this.props.numPages-1:this.props.currentPage+1)) }><FontAwesomeIcon icon="angle-right" /></div>
        <div  className="btn d-inline" onClick={()=> this.props.changePage(this.props.numPages-1) }><FontAwesomeIcon icon="angle-double-right" /></div>
      </div>
    );
  }
}

export default Pagination;