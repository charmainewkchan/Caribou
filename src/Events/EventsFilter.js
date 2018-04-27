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
      NN: false,
      sort_by: "date_asc"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleChange(event) {
    this.props.onClubFilterChange(event);
    console.log(event.target.checked);
    this.setState({
      [event.target.name]: event.target.checked
    });
  }

  handleSort(event) {
    this.setState({
      sort_by : event.target.name
    });


  }


  render() {
    return (
        <div className = "Events-filter container">
          <form>
            <h2>Eating Club</h2>
            <div className="form-group">
            {
              Object.keys(this.state).map(function(key, index) {
                return (
                  <div className="form-check">
                     <input className="form-check-input" type="checkbox" checked={this.state[key]} name={key} id={key} onChange={this.handleChange}/>
                     <label className="form-check-label" for={key}>
                        {eating_club_map[key]}
                     </label>
                  </div>
                );
              }, this)
            }
            <br/>
            <h2>Sort By</h2>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="date_asc" id="date_asc" value="date_asc" checked={this.state.sort_by=="date_asc"} onChange={this.handleSort}/>
              <label className="form-check-label" for="date_asc">
                Date ascending
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="date_des" id="date_des" value="date_des" checked={this.state.sort_by=="date_des"} onChange={this.handleSort}/>
              <label className="form-check-label" for="date_des">
                Date descending
              </label>
            </div>


            </div>
          </form>
        </div>
    );
  }
}

export default EventsFilter;
