import React, { Component } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
let SIPml = window.SIPml;
let phoneNumber1 = "+919177245806";
let length = "";
let value = "";
let sipStack = "";
let callSession = "";
let index = -1;
let type = "started";
let callConnected = false;
let status = "";
let status2 = "";
export class MakeCalls extends Component {
  callPhoneNumber = phoneNumber => {
    console.log("Call the Phone Number : ", phoneNumber);
  };
  endCall = () => {
    /*  if (this.callSession) {
      this.callSession.hangup({
        events_listener: { events: "*", listener: this.sessionEventsListener }
      });
    }*/
    let status1 = status;
    status = "";
    this.props.handleCall(status1);
  };
  callEventsListener = e => {
    console.info(
      ">>>>> Call session event = " +
        e.type +
        " Response code " +
        e.getSipResponseCode() +
        " Description: " +
        e.description
    );
    //status = e.type;
    if (e.type === "connected") {
      console.log("the person has picked up");
      status = "the person has picked up";
      callConnected = true;
      //  this.props.callConnected();
      //      this.startTimer();
      //EventBus.$emit("startTranscriptionEvent");
      //if (e.type === "terminated") this.sipStack.stop();
    }
    if (e.type === "terminated") {
      if (status == "") {
        status = "Rejected";
      }
      status2 = "terminated";
      this.endCall();
      // callConnected = false;
      //  this.sipStack.stop();
    }
    if (e.getSipResponseCode() === 480) {
      callConnected = false;
      console.log("call-missed");
      if (status == "") {
        status = "call-missed";
      }
      status2 = "terminated";
      this.endCall();
      //  this.sipStack.stop();
    }
  };

  makeCall = () => {
    console.log("in make call function");
    this.callSession = this.sipStack.newSession("call-audio", {
      audio_remote: document.getElementById("audio-remote"),
      events_listener: { events: "*", listener: this.callEventsListener } // optional: '*' means all events
    });
    this.callSession.call(phoneNumber1);
  };

  sessionEventsListener = e => {
    console.info(">>>session event = " + e.type);
    if (e.type === "connected") {
      console.log("session connected. Making a call");
      this.makeCall();
    }
  };

  login = () => {
    this.registerSession = this.sipStack.newSession("register", {
      events_listener: {
        events: "*",
        listener: this.sessionEventsListener
      } // optional: '*' means all events
    });
    console.log("in login funcion... calling registerSession.register()");
    this.registerSession.register();
  };

  sipStackEventsListener = e => {
    console.log(">>>sip stack events listener Event: " + e.type);
    //    console.log("number" + value);
    //  this.login();
    console.log("value3" + value);
    if (e.type === "started") {
      console.log("sip stack started... next step is calling login()");
      //console.log(callNumbersList);
      console.log("entered sipStackEventsListener");
      //  this.createSipStack("PJSIP/+91" + callNumbersList[i] + "@twilio0");
      this.login();
    } /* else if (e.type === "stopped" && index < length) {
      console.log("enteredeventstopped");
      type = "started";
      this.createSipStack();
      this.sipStack.start();
      //this.login();
    }*/
  };

  createSipStack = () => {
    console.log("in create sip stack method");
    console.log("value2" + value);
    //    let value = this.state.value
    /*  if (type == "started") {
      index = index + 1;
      value = "PJSIP/+91" + this.props.callNumbersList[index] + "@twilio0";
      console.log("finalvalu" + value + "type" + type + "index" + index);*/
    this.sipStack = new SIPml.Stack({
      realm: "172.16.17.100", // mandatory: domain name
      impi: "sipML5", // mandatory: authorization name (IMS Private Identity)
      impu: "sip:sipML5@172.16.17.100", // mandatory: valid SIP Uri (IMS Public Identity)
      password: "test123", // optional
      display_name: "legend", // optional
      websocket_proxy_url: "wss://172.16.17.100:8089/ws", // optional
      //outbound_proxy_url: 'udp://example.org:5060', // optional
      //enable_rtcweb_breaker: false, // optional
      events_listener: { events: "*", listener: this.sipStackEventsListener }, // optional: '*' means all events
      /*sip_headers: [ // optional
                            { name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.0.0.0' },
                            { name: 'Organization', value: 'Doubango Telecom' }
                    ]*/

      sip_headers: [
        {
          name: "Number",
          //value: "PJSIP/+919177245806@twilio0&PJSIP/+918639952988@twilio1&PJSIP/+919100679394@twilio2,20"
          value: value
          //value:this.state.value
        },
        {
          name: "length",
          value: length
        }
        //{ name: "UID", value: generateUID(), session: true }
      ]
    });
    /*  type = "stopped";
  }*/
  };
  readyCallback = e => {
    console.log("readyCallback");
    this.createSipStack();
  };
  errorCallback = e => {
    console.error("Failed to initialize the engine: " + e.message);
  };

  makeSIPCall = () => {
    //value = "PJSIP/+91" + number + "@twilio0";
    //  callNumbersList = callNumbersList;
    console.log("in call Function");
    //    console.log(this.state.callNumbersList);
    phoneNumber1 = this.props.value;
    if (this.props.index == 0) {
      SIPml.init(this.readyCallback, this.errorCallback);
      this.sipStack.start();
    } else {
      console.log("entered else");
      //  this.createSipStack();
      this.makeCall();
    }
  };

  call = () => {
    //  console.log("make calls :" + value);
    //value = "PJSIP/+919177245806@twilio0";
    //  console.log("concole value : " + value);
    /*for (let i = 0; i < callNumbersList.length; i++) {

    }*/
    console.log("called MakeCalls in componentDidMount");
    value = "PJSIP/+91" + this.props.value + "@twilio0";
    this.makeSIPCall();

    console.log("calledout");
  };
  /*  handleTimeLine = () => {
    let callConnected = this.state.callConnected;
    if (callConnected) {
      this.setState({
        callConnected: false
      });
    }
  };*/
  render() {
    //  console.log("props"+this.props.callNumbersList);
    //value=this.props.value;
    //console.log("MainTimeLine" + this.props.isMainTimeLineCalled);

    /*  if (!this.props.isMainTimeLineCalled) {

    } else {
      this.handleTimeLine();
    } */ this.call();

    return <div />;
  }
}

export default MakeCalls;
