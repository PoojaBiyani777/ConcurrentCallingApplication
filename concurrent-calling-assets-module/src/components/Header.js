import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import '../css/Header.css';

export class Header extends Component {
  render() {
    return (
      <div>
      <AppBar position="static" className="app-bar" style={{ backgroundColor: "black"}}>
        <Toolbar variant="dense">
        <IconButton color="inherit" aria-label="Menu">
          <img src = { require('./../static/zemoso_logo.svg')} />
        </IconButton>
        <Typography variant="headline" color="inherit">
          ZeMultiCalls
        </Typography>
        <Typography>
          Profile
        </Typography>
        </Toolbar>
      </AppBar>    
      </div>
    )
  }
}

export default Header
