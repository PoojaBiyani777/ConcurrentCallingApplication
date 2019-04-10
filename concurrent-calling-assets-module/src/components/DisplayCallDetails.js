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
import AddCallDetails from './AddCallDetails';

let callNumbers = "123456789";

const styles = theme =>
({
  actions:
  {
    marginLeft: "940px", 
    backgroundColor: "white",
  },

  startCall:
  {
    marginLeft: "10px",
    backgroundColor: "#00BE92", 
    width: "100%", 
    height: "50px",
    color: "white",
    display: "block"
  }
})

export class DisplayCallDetails extends Component 
{
  state = {
    value: "",
    startQueueIsClicked: false,
    id: "",
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
      index: -1,
      length: -1,
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

  componentDidMount = () =>
  {
    axios.get('http://localhost:8080/call-details')
    .then(res => {
    console.log(res);
    this.setState({
      callDetails : res.data.slice(0,10)
    })
    })
   /* 
    axios.put('http://localhost:8080/call-details/3',{
      "status": "Done"
    })
    .then(res => {
      console.log("Updates status to Done ",res.data);
    })
    .catch(error => {
      console.log("Error asdfghj in network");
    })
    */
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
  //  event.preventDefault();
    
  }

  checkboxChangedToTrue = (callNumber) =>
  {
    console.log("In True Function");    
    callNumbers = callNumber;
    this.setState(prevState => ({ callNumbersList: [...prevState.callNumbersList, callNumbers] }))
    console.log("Call Number : ",callNumbers,"callNumbersList : ",this.state.callNumbersList);
  }

  checkboxChangedToFalse = (callNumber) =>
  {
    console.log("In False Function",callNumber);
    console.log("callNumbersList : ",this.state.callNumbersList);
    var callNumbersList = [...this.state.callNumbersList];
    var index = callNumbersList.indexOf(callNumber)
    if (index !== -1) 
    {
      callNumbersList.splice(index, 1);
      this.setState({callNumbersList: callNumbersList});
    }
  }

  makeCalls = () =>
  {
    let startQueueIsClicked = this.state.startQueueIsClicked;
    console.log("Start Queue Clicked : ",startQueueIsClicked);
    console.log(this.state.callNumbersList);
    let callNumbersList = this.state.callNumbersList;
    console.log(callNumbersList);
    console.log("Local Storage Call Numbers List :"+ localStorage.getItem(callNumbersList));
    if(localStorage.getItem("callNumbersList") == null)
    {
      console.log("Insidde if loop!!");
      localStorage.setItem("callNumbersList",JSON.stringify(callNumbersList));
      localStorage.setItem("index",0);
      localStorage.setItem("length",callNumbersList.length);
    }

    console.log("LOCAL STORAGE : "+localStorage.getItem("callNumbersList")
                       +" index: "+localStorage.getItem("index")
                       +" length : "+localStorage.getItem("length") );
    this.setState({
      startQueueIsClicked: true
    })
   /* let index = this.state.index;
    index = index + 1;
    let length = this.state.callNumbersList.length;
    console.log("Index : ",index," and Length : "+length);
    if(index < length)
    {
      this.setState({
        startQueueIsClicked: true,
        index: index,
        length: length
      })
    }*/
  }

  handleCallConnected = () =>
  {
    this.setState({
      callConnected: true
    })
  }

   
  render() 
  {        
   // localStorage.clear();  
    const { classes } = this.props;
    const callDetailsList = this.state.callDetails.map(callDetail => {
      return (
        <DisplayCallDetail 
          checkboxChangedToTrue={ this.checkboxChangedToTrue }
          checkboxChangedToFalse={ this.checkboxChangedToFalse }
          callDetail = { callDetail } 
          deleteCallDetail = { this.deleteCallDetail } />       
      )
    })
    let callsList = "";
    let index = -1;
    let length = -1;
    let callNumbersList = [];
    let phoneNumber1;

    if(localStorage.getItem("length") > 0)
    {
      index = localStorage.getItem("index");
      length = localStorage.getItem("length");
      callNumbersList = JSON.parse(localStorage.getItem("callNumbersList"))
    }
    //console.log("index" + index + " " + length+"call Numbers LIsttt : "+callNumbersList);
    
    if(index < length)
    {
      phoneNumber1 = callNumbersList[index];
      console.log("Phone Number to be called : "+phoneNumber1);
      callsList = (
                  <MakeCalls 
                    callNumbersList = { callNumbersList } 
                    index = { index }
                    length = { length }
                    phoneNumber1 = { phoneNumber1 }
                    value = { callNumbersList[index] }
                    handleCall = { this.handleCall }
                    callConnected = { this.handleCallConnected }
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
      this.props.history.push('/timeline/'+1+'/+91'+phoneNumber1);
    }
    return (
      <div>
        <Toolbar>
          <h2>Tasks</h2>
            <Button variant = "contained" size = "large" color = "black" className = { classes.actions }>
              Action
            </Button>        
            <Button variant = "contained" size = "large" className = { classes.startCall } style = {{  }}
              onClick = { this.makeCalls }>
              Start Call
            </Button>               
        </Toolbar>
        <div>
          { callsList }
        </div>
        <div>
          <div className = "tasks-list">
            <TaskBar /> 
          </div>
          <div className="display-table" style = {{ marginRight: "100px" }}>
            <Table aria-labelledby="tableTitle"> 
              <TableBody>
                <TableRow>
                  <TableCell><h3>ContactName</h3></TableCell>
                  <TableCell><h3>ContactNumber</h3></TableCell>
                  <TableCell><h3>Status</h3></TableCell>
                  <TableCell><h3>DueDate</h3></TableCell>
                </TableRow>
                { callDetailsList }
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(DisplayCallDetails);
