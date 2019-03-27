import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import './../css/CallingBar.css';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const styles = theme => 
({
  toolBar : 
  {
    backgroundColor: "#00BE92",
    height: 80,
  },

  phoneNumber :
  {
    color: "white",
  },

  time :
  {
    fontSize: "30px",
    float: "left",
    paddingTop: "5px"
  },

  hangUpIcon :
  {
    marginLeft: "400px",
  },

  recording :
  {
    marginLeft: "400px",
  },

  mute : 
  {
    marginLeft: "20px"
  },

  keyPad :
  {
    marginLeft: "20px",

  },

  labels :
  {
    color: "white"
  }

});

export class CallingBar extends Component {
  constructor(props) 
  {
    super(props);
  };

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Toolbar className = { classes.toolBar }>
            <div className = { classes.phoneNumber } >
              <div>Connected to: { this.props.phoneNumber }</div>
              <div className = { classes.time }>0:08</div>
            </div>  
            <div className = { classes.hangUpIcon }>
              <img src = { require('./../static/Icn_end call/icn_End Call.png')} />
            </div>
            <div className = { classes.recording }>
              <img src = { require('./../static/icn_recording/icn_recording.png')} />
              <div className = { classes.labels }>
                Recording
              </div>
            </div>
            <div className = { classes.mute }>
              <img src = { require('./../static/icn_mute/icn_mute.png')} />
              <div className = { classes.labels }>
                Mute
              </div>
            </div>
            <div className = { classes.keyPad }>
              <img src = { require('./../static/icn_keypad/icn_keypad.png')} />
              <div className = { classes.labels }>
                KeyPad
              </div>
            </div>
        </Toolbar>        
                  
      </div>
    )
  }
}

export default withStyles(styles)(CallingBar);
