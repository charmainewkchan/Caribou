import React, { Component } from 'react';
import events_data from './events.json';
import '../App.css';

class EventsFilter extends Component {
  render() {
    return (
        <div className = "Events-filter container">
          <form>
            <h2>Filter Panel</h2>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                <label className="form-check-label" for="defaultCheck1">
                  Tower
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                <label className="form-check-label" for="defaultCheck1">
                  Colonial
                </label>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

export default EventsFilter;
