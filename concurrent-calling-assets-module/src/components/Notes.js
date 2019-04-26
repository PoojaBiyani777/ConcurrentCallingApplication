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
        width: "50%",
        height: "100%",
        float: "right",
        border: "2px solid gray",
        borderBottom: "none"
    },

    textField : 
    {
        marginRight: "120px",
        marginTop: "40px",
        paddingLeft: "20px",
        width: "40%",
        height: "100%",
        float: "right",
      height: "100%",
      borderLeft: "0.5px solid white",
     // borderColor: "white"
     shadow: "10px"

      
        
    },
    lineExtend:
    {
      width: "0.5px",
      height: "100%",
      borderLeft: "0.5px solid",
      float: "left",
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
    notes = this.state.notes;
    console.log("Notes : "+notes);
    const id = connectedId;
    const phoneNumber = connectedPhoneNumber;
    const data = {
        notes
    }
    console.log("Notes submit handler!");
    this.props.saveStatusAndNotes(notes);
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

            <div className = { classes.textField }>
            <form onSubmit = { this.onSubmitHandler } 
>
                <TextField
                    rows = { 12 } 
                    id = "notes"
                    fullWidth = "false" 
                    multiline = "true" 
                    margin = "none" 
                    placeholder = "Take Notes On this Call....."
                    underline = "false"
                    onChange = { this.onChangeHandler }
                    InputProps={{disableUnderline: true}}
                >
                </TextField>
            </form>
            </div>

      </div>
    )
  }
}

export default withStyles(styles)(Notes);