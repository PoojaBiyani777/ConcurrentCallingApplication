import React, { Component } from "react";
import CallingBar from "./CallingBar";
import Notes from "./Notes";
import TimeLine from "./TimeLine";
import { withStyles } from "@material-ui/core/styles";
import MakeCalls from "./MakeCalls";
const styles = theme => ({
  mainTimeLineBackgroud: {
    backgroundColor: "black"
  }
});
let isMainTimeLineCalled = false;

export class MainTimeLine extends Component {
  constructor(props) {
    super(props);
  }
  handleEndCall = () => {
    console.log("End Call");
    /*  if (typeof this.props.location.state.func === "function")
      this.props.location.state.func();*/

    //  let callNumbersList = localStorage.getItem("callNumbersList");
    let index = Number(localStorage.getItem("index"));
    //callNumbersList.splice(index, 1);
    //localStorage.setItem("callNumbersList", callNumbersList);
    index = index + 1;
    //  let length = callNumbersList.length;
    localStorage.setItem("index", index);
    //  localStorage.setItem("length", length);
    this.props.history.push("/");
  };
  render() {
    console.log("props1" + this.props);
    const { classes } = this.props;
    /*if (typeof this.props.location.state.func === "function")
      this.props.location.state.func();*/
    const phoneNumber = "";

    // const phoneNumber = this.props.location.phoneNumber;
    return (
      <div
        className={classes.mainTimeLineBackgroud}
        style={{ backgroundColor: "red" }}
      >
        <CallingBar
          handleEndCall={this.handleEndCall}
          phoneNumber={phoneNumber}
        />
        <div>
          <Notes phoneNumber={phoneNumber} />
        </div>
        <div>
          <TimeLine phoneNumber={phoneNumber} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MainTimeLine);
