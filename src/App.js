import React, { Component } from 'react';
import Header from './Header'
import Main from './Main'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import './App.css';

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
