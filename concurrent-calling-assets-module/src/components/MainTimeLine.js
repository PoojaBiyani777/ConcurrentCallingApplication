import React, { Component } from 'react';
import CallingBar from './CallingBar';
import Notes from './Notes';
import TimeLine from './TimeLine';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

let id = "";
let notesChanged = "";

  const styles = theme =>
  ({
    mainTimeLineBackgroud :
    {
      backgroundColor: "black",
    }
  })

export class MainTimeLine extends Component 
{
  constructor(props)
  {
    super(props);
  }
  state = {
    notesChanged: ""
  }

  handleEndCall = () =>
  {
    console.log("In MainTimeline Handle End Call")
    let index = Number(localStorage.getItem("index"));
    index = index + 1;
    localStorage.setItem("index",index);
    console.log("Updated index : "+index);
    this.props.history.push("/");
  }

  saveStatusAndNotes = (notes) =>
  {
    console.log("In saveStatusAndNotes Handler!");
    console.log(notes);
    notesChanged = notes;
    this.setState({
      notesChanged: notes
    })
    console.log("state of notes changed : "+this.state.notesChanged);
    const statusChanged = "Call Accepted";
    console.log("Data details :- notes : "+notesChanged+" status : "+statusChanged);
    const data = {
      "status": statusChanged,
      "notes": notesChanged
    }
    
    axios.put('http://localhost:8080/call-details/'+id,data)
      .then(response => {
        console.log(response);
      })
      .catch(error =>{
        console.log(error);
      })
    
  }

  componentDidMount = () =>
  {
    console.log("global notesChanged : "+notesChanged);
    const statusChanged = "Call Accepted";
    console.log("Data details :- notes : "+notesChanged+" status : "+statusChanged);
    const data = {
      notesChanged,
      statusChanged
    }
    /*
    console.log("data before axios : "+data);
    axios.put('http://localhost:8080/call-details/'+id,data)
      .then(response => {
        console.log(response);
      })
      .catch(error =>{
        console.log(error);
      })
    */
  }

  render() 
  {
    const { classes } = this.props;
    const  phoneNumber = this.props.match.params.phone_number;
    id = this.props.match.params.id;
    notesChanged = this.props.notes;
    return (
      <div className = { classes.mainTimeLineBackgroud }>
        <CallingBar 
          phoneNumber = { phoneNumber } 
          id = { id }
          handleEndCall = { this.handleEndCall }  
        />
        <div>
          <Notes 
            phoneNumber = { phoneNumber } 
            id = { id }
            saveStatusAndNotes = { this.saveStatusAndNotes }
          />
        </div>
        <div>
          <TimeLine 
            phoneNumber = { phoneNumber } 
            id = { id }
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(MainTimeLine);
