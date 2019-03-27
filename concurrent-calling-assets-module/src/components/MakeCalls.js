import React, { Component } from 'react'

const SIPml = window.SIPml;
let phoneNumber1 = "+919100679394";
let value="";
export class MakeCalls extends Component {
    
    state = {
        value : ""
    }

      callPhoneNumber = (phoneNumber) =>
      {
        console.log("Call the Phone Number : ",phoneNumber);
      };
    
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
    
      makeCall = () => 
      {
        console.log("in make call function");
        this.callSession = this.sipStack.newSession("call-audio", {
          audio_remote: document.getElementById("audio-remote"),
          events_listener: { events: "*", listener: this.callEventsListener } // optional: '*' means all events
        });
        this.callSession.call(phoneNumber1);
      };
    
      sessionEventsListener = e =>
      {
        console.info(">>>session event = " + e.type);
        if (e.type === "connected" && e.session === this.registerSession) 
        {
          console.log("session connected. Making a call");
          this.makeCall();
        }
      };
    
      login = () =>
      {
        this.registerSession = this.sipStack.newSession("register", {
          events_listener: { events: "*", listener: this.sessionEventsListener } // optional: '*' means all events
        });
        console.log("in login funcion... calling registerSession.register()");
        this.registerSession.register();
      };
    
      sipStackEventsListener = e =>
      {
        console.log(">>>sip stack events listener Event: " + e.type);
        if (e.type === "started") {
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
          /*sip_headers: [ // optional
                            { name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.0.0.0' },
                            { name: 'Organization', value: 'Doubango Telecom' }
                    ]*/
    
          sip_headers: [
            {
              name: "numbers",
             //value: "PJSIP/+919177245806@twilio0&PJSIP/+918639952988@twilio1&PJSIP/+919100679394@twilio2,20"
             value:value   
             //value:this.state.value
            }
            //{ name: "UID", value: generateUID(), session: true }
          ]
        });
      };
      readyCallback = e => {
        this.createSipStack();
      };
      errorCallback = e => 
      {
        console.error("Failed to initialize the engine: " + e.message);
      };
    
      makeSIPCall = () => 
      {
        SIPml.init(this.readyCallback, this.errorCallback);
        this.sipStack.start();
      };
      
      call = (value) =>
      {
          console.log("make calls :"+value);
          
          console.log("concole value : "+this.state.value);
        this.makeSIPCall();
      };
componentWillMount(){this.setState({value: this.props.value});
value=this.props.value;}
  render() {
      console.log("props"+this.props.callNumbersList);
      //value=this.props.value;
    return (
      <div>
          {this.call(this.props.value)}
      </div>
    )
  }
}


export default MakeCalls;
