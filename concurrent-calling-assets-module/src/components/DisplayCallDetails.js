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
let callNumbers = "123456789";


export class DisplayCallDetails extends Component 
{
    state = {
      value: "",
      "startQueueIsClicked": false,
        callDetails : [
          { 
            "id" : 1,
            "checked" : 0,
            "contactName" : "Swetha",
            "phoneNumber" : "9177245806",
            "status" : "dialing",
            "dueDate" : "tomorrow"
          },
          { 
            "id" : 2,
            "checked" : 0,
            "contactName" : "Pooja",
            "phoneNumber" : "8639952988",
            "status" : "dialing",
            "dueDate" : "tomorrow"
          },
          { 
            "id" : 3,
            "checked" : 0,
            "contactName" : "Namratha",
            "phoneNumber" : "9100679394",
            "status" : "dialing",
            "dueDate" : "tomorrow"
          },
        ],
        callNumbersList : [
      
        ],
        
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
  }

  addCallDetails = ( callDetail ) =>
  {
    console.log(callDetail);
   /* 
    let callDetails = [...this.state.callDetails, callDetail];
    this.setState({
        callDetails : callDetails
    })
    */
    this.setState(prevState => ({ callDetails: [...prevState.callDetails, callDetail] }))
    console.log("New List added ",this.state.callDetails);
  }    

  deleteCallDetail = ( id ) =>
  {
      console.log(id);
      let callDetails = this.state.callDetails.filter(callDetail => {
        return id !== callDetail.id  
      })
      this.setState({
          callDetails : callDetails
      })
  };

  checkboxChangedToTrue = (callNumber) =>
  {
    console.log("In True Function");    
    callNumbers = callNumber;
    this.setState(prevState => ({ callNumbersList: [...prevState.callNumbersList, callNumbers] }))
    console.log("Call Number : ",callNumbers,"callNumbersList : ",this.state.callNumbersList);
  };

  checkboxChangedToFalse = (callNumber) =>
  {
    console.log("In False Function",callNumber);
    console.log("callNumbersList : ",this.state.callNumbersList);
    var callNumbersList = [...this.state.callNumbersList];
    var index = callNumbersList.indexOf(callNumber)
    if (index !== -1) {
      callNumbersList.splice(index, 1);
      this.setState({callNumbersList: callNumbersList});
    }
  }

  makeCalls = () =>
  {
      let startQueueIsClicked = this.state.startQueueIsClicked;
      console.log("Start Queue Clicked : ",startQueueIsClicked);
      console.log(this.state.callNumbersList);
      let value=this.state.value;
      for(let i=0;i<this.state.callNumbersList.length-1;i++)
      {
        value=value+"PJSIP/+91"+this.state.callNumbersList[i]+"@twilio"+i+"&";
      }
      value=value+"PJSIP/+91"+this.state.callNumbersList[this.state.callNumbersList.length-1]+"@twilio"+(this.state.callNumbersList.length-1);
      console.log("val"+value);
      this.setState({value: value});
      this.setState({
        startQueueIsClicked: !startQueueIsClicked
      });
      
  }

   
  render() 
  {          
    const callDetailsList = this.state.callDetails.map(callDetail => {
        return (
                
                    <DisplayCallDetail 
                        checkboxChangedToTrue={ this.checkboxChangedToTrue}
                        checkboxChangedToFalse={this.checkboxChangedToFalse}
                        callDetail = { callDetail } 
                        deleteCallDetail = { this.deleteCallDetail } />       
        )
        }      
    )
    let callsList = "";
   if(this.state.startQueueIsClicked)
   {
    callsList = <MakeCalls value={this.state.value} callNumbersList = { this.state.callNumbersList } />
   }

    return (
      <div>
        <Toolbar>
          <h2>Tasks</h2>
            <Button variant="contained" size="large" color="black" style={{marginLeft: "900px", backgroundColor: "white"}}>
              Actions
            </Button>        
            <Button variant="contained" size="large" color="primary" style={{marginLeft: "10px", backgroundColor: "#00BE92"}}
            onClick = { this.makeCalls }>
              Start Calling
            </Button>               
        </Toolbar>
        
        <div>
        <div className="display-table" style = {{ marginRight: "100px" }}>
          <Table aria-labelledby="tableTitle"> 
            <TableBody>
              <TableRow>
                <TableCell><h3>ContactName</h3></TableCell>
                <TableCell><h3>PhoneNumber</h3></TableCell>
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

export default DisplayCallDetails;
