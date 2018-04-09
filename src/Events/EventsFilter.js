import React, { Component } from 'react';
import events_data from './events.json';
import '../App.css';

class EventsFilter extends Component {
  constructor(props) {
    super(props)
    this.state={Tower: false};

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
            <h2>Filter Panel</h2>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.tower} name="Tower" id="Tower" onChange={this.handleChange}/>
                <label className="form-check-label" for="Tower">
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
