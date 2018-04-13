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
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onClubFilterChange(event);
    console.log(event.target.checked);
    this.setState({
      [event.target.name]: event.target.checked
    });
  }


  render() {
    return (
        <div className = "Events-filter container">
          <form>
            <h2>Apply Filter</h2>
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
            </div>
          </form>
        </div>
    );
  }
}

export default EventsFilter;
