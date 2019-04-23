import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>
({
    timelineLog: 
    {
        marginTop: "30px"
    }
})

let date = "";
export class TimeLineLog extends Component {

  getDates = (datetime) =>
  {
    let full_date = new Date(datetime);
    let months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    let month = months[full_date.getMonth()];
    let day = full_date.getDate();
    let year = full_date.getFullYear();
    this.yearnow = year;
    let hours = full_date.getHours();
    let minutes = full_date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = month + ' ' + day + ', ' + year + ' ' +
      hours + ':' + minutes + ' ' + ampm;
    let epochTime = full_date.getTime();
    date = [strTime] ;
    return [strTime, epochTime];
  }

  render() {
    const { classes } = this.props;
    const timelineLog = this.props.timelineLog;
    //let date = {timelineLog.createdDate};
    return (
      <div className = { classes.timelineLog }>
        <b>You made a call to : { timelineLog.contactName }</b>
        <p onClick = { this.getDates(timelineLog.createdDate) }>{date}  for  { timelineLog.duration }</p>
        <p><b>Notes : </b>{ timelineLog.notes }</p>
        <hr/>
      </div>
    )
  }
}

export default withStyles(styles)(TimeLineLog)
