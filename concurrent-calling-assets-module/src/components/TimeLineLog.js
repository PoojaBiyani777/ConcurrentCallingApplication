import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme =>
({
    timelineLog: 
    {
        marginTop: "0px",
        width: "70%",
        marginBottom: "0px",
        textAlign: "left",
        paddingLeft: "50px",
        paddingTop: "20px"
    },
    image: 
    {
      float: "left",
      paddingTop: "0px",
      marginLeft: "-65px",
    },
    lable:
    {
      height: "30px",
      color: "#354052",
      fontFamily: "Roboto",
      fontSize: "13px",
      fontWeight: "500",
      lineHeight: "21px",
      marginTop: "10px"
    },
    lineExtend:
    {
      width: "1px",
      height: "95px",
      borderLeft: "2px solid",
      float: "left",
      paddingTop: "0px",
      marginLeft: "-55px",  
      marginTop: "22px" ,
    },
    duration:
    {
        height: "16px",
        color: "#59595f",
        fontFamily: "Roboto",
        fontSize: "13px",
        lineHeight: "17px"
    },
    

})

let date = "";
let log = " ";
let year1970 = "false";
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
    console.log("Year : "+year);
    if(year === "1970")
    {
      year1970 = "true";
      console.log("Year 1970 : "+year1970);
    }
    //return [strTime, epochTime];
  }

  render() {
    const { classes } = this.props;
    const timelineLog = this.props.timelineLog;
    //let date = {timelineLog.createdDate};
    if(timelineLog.createdDate === null)
    {
      console.log("YYYYear is 1970 ")
      log = " ";
    }
    else
    {
      log = (
        <div className = { classes.timelineLog }>
      <img src = { require('./../static/icn_made call/Icon/made_call.png')} className = {classes.image}/>
      <div className = { classes.lineExtend }></div>
        <div className = { classes.lable }><b>You made a call to :</b> { timelineLog.contactName }</div>
        <div className = { classes.duration } onClick = { this.getDates(timelineLog.createdDate) }>{date}  for  { timelineLog.duration }</div>
        <div className = { classes.lable }><b>Notes : </b>{ timelineLog.notes }</div>
        
      </div>
      )
    }

    return (
      <div>
        {log}
      </div>
    )
  }
}

export default withStyles(styles)(TimeLineLog)
