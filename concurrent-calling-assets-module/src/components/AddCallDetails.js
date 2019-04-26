import React, { Component } from 'react'
import axios from 'axios';

export class AddCallDetails extends Component 
{
  state = {
    "id" : " ",
      "userId" : " ",
      "userName" : " ",
      "firstName" : " ",
      "lastName" : " ",
      "password" : " ",
      "displayPicture" : null,
    "checked" : " ",
    "contactName" : " ",
    "phoneNumber" : " ",
    "status" : " ",
    "dueDate" : " "
  }

  onSubmitHandler = (e) =>
  {
    e.preventDefault();
    //this.props.addCallDetails( this.state );
    const id = this.state.id;
    const userId = this.state.userId
    const userName = this.state.userName
    const firstName = this.state.firstName
    const lastName = this.state.lastName
    const password = this.state.password
    const displayPicture = this.state.displayPicture
    const checked = this.state.checked
    const contactName = this.state.contactName
    const phoneNumber = this.state.phoneNumber
    const status = this.state.status
    const dueDate = this.state.dueDate

    console.log("contact : ",contactName, " phone : ",phoneNumber, " sttaus : ", status, " firstName : ",firstName, "userName : ",userName, "userId : " , userId );

    const data = {
      "id": id,
      "user" :
      {
        "id": userId,
        "userName": userName,
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "displayPicture": displayPicture,
      },
      "checked": checked,
      "contactName": contactName,
      "phoneNumber": phoneNumber,
      "status": status,
      "dueDate": dueDate
    }

    axios.post('http://localhost:8080/call-details',data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  }

  onChangeHandler = (e) =>
  {
    console.log(e.target.value);
    this.setState({
      [e.target.id] : e.target.value 
    })
  }

  render()
  {
    return (
      <div style = {{ paddingTop: "50px"}}>
        <form onSubmit = { this.onSubmitHandler }>
          <input type = "number" placeholder = "id" id = "id" onChange = { this.onChangeHandler }/>
          <input type = "number" placeholder = "userId" id = "userId" onChange = { this.onChangeHandler } />   
          <input type = "text" placeholder = "contactName" id = "contactName" onChange = { this.onChangeHandler } /><br/>
          <input type = "text" placeholder = "phoneNumber" id = "phoneNumber" onChange = { this.onChangeHandler } />
          <input type = "text" placeholder = "status" id = "status" onChange = {this.onChangeHandler }/>
          <input type = "text" placeholder = "dueDate" id = "dueDate" onChange = { this.onChangeHandler }/><br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default AddCallDetails;
