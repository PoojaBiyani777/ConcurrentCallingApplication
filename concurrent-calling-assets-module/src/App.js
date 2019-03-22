import React, { Component } from 'react';
import './App.css';
import DisplayCallDetails from './components/DisplayCallDetails';

class App extends Component
{
  render() 
  {
    return (
      <div className="App">
        <h1>Multiple Calling Application</h1>
        <DisplayCallDetails callDetails/>
      </div>
    );
  }
}

export default App;
