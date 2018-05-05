import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import res_college_map from './res_college_map.json'


class User extends Component {

	constructor(){
		super()
    this.state = {
      fields: {}
    }
	}

  componentDidMount(){
    // reload the data
		const netid = this.props.match.params.netid;
    const url = "https://bixr.herokuapp.com/api/user/" + netid + "/";
		console.log(url);

		axios.get(url).then(res => {
      console.log(res.data);
      this.setState({
        fields: res.data[0].fields
      });
    });
  }



  render() {
    return (
      <div className="user-page">
        <div className="container">
        <div className="user-page-header">
          <h2>{this.state.fields.first_name} {this.state.fields.last_name}</h2>

        </div>

    	  <div className="user-page-body">
          <p>Class of {this.state.fields.year}</p>
          <p>{res_college_map[this.state.fields.res_college]}</p>
        </div>
      </div>
      </div>

    )
  }
}

export default User;
