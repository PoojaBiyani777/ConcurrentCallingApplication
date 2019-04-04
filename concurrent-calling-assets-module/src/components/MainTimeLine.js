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
  render() {
    const { classes } = this.props;
    const phoneNumber = this.props.match.params.phone_number;
    return (
      <div
        className={classes.mainTimeLineBackgroud}
        style={{ backgroundColor: "red" }}
      >
        <CallingBar phoneNumber={phoneNumber} />
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
