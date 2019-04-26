import React, { Component } from 'react';
import DisplayCallDetail from './DisplayCallDetail';
import '../css/DisplayCallDetails.css';
import MakeCalls from './MakeCalls';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import TaskBar from './TaskBar';
import { MainTimeLine } from './MainTimeLine';
import { CallingBar } from './CallingBar';
import AddCallDetails from './AddCallDetails';

let callNumbers = "123456789";
let callIds = "";
let callCallingBarC = "";
let phoneNumberClicked = false;
let displayAddDetails = "";

const styles = theme =>
({
  actions:
  {
    marginLeft: "940px", 
    backgroundColor: "white",
  },

  startCall:
  {
    marginLeft: "1050px",
    marginTop: "30px",
    backgroundColor: "#00BE92", 
    width: "100", 
    height: "50px",
    color: "white",
    display: "block",
    fontFamily: "Roboto",
    fontSize: "13px"
  },

  table:
  {
    backgroundColor: "white",
  },
})
let callDuration = "00:00";
let callCallingBar = true;


export class DisplayCallDetails extends Component 
{
  
  constructor(props)
  {
    super(props);
    this.state = {
      value: "",
      startQueueIsClicked: false,
      id: "",
      buttonClicked: false,
      callDuration: "00:00",
        callDetails: 
        [
          { 
            "id": 1,
            "checked": 0,
            "contactName": "Swetha",
            "phoneNumber": "9177245806",
            "status": "dialing",
            "dueDate": "tomorrow"
          },
          { 
            "id": 2,
            "checked": 0,
            "contactName": "Pooja",
            "phoneNumber": "8639952988",
            "status": "dialing",
            "dueDate": "tomorrow"
          },
          { 
            "id": 3,
            "checked": 0,
            "contactName": "Namratha",
            "phoneNumber": "9100679394",
            "status": "dialing",
            "dueDate": "tomorrow"
          },
        ],
        callNumbersList: [],  
        callIdsList: [],
        index: -1,
        length: -1,
        callDuration: "0:00",
        newCallDetails:
        [
          {
            "id": "",
            "checked": "",
            "contactName": "",
            "phoneNumber": "",
            "status": "",
            "dueDate": ""
          }
        ]
    }
  };

  componentDidMount = () =>
  {
    axios.get('/call-details')
    .then(res => {
    console.log(res);
    this.setState({
      callDetails : res.data.slice(0,10)
    })
    })

    console.log("DDDDD state: "+this.state.callDetails);
  }

  display = (display) =>
  {
    console.log("Display in DicplayCallDetails!"+display);
  }



  addCallDetails = ( callDetail ) =>
  {
    console.log(callDetail);
    this.setState(prevState => ({ callDetails: [...prevState.callDetails, callDetail] }))
    console.log("New List added ",this.state.callDetails);
  }    

  deleteCallDetail = ( id ) =>
  {
    /*console.log(id);
    let callDetails = this.state.callDetails.filter(callDetail => {
      return id !== callDetail.id  
    })
    this.setState({
      callDetails : callDetails
    })
    */

    this.setState({
      id: id
    })
    //handleDelete(id);
    /*
    axios.delete('http://localhost:8080/call-details/${id}')
      .then(response => {
        console.log("deleted!!!",response);
      })
    */
  }

  handleDelete = (id) => 
  {    
  }

  checkboxChangedToTrue = (callNumber, callId) =>
  {
    console.log("In True Function");    
    callNumbers = callNumber;
    callIds = callId;
    this.setState(prevState => ({ callNumbersList: [...prevState.callNumbersList, callNumbers] }))
    this.setState(prevState => ({callIdsList: [...prevState.callIdsList, callIds]}))
    console.log("Call Number : ",callNumbers,"callNumbersList : ",this.state.callNumbersList);
    console.log("Call Ids : "+ callIds+"Call Id List : "+this.state.callIdsList);
  }

  checkboxChangedToFalse = (callNumber, callId) =>
  {
    console.log("In False Function",callNumber);
    console.log("callNumbersList : ",this.state.callNumbersList);
    console.log("callIdsList : ", this.state.callIdsList);
    var callNumbersList = [...this.state.callNumbersList];
    var callIdsList = [...this.state.callIdsList];
    var index = callNumbersList.indexOf(callNumber)
    if (index !== -1) 
    {
      callNumbersList.splice(index, 1);
      callIdsList.splice(index, 1);
      this.setState({callNumbersList: callNumbersList});
      this.setState({callIdsList: callIdsList});
    }
  }

  makeCalls = () =>
  {
    let startQueueIsClicked = this.state.startQueueIsClicked;
    console.log("Start Queue Clicked : ",startQueueIsClicked);
    console.log("In make calls function: CallNumbersList : "+this.state.callNumbersList);
    console.log("In make calls function: callIdsList: "+this.state.callIdsList);
    let callNumbersList = this.state.callNumbersList;
    let callIdsList = this.state.callIdsList;
    console.log(callNumbersList+" "+callIdsList);
    console.log("Local Storage Call Numbers List :"+ localStorage.getItem(callNumbersList));
    console.log("Local Storage Call Ids List :"+localStorage.getItem(callIdsList));
    if(localStorage.getItem("callNumbersList") == null && localStorage.getItem("callIdsList") == null)
    {
      console.log("Insidde if loop!!");
      localStorage.setItem("callNumbersList",JSON.stringify(callNumbersList));
      localStorage.setItem("callIdsList",JSON.stringify(callIdsList));
      localStorage.setItem("index",0);
      localStorage.setItem("length",callNumbersList.length);
    }

    console.log("LOCAL STORAGE : "+localStorage.getItem("callNumbersList")
                      +"callIdsList : "+localStorage.getItem("callIdsList")
                       +" index: "+localStorage.getItem("index")
                       +" length : "+localStorage.getItem("length") );
    this.setState({
      startQueueIsClicked: true
    })
  }

  handleCallConnected = () =>
  {
    this.setState({
      callConnected: true
    })
  }

  updateCallDetails = (callId, phoneNumber, callStatus) => {
    const { callDetails } = this.state;
    const newCallDetails = Object.assign(callDetails);

    for (const i in newCallDetails) 
    {
      const currentId = newCallDetails[i].id;
      if (currentId === callId) {
        newCallDetails[i].status = callStatus;
        break;
      }
    }
    this.setState({ callDetails: newCallDetails });
  };  

  updateCallDuration = (callDuration) =>
  {
      console.log("callDuration in DP : "+callDuration);
      this.callDuration = callDuration;

  }

  onButtonClick = () =>
  {
    this.setState({buttonClicked: !this.state.buttonClicked });
    console.log("Add Button Is Clicked!" + this.state.buttonClicked);
  }

   
  render() 
  {        
    //localStorage.clear();  
    const { classes } = this.props;
    const callDetailsList = this.state.callDetails.map(callDetail => {  
      return (
        <DisplayCallDetail 
          checkboxChangedToTrue={ this.checkboxChangedToTrue }
          checkboxChangedToFalse={ this.checkboxChangedToFalse }
          callDetail = { callDetail } 
          deleteCallDetail = { this.deleteCallDetail }
          display = { this.display }
          key =  {callDetail.id}   
          phoneNumberClicked = {phoneNumberClicked}/>
      )
    })
    let callsList = "";
    let index = -1;
    let length = -1;
    let callNumbersList = [];
    let callIdsList = [];
    let phoneNumber1;
    let callId1;

    if(localStorage.getItem("length") > 0)
    {
      index = localStorage.getItem("index");
      length = localStorage.getItem("length");
      callNumbersList = JSON.parse(localStorage.getItem("callNumbersList"))
      callIdsList = JSON.parse(localStorage.getItem("callIdsList"));
    }
    //console.log("index" + index + " " + length+"call Numbers LIsttt : "+callNumbersList);
    
      console.log("Please call Calling Bar");
      callCallingBarC = (<CallingBar callDuration = { this.state.callDuration } />);
    

    if(index < length)
    {
      phoneNumber1 = callNumbersList[index];
      callId1 = callIdsList[index];
      console.log("Phone Number to be called : phoneNumber1 : "+phoneNumber1);
      console.log("CallId to be called : callId1 : "+callId1);
      callsList = (
                  <MakeCalls 
                    callNumbersList = { callNumbersList } 
                    index = { index }
                    length = { length }
                    phoneNumber1 = { phoneNumber1 }
                    callId1 = { callId1 }
                    value = { callNumbersList[index] }
                    handleCall = { this.handleCall }
                    callConnected = { this.handleCallConnected }
                    onStatusChange={(...args) => this.updateCallDetails(...args)}
                    callDuration = {(...args) => this.updateCallDuration(...args)}
                  />
      );
      console.log("call /list /: "+callsList);
    }
    else if(index == length)
    {
       localStorage.clear();
    }
    if (this.state.callConnected) 
    {
      let clicked = false;
      this.props.history.push('/timeline/'+callId1+'/+91'+phoneNumber1+'/false');
    }

    if(this.state.buttonClicked === false)
    {
      console.log("False!!!");
      displayAddDetails = " ";
    }
    else
    {
      console.log("True!!!");
      displayAddDetails = (<AddCallDetails/>);
    }
    return (
      <div>
        <div style = {{ paddingRight: "20px", float: "right" }}>
            <Button variant = "contained" size = "very large" className = { classes.startCall }
              onClick = { this.makeCalls }>
              Start Call
            </Button>    
        </div>           
          { callsList }
        <div className="display-table" style = {{ marginRight: "100px", backgroundColor: "#E6E6E6", float: "left", width: "70%", paddingLeft: "50px" }}>
            <Table aria-labelledby="tableTitle" className = { classes.table } > 
              <TableBody>
                <TableRow style = {{ backgroundColor: "black"}}>
                  <TableCell style = {{color:"white",fontFamily: "Roboto", fontSize: "13px" }}><h3>Whom You Want to Call to?</h3></TableCell>
                  <TableCell style = {{color:"white",fontFamily: "Roboto", fontSize: "13px" }}><h3>ContactNumber</h3></TableCell>
                  <TableCell style = {{color:"white", fontFamily: "Roboto", fontSize: "13px"}}><h3>Status</h3></TableCell>
                  <TableCell style = {{color:"white", fontFamily: "Roboto", fontSize: "13px" }}><h3>DueDate</h3></TableCell>
                </TableRow>
                { callDetailsList }
              </TableBody>
            </Table>
            <Button onClick = { this.onButtonClick } style = {{ backgroundColor: "black", color:"white", borderRadius:"100%", fontSize: "22px", float:"right", marginRight: "0px", marginTop: "-25px"}}>+</Button>
            { displayAddDetails }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(DisplayCallDetails);
