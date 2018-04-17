import React, { Component } from 'react';
import eating_club_map from 'Events/eating_club_map.json';
import '../App.css';

class MyEvents extends Component {
  constructor(props) {
    super(props)
    this.state={
      myEvents: []
    };

    /*this.handleDelete = this.handleDelete.bind(this);*/
  }

  componentDidMount() {
    const netid = localStorage.getItem('netid') + "/";
    const url = "https://bixr.herokuapp.com/api/get_events";

    axios.get(url,
    params:{ "Participant": netid}
            ).then(res => {
      console.log(res.data);
      this.setState({
        myEvents: res.data
      });
    });
  }



  render() {
    return (
        <div className="Events-panel">
        	<ul className="Events-list">
          {
        		this.props.myEvents.map(function(event){
              return <li className="Events-event">
                <div className="event-header">
                  <h2>{event.fields.title}</h2>
                  <p>{eating_club_map[event.fields.eating_club]} &bull; {event.fields.time}</p>
                </div>
                <p>{event.fields.description}</p>
                <button disabled={event.fields.attendance==event.fields.capacity} className="btn btn-secondary join-button" onClick={() => this.joinEvent(event.pk)}> Join </button>

              </li>;
            }, this)
          }
        	</ul>
        </div>
    );
  }
}

export default MyEvents;
