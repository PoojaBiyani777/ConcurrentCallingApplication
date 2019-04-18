import React, { Component } from 'react';
import './App.css';
import DisplayCallDetails from './components/DisplayCallDetails';
import Header from './components/Header';
import { BrowserRouter ,Switch} from 'react-router-dom';
import MainTimeLine from './components/MainTimeLine';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

class App extends Component
{
  render() 
  {
    
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Switch>
            <Route exact path = "/" component = { DisplayCallDetails } />
            <Route exact path = '/timeline/:id/:phone_number'  component = { MainTimeLine } />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
