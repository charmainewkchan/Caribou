import React, { Component } from 'react';
import events_data from './events.json';
import eating_club_map from './eating_club_map.json';
import '../App.css';

class EventsFilter extends Component {
  constructor(props) {
    super(props)
    this.state={
        TO: false,
        CA: false,
        TI: false,
        CN: false,
        IV: false,
        CT: false,
        QD: false,
        CO: false,
        CL: false,
        TE: false,
        CH: false,
        NN: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    console.log("tt")
        console.log(this.props.sort_by);
    console.log(this.props.sort_by=="pk-1");
  }

  handleChange(event) {
    this.props.onClubFilterChange(event);
    console.log(event.target.name);

    this.setState({
        [event.target.name]: event.target.checked
    });
  }

  handleSort(event) {
    var mode = event.target.name.split("-");
    var field = mode[0];
    var asc = mode[1];
    this.props.setSort(asc, field)
  }


  render() {
         return( 
          <div className="Events-filter">
            <h2>Eating Club Filter</h2>
            <hr/>
            <div className="form-group row">
            {
  
              Object.keys(this.state).map(function(key, index) {
                return (
                  <div className="form-check col-6">
                     <input className="d-inline" type="checkbox" checked={this.state[key]} name={key} id={key} value={this.state[key]} onChange={this.handleChange}/>
                     <label className="d-inline" htmlFor={key}>
                        {eating_club_map[key]}
                     </label>
                  </div>
                );
              }, this)
            }
            </div>
          </div>)
  }
}

export default EventsFilter;


/*
            <h2>Sort By</h2>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="date-1" id="date-1" value="date-1" checked={this.props.sort_by==="date-1"} onChange={this.handleSort}/>
              <label className="form-check-label" htmlFor="date-1">
                Date (ascending)
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="date-0" id="pk-0" value="date-0" checked={this.props.sort_by==="date-0"} onChange={this.handleSort}/>
              <label className="form-check-label" htmlFor="date-0">
                Date (descending)
              </label>
            </div>

             <div className="form-check">
              <input className="form-check-input" type="radio" name="eating_club-1" id="eating_club-1" value="eating_club-1" checked={this.props.sort_by==="eating_club-1"} onChange={this.handleSort}/>
              <label className="form-check-label" htmlFor="eating_club-1">
                Eating club (ascending)
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="eating_club-0" id="eating_club-0" value="eating_club-0" checked={this.props.sort_by==="eating_club-0"} onChange={this.handleSort}/>
              <label className="form-check-label" htmlFor="eating_club-0">
                Eating club (descending)
              </label>
            </div>

            */