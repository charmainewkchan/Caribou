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
        <button onClick={()=> this.props.changePage(0) }>first</button>
        <button onClick={()=> this.props.changePage(this.props.currentPage-1) }>previous</button>
        <p>Page {this.props.currentPage} of {this.props.numPages}</p>
        <button onClick={()=> this.props.changePage(this.props.currentPage+1) }>next</button>
        <button onClick={()=> this.props.changePage(this.props.numPages-1) }>last</button>
      </div>
    );
  }
}

export default Pagination;