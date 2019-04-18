import React, { Component } from 'react'
import axios from 'axios';
import Modal from 'react-modal';
import SettingsEdit from './SettingsEdit';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '400px',
    width                 : '500px',
    backgroundColor       : '#E6E6E6'
  }
};

const closeButton = {
  content : {
    float: 'right',
    marginLeft:'100px'
  }
}

export class TaskBar extends Component 
{
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
    this.toggleOpen = this.toggleOpen.bind(this)
  }
 
  editSettings = () =>
  {
    console.log("Edit your Changes!");
    
    axios.get('http://localhost:8080/users/'+4)
    .then(response => 
      {
        console.log(response);
      })
      .catch(error =>
        {
          console.log(error);
        })
  }
  toggleOpen() {
    this.setState((prevState, props) => ({
      isOpen: !prevState.isOpen
    }))
  }
  render() {
    return (
      <div style = {{ textAlign: "center" }}>
        <h3 onClick={this.toggleOpen}>Settings</h3>
        <Modal isOpen={this.state.isOpen} style = {customStyles}>
        <button onClick={this.toggleOpen} style = {{backgroundColor: "red", float: "right"}}>x</button>
          <h1>Hello!</h1>
          <h3>You can change your profile here!</h3>
        </Modal>
      </div>
    )
  }
  /*
  render() 
  {
    return (
      <div>  
        <h4>All Tasks</h4> 
        <h4 onClick = { this.editSettings } >Settings</h4>
      </div>
    )
  }
  */
}

export default TaskBar
