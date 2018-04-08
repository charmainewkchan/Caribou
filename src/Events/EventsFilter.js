import React, { Component } from 'react';
import events_data from './events.json';
import '../App.css';

class EventsFilter extends Component {
  constructor(props) {
    super(props)
    this.state={value: 'false'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onLocationFilterChange(event.target.value);
    //this.setState({value: event.target.value});
  }

  render() {
    return (
        <div className = "Events-filter container">
          <form>
            <h2>Filter Panel</h2>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="this.state.value" id="defaultCheck1" onChange={this.handleChange}/>
                <label className="form-check-label" for="defaultCheck1">
                  Tower
                </label>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

export default EventsFilter;
