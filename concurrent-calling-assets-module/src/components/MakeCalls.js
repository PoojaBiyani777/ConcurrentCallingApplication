import React, { Component } from 'react'

const SIPml = window.SIPml;
let phoneNumber1 = "+919177245806";
let value = "";
let status = "";
let status2 = "";
let callConnected = false;

export class MakeCalls extends Component 
{
  state = {
    value : ""
  }

  callPhoneNumber = (phoneNumber) =>
  {
    console.log("Call the Phone Number : ",phoneNumber);
  }

  endCall = () =>
  {
    let status1 = status;
    status = "";
    this.props.callConnected(status1);
  }
    
  callEventsListener = e => 
  {
    console.info(
    ">>>>> Call session event = " +
    e.type +
    " Response code " +
    e.getSipResponseCode() +
    " Description: " +
    e.description
    );
    if (e.type === "connected") 
    {
      console.log("the person has picked up");
      status = "the person has picked up status!";
      this.callConnected = true;
      callConnected = true;
      //      this.startTimer();
      //EventBus.$emit("startTranscriptionEvent");
    }
    else if (e.type === "terminated") 
    {
      //this.endCall();
      if(status == "")
      {
        status = "Rejected Status!";
      }
      status2 = "terminated";
      this.endCall();
    }
    else if (e.getSipResponseCode() === 480) 
    {
      console.log("call-missed");
      callConnected = false;

      //this.endCall();
      if(status == "")
      {
        status = "Call-missed Sattus!";
      }
      status2 = "terminated";
      this.endCall();
    }
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
    console.log("PhoneNumber1 : "+phoneNumber1);
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
        { this.call() }
      </div>
    )
  }
}
export default MakeCalls;
