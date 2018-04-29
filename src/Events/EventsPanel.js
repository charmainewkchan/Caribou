import React, { Component } from 'react';

import '../App.css';

class EventsPanel extends Component {
  constructor(props) {
    super(props)

  }
  /*

          <div className="row d-block d-md-none">
          <DropDownBar id="filter"><EventsFilter sort_by={this.state.sort.field+"-"+(this.state.sort.ascending?"1":"0")} setSort={this.setSort} onClubFilterChange={this.onClubFilterChange}/></DropDownBar>
        </div>

        <div className="row mt-2">
          <div className= "col-3 d-none d-md-block">
           <EventsFilter setSort={this.setSort} sort_by={this.state.sort.field+"-"+(this.state.sort.ascending?"1":"0")}  onClubFilterChange={this.onClubFilterChange}/>
          </div>
*/

  render() {
    return( 
        <div>
          <ul>
            <li>Create an Event</li>
            <hr/>
            <li>Events</li>
            <li>Hosting</li>
            <hr/>
            <li>Filter</li>
          </ul>
        </div>
      );
  }
}

export default EventsPanel;
