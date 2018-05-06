import React, { Component } from 'react';
import Header from './Header'
import Main from './Main'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { withRouter } from 'react-router-dom';
import './App.css';


import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import faSave from '@fortawesome/fontawesome-free-solid/faSave'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt'
import faCog from '@fortawesome/fontawesome-free-solid/faCog'
import faAddressBook from '@fortawesome/fontawesome-free-solid/faAddressBook'
import faCalendarAlt from '@fortawesome/fontawesome-free-solid/faCalendarAlt'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown'
import faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight'
import faAngleDoubleRight from '@fortawesome/fontawesome-free-solid/faAngleDoubleRight'
import faAngleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft'
import faAngleDoubleLeft from '@fortawesome/fontawesome-free-solid/faAngleDoubleLeft'

fontawesome.library.add(faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight, faAngleRight,
						faUser, faPencilAlt, faTrashAlt,faSave, faAddressBook, faCog, faCalendarAlt,
						faBars,faCaretDown,faPlus)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <div className="footer">Bixr 2018</div>
      </div>
    );
  }
}

export default withRouter(App);
