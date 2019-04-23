import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

let notes = "";
let connectedId = "";
let connectedPhoneNumber = "";

const styles = theme =>
({
    notesBackground :
    {
        paddingTop: "5px",
        marginTop: "70px",
        marginRight: "100px",
        marginLeft: "30px",
        paddingBottom: "5px",
        paddingTop: "10px",
        backgroundColor: "white",
        width: "70%",
        height: "100%",
        float: "right",
        border: "2px solid gray",
        borderBottom: "none"
    },

    textField : 
    {
        marginLeft: "282px",
        paddingTop: "15px",
        paddingLeft: "10px",
        width: "890px",
        height: "100%",
        float: "left",
        border: "2px solid gray",
        backgroundColor: "white"

    },

    newNote :
    {
        marginLeft: "10px",
        float: "left",
    },

    email :
    {
        marginLeft: "40px",
        float: "left"
       
    },

    call :
    {
        marginLeft: "40px",
        float: "left"
    },

    voiceMail :
    {
        marginLeft: "40px",
        float: "left"
    },

    hangUpButton :
    {
        marginLeft: "40px",
        
    }

})

export class Notes extends Component 
{
  state = {
      notes: ""
  }

  constructor(props)
  {
    super(props);
  }

  onChangeHandler = (event) =>
  {
    console.log(event.target.value);
    this.setState({
        notes: event.target.value
    })
  }

  onSubmitHandler = (event) =>
  {
    event.preventDefault();
    console.log("State notes : "+this.state.notes);
    notes = this.state.notes;
    console.log("Notes : "+notes);
    const id = connectedId;
    const phoneNumber = connectedPhoneNumber;
    const data = {
        notes
    }
    console.log("Notes submit handler!");
    this.props.saveStatusAndNotes(notes);
/*
    axios.put('http://localhost:8080/call-details/'+id,data)
      .then(response => {
          console.log(response);
      })
      .catch(error =>{
          console.log(error);
      })
  */  
  }

  handleEndCall = () =>
  {
    console.log(" In Notes Submit 777Handler! ");
    this.props.handleEndCall()
  }

  render() 
  {
    const { classes } = this.props;
    connectedPhoneNumber = this.props.phoneNumber;
    connectedId = this.props.id;

    return (
      <div> 
        <div className = { classes.notesBackground }>
            <div className = { classes.newNote }>
                <img src = { require('./../static/icn_new_note/icn_new_note@2x.png') } />
                New Note
            </div>
            <div className = { classes.email }>
                <img src = { require('./../static/icn_mail/ic-mail@2x.png')} />
                Email
            </div>
            <div className = { classes.call }>
                <img src = { require('./../static/icn_call/ic-call@2x.png')} />
                Call
            </div>
            <div className = { classes.voiceMail }>
                <img src = { require('./../static/icn_voice mail/icn_voicemail.png')} />
                VoiceMail
            </div>
            </div>
            <div className = { classes.textField }>
            <form onSubmit = { this.onSubmitHandler }>
                <TextField
                    rows = { 7 } 
                    id = "notes"
                    fullWidth = "true" 
                    multiline = "true" 
                    margin = "none" 
                    placeholder = "Take Notes On this Call....."
                    underline = "false"
                    onChange = { this.onChangeHandler }
                >
                </TextField>
                <input type = "submit" id = "submit" name = "Save" value = "Save"/>
                <button type = "submit" id = "submit" name = "Submit" value = "Submit" onClick = { this.handleEndCall }>Close</button>
            </form>
            </div>

      </div>
    )
  }
}

export default withStyles(styles)(Notes);