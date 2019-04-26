import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import '../css/Header.css';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import SettingsEdit from './SettingsEdit';
import Modal from 'react-modal';


let userName = "";
let displayPicture = "";
let userId = "";
let homePage = "";
let displaySettings = "";

const styles = theme =>
({
  profileName:
  {
    fontSize: 25,
    marginLeft: 10,
    color: "black"
  },
  displayPicture:
  {
    marginLeft: 900
  }
})
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '400px',
    width                 : '500px',
    backgroundColor       : '#E6E6E6'
  }
};

export class Header extends Component 
{
  state = {
    "userName": "",
    "displayPicture": "",
    "isButtonClicked": false,
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
    axios.get('/users/1')
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
  onButtonClick = () =>
  {
    this.setState({ isButtonClicked: !this.state.isButtonClicked});
    console.log("Display Settings ? "+ this.state.isButtonClicked);
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

    if(this.state.isButtonClicked === true)
    {
      displaySettings = (
      <Modal isOpen={this.state.isOpen} style = {customStyles}>
          <h1>Hello!</h1>
          <h3>You can change your profile here!</h3>
          <SettingsEdit/>
        </Modal>
      );
    }
    else
    {
      displaySettings = "";
    }
    return (
      <div>
      <AppBar position="static" className="app-bar" style={{ backgroundColor: "white"}}>
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="Menu">
          <Link to = {'/' }>
                <img src = { require('./../static/zemoso_logo.svg')}/>
          </Link>
          </IconButton>
          {homePage}
          <Typography variant="headline" style = {{color:"black", fontFamily: "Roboto",
      fontSize: "13px",
      }}>
           <b> ZeMultiCalls</b>
          </Typography>
          <div className = { classes.displayPicture }>
            {displayPicture}  
            <button onClick = { this.onButtonClick } style = {{ backgroundColor: "#00BE92", color:"white", borderRadius:"100%", fontSize: "27px", float:"right", marginLeft: "100px"}}>P</button>  
            { displaySettings }       
          </div>
          <div className = { classes.profileName }>
          </div>
         </Toolbar>
      </AppBar>    
      </div>
    )
  }
}

export default withStyles(styles)(Header);
