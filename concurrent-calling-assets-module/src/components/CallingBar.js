import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import './../css/CallingBar.css';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

let connectedPhoneNumber = "";
let connectedId = "";
let connectedStatus = "";

const styles = theme => 
({
  toolBar: 
  {
    backgroundColor: "#00BE92",
    height: 80,
  },

  phoneNumber:
  {
    color: "white",
  },

  time:
  {
    fontSize: "30px",
    float: "left",
    paddingTop: "5px"
  },

  hangUpIcon:
  {
    marginLeft: "350px",
  },

  recording:
  {
    marginLeft: "400px",
  },

  mute: 
  {
    marginLeft: "20px"
  },

  keyPad:
  {
    marginLeft: "20px",

  },

  labels:
  {
    color: "white"
  }

});

export class CallingBar extends Component {

  constructor(props) 
  {
    super(props);
  }

  updateStatus = () =>
  {
    console.log(" In Update Status Handler! ");
    const id = connectedId
    const phoneNumber =  connectedPhoneNumber
    const status = connectedStatus
    console.log("Connected Id : "+id+" Connected phoneNumber : "+phoneNumber+" Connected Status : "+status);
    
  }

  handleEndCall = () =>
  {
    console.log(" In Update Status Handler! ");
    
    const id = connectedId
    const phoneNumber =  connectedPhoneNumber
    const status = connectedStatus
    console.log("Connected Id : "+id+" Connected phoneNumber : "+phoneNumber+" Connected Status : "+status);
    
    const data = {
      id,
      phoneNumber,
      status
    }
    /*
    axios.put('http://localhost:8080/call-details/'+id,data)
      .then(response => {
        console.log(response);
      })
      .catch(error =>{
        console.log(error);
      })
      
      */
    console.log("Calling Bar Handle End Call");
    this.props.handleEndCall();
      
  }

  componentDidMount = () =>
  {
    
    axios.get('http://localhost:8080/call-details')
    .then(res => {
    console.log(res);
    })
    
   const id = connectedId
    const phoneNumber =  connectedPhoneNumber
    const status = connectedStatus
    console.log("Connected Id : "+id+" Connected phoneNumber : "+phoneNumber+" Connected Status : "+status);
    
    const data = {
      id,
      phoneNumber,
      status
    }
    /*
    axios.put('http://localhost:8080/call-details/'+id,data)
      .then(response => {
        console.log(response);
      })
      .catch(error =>{
        console.log(error);
      })
    */
  }

  render() 
  {
    const {classes} = this.props;
    connectedPhoneNumber = this.props.phoneNumber;
    connectedId = this.props.id;
    connectedStatus = "Call Rejected";
    return (
      <div>  
        <Toolbar className = { classes.toolBar }>
            <div className = { classes.phoneNumber }>
              <div>Connected to: { connectedPhoneNumber }</div>
              <div className = { classes.time }> 0:07 </div>
            </div>  
            <div className = { classes.hangUpIcon }>
              <img 
              src = { require('./../static/Icn_end call/icn_End Call.png')} 
              onClick = { this.handleEndCall }
              />
            { this.updateStatus }
            </div>
            <div className = { classes.recording }>
              <img src = { require('./../static/icn_recording/icn_recording.png')} />
              <div className = { classes.labels }>
                Recording
              </div>
            </div>
            <div className = { classes.mute }>
              <img src = { require('./../static/icn_mute/icn_mute.png')} />
              <div className = { classes.labels }>
                Mute
              </div>
            </div>
            <div className = { classes.keyPad }>
              <img src = { require('./../static/icn_keypad/icn_keypad.png')} />
              <div className = { classes.labels }>
                KeyPad
              </div>
            </div>
        </Toolbar>                          
      </div>
    )
  }
}

export default withStyles(styles)(CallingBar);
