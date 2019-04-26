import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import TimeLineLog from './TimeLineLog';

let callId = "";
let callPhoneNumber = "";
const styles = theme =>
({
    timeLineBackground :
    {
        marginLeft: "70px",
        marginTop: "40px",
        width: "43%",
        height: "100%",
        float: "left",    
    }
})


export class TimeLine extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
      timelineLogs : [
        {
          "contactName": "",
          "createdDate": "",
          "duration": "",
          "notes": ""
        }
      ]
    }
  }


  componentDidMount = () =>
  {
    console.log("Timeline's ComponentDidMount");
    console.log("CallId "+callId+" Call PhoneNumber : "+callPhoneNumber);
    axios.get('/timeline-logs/'+callPhoneNumber)
    .then(response => {
      console.log(response);
      this.setState({
        timelineLogs: response.data.slice(0,10)
      })
    })
    .catch(error => {
      console.log(error)
    })
    console.log("State Call Details : "+this.state.timelineLogs);
  }
      
  render() 
  {
    const { classes } = this.props;
    callId = this.props.id;
    callPhoneNumber = this.props.phoneNumber;
    const timelineLogsList = this.state.timelineLogs.map(timelineLog => {
      return (
          <TimeLineLog 
              timelineLog = { timelineLog }
          />
      )
    })
    
    return (
      <div>
      <div className = { classes.timeLineBackground }>
        { timelineLogsList }
      </div>
      </div>
    )
  }
}

export default withStyles(styles)(TimeLine);
