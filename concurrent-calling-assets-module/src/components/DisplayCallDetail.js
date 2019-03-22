import React, { Component } from 'react'
import './../css/DisplayCallDetail.css';
const SIPml = window.SIPml;
const phoneNumber1 = "+919100679394";

export class DisplayCallDetail extends Component
 {

  callPhoneNumber = (phoneNumber) =>
  {
    console.log("Call the Phone Number : ",phoneNumber);
  }
  callEventsListener = e => {
    console.info(
      ">>>>> Call session event = " +
        e.type +
        " Response code " +
        e.getSipResponseCode() +
        " Description: " +
        e.description
    );
    if (e.type === "connected") {
      console.log("the person has picked up");
      this.callConnected = true;
      //      this.startTimer();
      //EventBus.$emit("startTranscriptionEvent");
    } else if (e.type === "terminated") {
      //this.endCall();
    } else if (e.getSipResponseCode() === 480) {
      console.log("call-missed");
      //this.endCall();
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
    if (e.type === "connected" && e.session === this.registerSession) {
      console.log("session connected. Making a call");
      this.makeCall();
    }
  };
  login = () => {
    this.registerSession = this.sipStack.newSession("register", {
      events_listener: { events: "*", listener: this.sessionEventsListener } // optional: '*' means all events
    });
    console.log("in login funcion... calling registerSession.register()");
    this.registerSession.register();
  };
  sipStackEventsListener = e => {
    console.log(">>>sip stack events listener Event: " + e.type);
    if (e.type === "started") {
      console.log("sip stack started... next step is calling login()");
      this.login();
    }
  };
  createSipStack = () => {
    console.log("in create sip stack method");
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
      /*sip_headers: [ // optional
                        { name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.0.0.0' },
                        { name: 'Organization', value: 'Doubango Telecom' }
                ]*/

      sip_headers: [
        {
          name: "numbers",
          value: "PJSIP/+918639952988@twilio1&PJSIP/+919100679394@twilio2,20"
        }
        //{ name: "UID", value: generateUID(), session: true }
      ]
    });
  };
  readyCallback = e => {
    this.createSipStack();
  };
  errorCallback = e => {
    console.error("Failed to initialize the engine: " + e.message);
  };
  makeSIPCall = () => {
    SIPml.init(this.readyCallback, this.errorCallback);
    this.sipStack.start();
  };
  call = (pn) => {
      console.log(pn);
      this.makeSIPCall();
  };
  render() 
  {
    const callDetail = this.props.callDetail;
    return (
        <div>
            <td> { callDetail.id } </td>
            <td> { callDetail.checked } <input type="checkbox" /> </td> 
            <td> { callDetail.contactName } </td>
            <td onClick = { () => this.call(callDetail.phoneNumber) }> { callDetail.phoneNumber } </td>
            <td> { callDetail.status } </td>
            <td> { callDetail.dueDate } </td>
            <td> <button className = "delete-button"
                 onClick = { () => this.props.deleteCallDetail(callDetail.id) }>
                 Delete
                 </button></td>
        </div>
    )
  }
}

export default DisplayCallDetail;
