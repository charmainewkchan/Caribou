import React, { Component } from 'react';
import Header from './Header'
import Main from './Main'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import './App.css';


import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt'
import faCog from '@fortawesome/fontawesome-free-solid/faCog'
import faAddressBook from '@fortawesome/fontawesome-free-solid/faAddressBook'
import faCalendarAlt from '@fortawesome/fontawesome-free-solid/faCalendarAlt'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'

fontawesome.library.add(faUser, faPencilAlt, faTrashAlt, faAddressBook, faCog, faCalendarAlt, faBars)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
