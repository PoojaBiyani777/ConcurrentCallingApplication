import React, { Component } from "react";
import DisplayCallDetail from "./DisplayCallDetail";
import "../css/DisplayCallDetails.css";
import MakeCalls from "./MakeCalls";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import MainTimeLine from "./MainTimeLine";
//import withRo
import { Link, NavLink, Redirect } from "react-router-dom";

let callNumbers = "123456789";

export class DisplayCallDetails extends Component {
  constructor() {
    super();
    this.state = {
      startQueueIsClicked: false,
      callConnected: false,
      callDetails: [
        {
          id: 1,
          checked: 0,
          contactName: "Swetha",
          phoneNumber: "+919177245806",
          status: "dialing",
          dueDate: "tomorrow"
        },
        {
          id: 2,
          checked: 0,
          contactName: "Pooja",
          phoneNumber: "+918639952988",
          status: "dialing",
          dueDate: "tomorrow"
        },
        {
          id: 3,
          checked: 0,
          contactName: "Namratha",
          phoneNumber: "+919100679394",
          status: "dialing",
          dueDate: "tomorrow"
        },
        {
          id: 4,
          checked: 0,
          contactName: "Sirjan",
          phoneNumber: "+918885085047",
          status: "dialing",
          dueDate: "tomorrow"
        }
      ],
      callNumbersList: []
    };
  }
  /*  componentDidMount = () => {
    axios.get("http://localhost:8080/call-details").then(res => {
      console.log(res);
      this.setState({
        callDetails: res.data.slice(0, 10)
      });
    });
  };*/

  addCallDetails = callDetail => {
    console.log(callDetail);
    /*
    let callDetails = [...this.state.callDetails, callDetail];
    this.setState({
        callDetails : callDetails
    })
    */
    this.setState(prevState => ({
      callDetails: [...prevState.callDetails, callDetail]
    }));
    console.log("New List added ", this.state.callDetails);
  };

  deleteCallDetail = id => {
    console.log(id);
    let callDetails = this.state.callDetails.filter(callDetail => {
      return id !== callDetail.id;
    });
    this.setState({
      callDetails: callDetails
    });
  };

  checkboxChangedToTrue = callNumber => {
    console.log("In True Function");
    callNumbers = callNumber;
    this.setState(prevState => ({
      callNumbersList: [...prevState.callNumbersList, callNumbers]
    }));

    console.log(
      "Call Number : ",
      callNumbers,
      "callNumbersList : ",
      this.state.callNumbersList
    );
  };

  checkboxChangedToFalse = callNumber => {
    console.log("In False Function", callNumber);
    console.log("callNumbersList : ", this.state.callNumbersList);
    var callNumbersList = [...this.state.callNumbersList];
    var index = callNumbersList.indexOf(callNumber);
    if (index !== -1) {
      callNumbersList.splice(index, 1);
      this.setState({ callNumbersList: callNumbersList });
    }
  };

  makeCalls = () => {
    let startQueueIsClicked = !this.state.startQueueIsClicked;
    console.log("Start Queue Clicked : ", startQueueIsClicked);
    console.log(this.state.callNumbersList);
    //  let value = this.state.value;
    /*for (let i = 0; i < this.state.callNumbersList.length; i++) {
      value = value + "PJSIP/+91" + this.state.callNumbersList[i] + "@twilio0";
    }*/
    let callNumbersList = this.state.callNumbersList;
    if (localStorage.getItem("callNumbersList") == null) {
      localStorage.setItem("callNumbersList", JSON.stringify(callNumbersList));
      localStorage.setItem("index", 0);
      localStorage.setItem("length", this.state.callNumbersList.length);
    }
    console.log(
      "localStorage" +
        localStorage.getItem("index") +
        " " +
        localStorage.getItem("length") +
        " " +
        localStorage.getItem("callNumbersList")
    );
    //this.props.history.push("/");
    /*  if (index < length) {
      this.setState({
        startQueueIsClicked: true,
        index: index,
        length: length
      });
      //      console.log("val" + value);
    }*/
    this.setState({
      startQueueIsClicked: true
    });
  };
  /*  handleEndCall = () => {
    console.log("in handleCall");
    let index = this.state.index;
    //  let index = this.state.index;
    index = index + 1;
    let length = this.state.callNumbersList.length;
    //    console.log("status" + status);
    if (index < length) {
      console.log(index + " " + length);
      this.setState(() => {
        return {
          startQueueIsClicked: true,
          index: index,
          length: length
          //  callConnected: false
        };
      });
    }
  };*/
  handleCallConnected = () => {
    this.setState({
      callConnected: true
    });
  };
  componentWillMount() {
    this.forceUpdate();
  }
  render() {
    //localStorage.clear();
    console.log(this.props);
    const callDetailsList = this.state.callDetails.map(callDetail => {
      return (
        <DisplayCallDetail
          checkboxChangedToTrue={this.checkboxChangedToTrue}
          checkboxChangedToFalse={this.checkboxChangedToFalse}
          callDetail={callDetail}
          deleteCallDetail={this.deleteCallDetail}
        />
      );
    });
    let callsList = "";
    let index = -1;
    let length = -1;
    let callNumbersList = [];
    if (localStorage.getItem("length") > 0) {
      index = localStorage.getItem("index");
      length = localStorage.getItem("length");
      callNumbersList = JSON.parse(localStorage.getItem("callNumbersList"));
      //      console.log("called callNumbersList" + callNumbersList[index]);
      console.log("index" + index + " " + length);
    }
    if (index < length) {
      console.log("called MakeCalls");
      console.log(callNumbersList);

      let phoneNumber1 = callNumbersList[index];
      console.log("phoneNumber1" + phoneNumber1);
      callsList = (
        <MakeCalls
          value={callNumbersList[index]}
          callNumbersList={callNumbersList}
          index={index}
          length={length}
          phoneNumber1={phoneNumber1}
          callConnected={this.handleCallConnected}
          handleEndCall={this.handleEndCall}
        />
      );
      console.log("callsList" + callsList);
    } else if (index == length) {
      localStorage.clear();
    }
    //let mainTimeLine = "";
    // if (this.state.callConnected /*&& !this.props.isMainTimeLineCalled*/) {
    //   //console.log("isMainTimeLineCalled");
    //
    //   return (
    //
    //   ); //<MainTimeLine handleEndCall={this.handleEndCall} />"
    // }
    if (this.state.callConnected) {
      this.props.history.push("/timeline/+9177245806");
    }
    return (
      <div>
        <Toolbar>
          <h2>Tasks</h2>
          <Button
            variant="contained"
            size="large"
            color="black"
            style={{ marginLeft: "900px", backgroundColor: "white" }}
          >
            Actions
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            style={{ marginLeft: "10px", backgroundColor: "#00BE92" }}
            onClick={this.makeCalls}
          >
            Start Calling
          </Button>
        </Toolbar>
        <div>
          <div className="display-table" style={{ marginRight: "100px" }}>
            <Table aria-labelledby="tableTitle">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <h3>ContactName</h3>
                  </TableCell>
                  <TableCell>
                    <h3>PhoneNumber</h3>
                  </TableCell>
                  <TableCell>
                    <h3>Status</h3>
                  </TableCell>
                  <TableCell>
                    <h3>DueDate</h3>
                  </TableCell>
                </TableRow>
                {callDetailsList}
              </TableBody>
            </Table>
          </div>
          {callsList}
        </div>
      </div>
    );
  }
}

export default DisplayCallDetails;
