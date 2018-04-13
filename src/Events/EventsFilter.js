import React, { Component } from 'react';
import events_data from './events.json';
import '../App.css';

class EventsFilter extends Component {
  constructor(props) {
    super(props)
    this.state={
      Tower: false,
      Cap: false,
      TigerInn: false,
      Canon: false,
      Ivy: false,
      Cottage: false,
      Quad: false,
      Colonial: false,
      Cloister: false,
      Terrace: false,
      Charter: false,
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
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.Tower} name="Tower" id="Tower" onChange={this.handleChange}/>
                <label className="form-check-label" for="Tower">
                  Tower
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.Cap} name="Cap" id="Cap" onChange={this.handleChange}/>
                <label className="form-check-label" for="Tower">
                  Cap and Gown
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.TigerInn} name="TigerInn" id="TigerInn" onChange={this.handleChange}/>
                <label className="form-check-label" for="TigerInn">
                  Tiger Inn
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.Canon} name="Canon" id="Canon" onChange={this.handleChange}/>
                <label className="form-check-label" for="Canon">
                  Canon
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.Ivy} name="Ivy" id="Ivy" onChange={this.handleChange}/>
                <label className="form-check-label" for="Ivy">
                  Ivy
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.Cottage} name="Cottage" id="Cottage" onChange={this.handleChange}/>
                <label className="form-check-label" for="Cottage">
                  Cottage
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.Quad} name="Quad" id="Quad" onChange={this.handleChange}/>
                <label className="form-check-label" for="Quad">
                  Quad
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.Colonial} name="Colonial" id="Colonial" onChange={this.handleChange}/>
                <label className="form-check-label" for="Colonial">
                  Colonial
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.Cloister} name="Cloister" id="Cloister" onChange={this.handleChange}/>
                <label className="form-check-label" for="Cloister">
                  Cloister
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.Terrace} name="Terrace" id="Terrace" onChange={this.handleChange}/>
                <label className="form-check-label" for="Terrace">
                  Terrace
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={this.state.Charter} name="Charter" id="Charter" onChange={this.handleChange}/>
                <label className="form-check-label" for="Charter">
                  Charter
                </label>
              </div>

            </div>
          </form>
        </div>
    );
  }
}

export default EventsFilter;
