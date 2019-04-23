import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import '../css/Header.css';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';

let userName = "";
let displayPicture = "";
let userId = "";
let homePage = "";
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
    "displayPicture": "",
  }

  constructor(props)
  {
    super(props);
    this.state = {
      "iconClicked": false,
    }
  }

  componentDidMount = () =>
  {
    console.log("UserId " + userId);
    axios.get('/users/4')
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

  goToHomePage = () =>
  {
      this.setState({iconClicked: true}, () => console.log(this.state.iconClicked,'go back'));
      console.log("Logo Clicked : "+this.state.iconClicked);
  }

  render() 
  {
    const {classes} = this.props;
    if(this.state.iconClicked)
    {
     // console.log("Click home!");
      homePage = this.history.go(-1);
     console.log(this.homePage);
    }
    return (
      <div>
      <AppBar position="static" className="app-bar" style={{ backgroundColor: "black"}}>
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="Menu">
          <Link to = {'/' }>
                <img src = { require('./../static/zemoso_logo.svg')}/>
          </Link>
          </IconButton>
          {homePage}
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
