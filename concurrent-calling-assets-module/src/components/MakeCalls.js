import React, { Component } from 'react'
import axios from 'axios';
import { CallingBar } from './CallingBar';
import ShowDuration from './ShowDuration';

const SIPml = window.SIPml;
let phoneNumber1 = "+919177245806";
let callId1 = "";
let value = "";
let status = "";
let status2 = "";
let callConnected = false;
let connectedTime = "";
let terminatedTime = "";
let callDuration = "00:00";
let callTimer = null;
let duration = "";
let displayDuration = false;
let showDuration = "";

export class MakeCalls extends Component 
{
  
constructor(props)
{
  super(props);
  this.state = {
    callTimer: null,
    callDuration: "0:00",
    random: 'abc',
    stateDuration: "0:00",
  }
};

  callPhoneNumber = (phoneNumber) =>
  {
    console.log("Call the Phone Number : ",phoneNumber);
  }

  endCall = () =>
  {
    if(this.callSession)
    {
      this.callSession.hangup({ events_listener: { events: '*', listener: this.sessionEventsListener} });
    }
    this.isEnded = false;
    this.callbarColor = '#C5D0DE';
    this.endTimer();
    if(this.callConnected == false) {
      this.callConnectionStatus = 'missed';
    }
  }

  updateStatus = (status) =>
  {
    console.log("In Update Status Method: "+ status);
    callId1 = this.props.callId1;
    let data = {
      "status": status
    }
    axios.put('/call-details/status/'+callId1,data)
      .then(response => {
        console.log(response);
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log(error)
      })
      let hello = "abcdefg";      
  }
    
  callEventsListener = (e) => 
  {
    console.log("abc",this);
    this.setState({
      random: '1111'
    })
    let that = this;
    console.log("777getSipResponseCode : " + e.getSipResponseCode());
    console.info(
    ">>>>> Call session event = " +
    e.type +
    " Response code " +
    e.getSipResponseCode() +
    " Description: " +
    e.description
    );
    if(e.type === "connecting")
    {
      console.log("Connecting to the customer!");
      status = "Connecting";
      this.props.onStatusChange(this.props.callId1,this.props.phoneNumber1,status);
      this.callConnected = false;
      // this.updateStatus(status);
    }

    if (e.type === "connected") 
    {
      console.log("the person has picked up");
      status = "Connected";
      connectedTime = new Date().toLocaleString();
      console.log("Connected Time : "+connectedTime);

      // this.updateStatus(status);
      this.callConnected = true;
      this.displayDuration = true;
      callConnected = true;
      this.props.callConnected();
      this.props.onStatusChange(this.props.callId1,this.props.phoneNumber1,status);
      this.test();
      console.log("xyz123",that)
      that.setState({
        random: 'adasd'
      },() => {
        console.log("hellllllllo")
      })
      console.log("xyz",that)
      this.startTimer();
      //EventBus.$emit("startTranscriptionEvent");
    }
    else if(e.getSipResponseCode() === 180)
    {
      status = "Ringing";
      this.props.onStatusChange(this.props.callId1,this.props.phoneNumber1,status);
    }
    else if(e.getSipResponseCode() === 181)
    {
      status = "Call Is Being Forwarded";
      this.props.onStatusChange(this.props.callId1,this.props.phoneNumber1,status);
    }
    else if(e.getSipResponseCode() === 202)
    {
      status = "Call Accepted";
      this.props.onStatusChange(this.props.callId1,this.props.phoneNumber1,status);
    }
    if(e.getSipResponseCode() === 486)
    {
      status = "Calle Is Busy";
      this.props.onStatusChange(this.props.callId1,this.props.phoneNumber1,status);
    }
    if(e.getSipResponseCode() === 487)
    {
      status = "Request Terminated";
      this.props.onStatusChange(this.props.callId1,this.props.phoneNumber1,status);
    }
    else if(e.getSipResponseCode() === 600)
    {
      status = "Busy Everywhere";
      this.props.onStatusChange(this.props.callId1,this.props.phoneNumber1,status);
    }
    else if(e.getSipResponseCode() === 603)
    {
      status = "Busy Everywhere";
      this.props.onStatusChange(this.props.callId1,this.props.phoneNumber1,status);
      this.updateStatus(status);
      this.endCall();
    }
    
    else if (e.type === "terminated") 
    {
        status = "Call Terminated";
        status2 = "Call Terminated";
        terminatedTime = new Date().toLocaleString();
        console.log("Terminated Time : "+terminatedTime);
        this.props.onStatusChange(this.props.callId1,this.props.phoneNumber1,status);
        this.updateStatus(status);
        this.endCall();
        this.endTimer();
      console.log("terminated123 "+status);
    }
   
    else if (e.getSipResponseCode() === 480) 
    {
      console.log("call-missed");
      callConnected = false;

      //this.endCall();
      status = "Call Missed";
      status2 = "Call Terminated";
    //  console.log("getSipResponseCode : "+e.getSipResponseCode());
    //  console.log("getSipResponseCode : "+status);
    this.props.onStatusChange(this.props.callId1,this.props.phoneNumber1,status);
      this.updateStatus(status);
      this.endCall();
    }

    if(connectedTime !== "" && terminatedTime !== "")
    {
        duration = terminatedTime - connectedTime;
        console.log("Duration : "+duration);
    }

    console.log("Status1234567 : "+status);
    console.log("7779getSipResponseCode : "+e.getSipResponseCode());
  }
    
  test = () => {
    console.log('1111',this.state.random);
    this.setState({
      random: 'ppppp'
    },() => {

    console.log('1112222',this.state.random);
    })
  }
  
  makeCall = () => 
  {
    console.log("in make call function");
    this.callSession = this.sipStack.newSession("call-audio", {
      audio_remote: document.getElementById("audio-remote"),
      events_listener: { events: "*", listener: this.callEventsListener } // optional: '*' means all events
    });
    this.callSession.call(phoneNumber1);
  }    

  sessionEventsListener = e =>
  {
    console.info(">>>session event = " + e.type);
    if (e.type === "connected" && e.session === this.registerSession) 
    {
      console.log("session connected. Making a call");
      this.makeCall();
    }
    console.info(">>>session eeevent = " + e.type);
    if(e.type === "terminated" && e.session === this.registerSession)
    {
      console.log("session terminatedddd");
    }
    if(e.getSipResponseCode() === 486)
    {
      status = "Calle Is Busy";
      this.props.onStatusChange(this.props.phoneNumber1,status);
    }
    if(e.getSipResponseCode() === 487)
    {
      status = "Request Terminated";
      this.props.onStatusChange(this.props.phoneNumber1,status);
    }

  }
    
  login = () =>
  {
    this.registerSession = this.sipStack.newSession("register", {
    events_listener: { events: "*", listener: this.sessionEventsListener.bind(this) } // optional: '*' means all events
    });
    console.log("in login funcion... calling registerSession.register()");
    this.registerSession.register();
  }
    
  sipStackEventsListener = e =>
  {
    console.log(">>>sip stack events listener Event: " + e.type);
    if (e.type === "started") 
    { 
      console.log("sip stack started... next step is calling login()");
      this.login();
    }
  };
    
  createSipStack = () =>
  {
    console.log("in create sip stack method");
    console.log("value2"+value);
    this.sipStack = new SIPml.Stack({
    realm: "172.16.17.205", // mandatory: domain name
    impi: "sipML5", // mandatory: authorization name (IMS Private Identity)
    impu: "sip:sipML5@172.16.17.205", // mandatory: valid SIP Uri (IMS Public Identity)
    password: "test123", // optional
    display_name: "legend", // optional
    ice_server: '[]',
    websocket_proxy_url: "wss://172.16.17.205:8089/ws", // optional
    //outbound_proxy_url: 'udp://example.org:5060', // optional
    //enable_rtcweb_breaker: false, // optional
    events_listener: { events: "*", listener: this.sipStackEventsListener }, // optional: '*' means all events
    sip_headers: 
    [
      {
        name: "numbers",
        //value:value   
        //value: "PJSIP/+919177245806@twilio0&PJSIP/+918639952988@twilio1&PJSIP/+919100679394@twilio2,20"
        value: "PJSIP/+918501880330@twilio1"
      },
      {
        name: "number2",
        value: "PJSIP/+918639952988@twilio1"
      }
    ]
    });
  }

  readyCallback = e => 
  {
    this.createSipStack();
  }
      
  errorCallback = e => 
  {
    console.error("Failed to initialize the engine: " + e.message);
  }
    
  makeSIPCall = () => 
  {
    console.log("In MAkeSIPCall Function");
    phoneNumber1 = "+91"+this.props.phoneNumber1;
    callId1 = this.props.callId1;
    console.log("PhoneNumber1 : "+phoneNumber1);
    console.log("CallId1 : "+callId1);
    SIPml.init(this.readyCallback, this.errorCallback);
    if(this.sipStack == null)
    {
      this.createSipStack();
    }
    this.sipStack.start();
  }
      
  call = () =>
  {
    console.log("In call Function!");
    value = "PJSIP/+91" + this.props.value + "@twilio0";
    this.makeSIPCall();
    console.log("Call Made ");
  }

  startTimer = () =>
  {
    console.log("Timer started");
    var time = 0;
    callTimer = setInterval(() => {
      //let time = 0;
    time += 1;
    var hours = Math.trunc(time/3600) > 0 ? Math.trunc(time/3600)+':' : '';
    var minutes = Math.trunc(time/60) > 0 ? Math.trunc(time/60) : '0';
    var seconds = time % 60;
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    callDuration = '' + hours + minutes + ':' + seconds;
    console.log("Call Duration: "+callDuration);
    this.props.callDuration(callDuration); 
  //  this.showDuration(callDuration);
  //  this.setState({ stateDuration: callDuration});
  //  console.log("State Duration : " +this.state.stateDuration);
    },1000);

    console.log("After set interval : "+callDuration);

   }

  // Stop the timer
  endTimer = () =>
  {
      clearInterval(callTimer);
      this.props.callDuration(callDuration);
      console.log('Timer Ended! Duration : '+callDuration);
      let dueDate = "Completed";
      console.log("CT : "+connectedTime + " D : "+callDuration+ " dueDate : "+dueDate);
      const data = {
        "createdDate": connectedTime,
        "duration": callDuration,
        "dueDate": dueDate
      }
      axios.put('/call-details/update-connectedtime-duration-duedate/'+callId1,data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() 
  {
    console.log("In Make Calls \n CallNumbersList : "+this.props.callNumbersList);
    console.log("Index : "+this.props.index+" Value : "+this.props.value);
    callId1 = this.props.callId1;
    console.log("Make Calls : callId1 : "+callId1);
    console.log()
    if(this.displayDuration)
    {
      showDuration = (
        <ShowDuration callDuration = { callDuration }/>
      );
    }
    return (
      <div>
      { () => this.props.display("hello123") }
        { this.call() } 
        { this.showDuration }
       </div>
    )
  }
}
export default MakeCalls;
