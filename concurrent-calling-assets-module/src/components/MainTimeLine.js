import React, { Component } from 'react';
import CallingBar from './CallingBar';
import Notes from './Notes';
import TimeLine from './TimeLine';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Popup from "reactjs-popup";

let id = "";
let notesChanged = "";
let phoneNumber = "";
let phoneNumberClicked = "";
let success = false;
let notesSave = "";

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

  handleEndIcon = () =>
  {
    console.log("In MainTimeline Handle End Call")
    let index = Number(localStorage.getItem("index"));
    index = index + 1;
    localStorage.setItem("index",index);
    console.log("Updated index : "+index);
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
      "notes": notesChanged
    }
   
    axios.put('/call-details/notes/'+id, data)
      .then( (response) => {
        console.log("response :"+response.status);
        if(response.status === 200)
        {
          console.log("Doneeeee updating Notes!");
          success = true;
          console.log(success);
        }
      })
      .catch(error =>{
        console.log(error);
      })

      
    
  }
/*
  componentDidMount = () =>
  {
    console.log("global notesChanged : "+notesChanged);
    const statusChanged = "Call Accepted";
    console.log("Data details :- notes : "+notesChanged+" status : "+statusChanged);
    const data = {
      notesChanged,
      statusChanged
    }
  }
  */

  render() 
  {
    const { classes } = this.props;
    phoneNumber = this.props.match.params.phone_number;
    id = this.props.match.params.id;
    phoneNumberClicked = this.props.match.params.phoneNumberClicked;
    notesChanged = this.props.notes;
    if(success === true)
    {
      notesSave = (
      <Popup >
            <div>
              Notes Saved Successfully!
            </div>
      </Popup>
      );
    }
  
    return (
      <div className = { classes.mainTimeLineBackgroud }>
        <CallingBar 
          phoneNumber = { phoneNumber } 
          id = { id }
          handleEndIcon = { this.handleEndIcon } 
          phoneNumberClicked = { phoneNumberClicked }
        />
        <div>
          <Notes 
            phoneNumber = { phoneNumber } 
            id = { id }
            saveStatusAndNotes = { this.saveStatusAndNotes }
            handleEndCall = { this.handleEndCall }  
            phoneNumberClicked = { phoneNumberClicked }

          />

        </div>
        <div>
          <TimeLine 
            phoneNumber = { phoneNumber } 
            id = { id }
            phoneNumberClicked = { phoneNumberClicked }
          />
        </div>
        { notesSave }
      </div>
    )
  }
}

export default withStyles(styles)(MainTimeLine);
