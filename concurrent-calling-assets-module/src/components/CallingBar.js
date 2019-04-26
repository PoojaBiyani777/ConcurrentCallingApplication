import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import './../css/CallingBar.css';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

let connectedPhoneNumber = "";
let connectedId = "";
let connectedStatus = "";
let nowTime = null;
let callDuration = "00:00";
let callTimer = null;
let displayDuration = "";

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
    fontSize: "13px",
    fontFamily: "Roboto"
  },

  time:
  {
    fontSize: "13px",
    float: "left",
    paddingTop: "5px",
    color: "white",
    paddingLeft: "440px",
    fontFamily: "Roboto"
  },

  hangUpIcon:
  {
    marginLeft: "300px",
  },

  recording:
  {
    marginLeft: "450px",
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
    this.state = {
      curTime : null
    }
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
    console.log("Calling Bar Handle End Call");
    if(this.props.phoneNumberClicked === "false")
    {
        this.endTimer();
    }
    this.props.handleEndIcon();
      
  }

  componentDidMount = () =>
  {
    
    axios.get('http://localhost:8080/call-details')
    .then(res => {
    console.log(res);
    })

    console.log("In Display Time!");
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    },1000)
    setInterval( () => {
      nowTime = new Date().toLocaleString()
    },1000)
    console.log("Current Time " + this.state.curTime);
    console.log("Now Time : "+nowTime);
    
   const id = connectedId
    const phoneNumber =  connectedPhoneNumber
    const status = connectedStatus
    console.log("Connected Id : "+id+" Connected phoneNumber : "+phoneNumber+" Connected Status : "+status);
    console.log("Is Phone Numeber Clicked ? - "+this.props.phoneNumberClicked);
    if(this.props.phoneNumberClicked === "false")
    {
      this.startTimer();
    }
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

  displayTime = () =>
  {
    console.log("hello")
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    },1000)
    setInterval( () => {
      nowTime = new Date().toLocaleString()
    },1000)
    console.log("Current Time " + this.state.curTime);
    console.log("Now Time : "+nowTime);
    
  }

  startTimer = () =>
  {
    console.log("Calling Bar Timer started");
    var time = 0;
    callTimer = setInterval(() => {
      //let time = 0;
    time += 1;
    var hours = Math.trunc(time/3600) > 0 ? Math.trunc(time/3600)+':' : '';
    var minutes = Math.trunc(time/60) > 0 ? Math.trunc(time/60) : '0';
    var seconds = time % 60;
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    callDuration = '' + hours + minutes + ':' + seconds;
   // console.log("Calling Bar Call Duration: "+callDuration);
  //  this.props.callDuration(callDuration); 
 //   this.showDuration(callDuration);
 //   this.setState({ stateDuration: callDuration});
 //   console.log("State Duration : " +this.state.stateDuration);
    },1000);

    console.log("After set interval : "+callDuration);

   }

  // Stop the timer
  endTimer = () =>
  {
      clearInterval(callTimer);
     // this.props.callDuration(callDuration);
      console.log('Calling Bar Timer Ended! Duration : '+callDuration);
  }

  
  render() 
  {
    const {classes} = this.props;
    connectedPhoneNumber = this.props.phoneNumber;
    connectedId = this.props.id;
    connectedStatus = "Call Rejected";
/*
    if(this.props.phoneNumberClicked === "false")
    {
      displayDuration = (<div className = { classes.time }> { callDuration } </div>)
    }
    */
  //  callDuration = this.props.callDuration;

    return (
      <div>  
        <Toolbar className = { classes.toolBar }>
            <div className = { classes.phoneNumber }>
              <div>Connected to { connectedPhoneNumber }</div>
              </div>  
            <div className = { classes.hangUpIcon }>
              <img 
              src = { require('./../static/Icn_end call/icn_End Call.png')} 
              onClick = { this.handleEndCall }
              />
            { this.updateStatus }
            </div>
            <div className = { classes.time }> Duration  { callDuration } 
            </div>
            
        </Toolbar>                          
      </div>
    )
  }
}

export default withStyles(styles)(CallingBar);
