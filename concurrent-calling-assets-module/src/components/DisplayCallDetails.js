import React, { Component } from 'react';
import DisplayCallDetail from './DisplayCallDetail';
import '../css/DisplayCallDetails.css';
import AddCallDetails from './AddCallDetails';
import axios from 'axios';

export class DisplayCallDetails extends Component 
{
    state = {
        callDetails : [
          { 
            "id" : 1,
            "checked" : 0,
            "contactName" : "Pooja",
            "phoneNumber" : "8501880330",
            "status" : "dialing",
            "dueDate" : "tomorrow"
          },
          { 
            "id" : 2,
            "checked" : 0,
            "contactName" : "Swetha",
            "phoneNumber" : "8501880330",
            "status" : "dialing",
            "dueDate" : "tomorrow"
          },
          { 
            "id" : 3,
            "checked" : 0,
            "contactName" : "Namratha",
            "phoneNumber" : "8501880330",
            "status" : "dialing",
            "dueDate" : "tomorrow"
          },
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
  }
   
  render() 
  {
    const callDetailsList = this.state.callDetails.map(callDetail => {
        return (
                <tr>
                    <DisplayCallDetail 
                        callDetail = { callDetail } 
                        deleteCallDetail = { this.deleteCallDetail } />
                </tr>
        )
        }      
    )

    return (
        <div>
        <table className = "display-table">
              <th>
                <td>Call Id</td>
                <td>Checked</td>
                <td>ContactName</td>
                <td>PhoneNumber</td>
                <td>Status</td>
                <td>DueDate</td>
                <td>Delete</td>
              </th>
            { callDetailsList }
        </table>
            <AddCallDetails addCallDetails = { this.addCallDetails } />
        </div>
    )
  }
}

export default DisplayCallDetails;
