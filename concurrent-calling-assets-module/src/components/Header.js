import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import '../css/Header.css';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
let userName = "";
let displayPicture = "";
const styles = theme =>
({
  profileName:
  {
    fontSize: 25,
    marginLeft: 10,
  },
  displayPicture:
  {
    marginLeft: 900
  }
})
export class Header extends Component 
{
  state = {
    "userName": "",
    "displayPicture": ""
  }

  constructor(props)
  {
    super(props);
  }

  componentDidMount = () =>
  {
    axios.get('http://localhost:8080/users/4')
    .then(res => {
      console.log("User ID details : ",res);
      userName = res.data.userName;
      displayPicture = res.data.displayPicture;
      console.log("Constant userName : "+userName);
      this.setState({
        userName: userName,
        displayPicture: displayPicture
      })
    })
  }

  render() 
  {
    const {classes} = this.props;
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
          <div className = { classes.displayPicture }>
            {displayPicture}            
            <img src = { require('./../static/zemoso_logo.svg')} /> 
          </div>
          <div className = { classes.profileName }>
            {userName} 
          </div>
         </Toolbar>
      </AppBar>    
      </div>
    )
  }
}

export default withStyles(styles)(Header);
