import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        backgroundColor: 'white',
        width: "70%",
        height: "100%",
        float: "right",
        border: "2px solid gray",
        borderBottom: "none"
    },

    textField : 
    {
        marginLeft: "286px",
        paddingTop: "15px",
        paddingLeft: "10px",
        width: "901px",
        height: "100%",
        float: "left",
        border: "2px solid gray",


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

export class Notes extends Component {
  constructor(props)
  {
    super(props);
  };

  render() 
  {
    const { classes } = this.props;
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
                <TextField
                 rows = { 7 } 
                 fullWidth = "true" 
                 multiline = "true" 
                 margin = "none" 
                 placeholder = "Take Notes On this Call....."
                 underline = "false"
                 >
                 </TextField>
            </div>
           
        
        </div>
    )
  }
}

export default withStyles(styles)(Notes);