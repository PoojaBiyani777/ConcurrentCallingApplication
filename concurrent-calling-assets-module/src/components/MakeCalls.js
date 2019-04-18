import React, { Component } from 'react'
import axios from 'axios';

const SIPml = window.SIPml;
let phoneNumber1 = "+919177245806";
let callId1 = "";
let value = "";
let status = "";
let status2 = "";
let callConnected = false;
let connectedTime = "";
let terminatedTime = "";
let duration = "";

export class MakeCalls extends Component 
{

constructor(props)
{
  super(props);
  this.state = {

  }
};

  callPhoneNumber = (phoneNumber) =>
  {
    console.log("Call the Phone Number : ",phoneNumber);
  }

  endCall = () =>
  {
    let status1 = status;
    status = "";
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
      this.props.onStatusChange(this.props.phoneNumber1,status);
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
      callConnected = true;
      this.props.callConnected();
      this.props.onStatusChange(this.props.phoneNumber1,status);
      //      this.startTimer();
      //EventBus.$emit("startTranscriptionEvent");
    }
    else if(e.getSipResponseCode() === 180)
    {
      status = "Ringing";
      this.props.onStatusChange(this.props.phoneNumber1,status);
    }
    else if(e.getSipResponseCode() === 181)
    {
      status = "Call Is Being Forwarded";
      this.props.onStatusChange(this.props.phoneNumber1,status);
    }
    else if(e.getSipResponseCode() === 202)
    {
      status = "Call Accepted";
      this.props.onStatusChange(this.props.phoneNumber1,status);
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
    else if(e.getSipResponseCode() === 600)
    {
      status = "Busy Everywhere";
      this.props.onStatusChange(this.props.phoneNumber1,status);
    }
    else if(e.getSipResponseCode() === 603)
    {
      status = "Busy Everywhere";
      this.props.onStatusChange(this.props.phoneNumber1,status);
    }
    
    else if (e.type === "terminated") 
    {
        status = "Call Terminated";
        status2 = "Call Terminated";
        terminatedTime = new Date().toLocaleString();
        console.log("Terminated Time : "+terminatedTime);
        this.updateStatus(status);
        this.endCall();
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
    events_listener: { events: "*", listener: this.sessionEventsListener } // optional: '*' means all events
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




    //phoneNumber1=phoneNumber1.slice(3, phoneNumber1.length);
   /* if( this.props.index == 0 )
    {
      console.log("Entered if block ");
      SIPml.init(this.readyCallback, this.errorCallback);
      this.sipStack.start();
    }
    else
    {
      console.log("Entered Else block ");
      this.makeCall();
    }
    */
  }
      
  call = () =>
  {
    console.log("In call Function!");
    value = "PJSIP/+91" + this.props.value + "@twilio0";
    this.makeSIPCall();
    console.log("Call Made ");
  }
 
  render() 
  {
    console.log("In Make Calls \n CallNumbersList : "+this.props.callNumbersList);
    console.log("Index : "+this.props.index+" Value : "+this.props.value);
    return (
      <div>
      { () => this.props.display("hello123") }
        { this.call() }
      </div>
    )
  }
}
export default MakeCalls;
