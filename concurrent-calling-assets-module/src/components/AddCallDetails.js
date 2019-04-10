import React, { Component } from 'react'
import axios from 'axios';

export class AddCallDetails extends Component 
{
  state = {
    "id" : null,
    "checked" : null,
    "contactName" : null,
    "phoneNumber" : null,
    "status" : null,
    "dueDate" : null
  }

  onSubmitHandler = (e) =>
  {
    e.preventDefault();
    //this.props.addCallDetails( this.state );
    const checked = this.state.checked
    const contactName = this.state.contactName
    const phoneNumber = this.state.phoneNumber
    const status = this.state.status
    const dueDate = this.state.dueDate

    console.log("contact : ",contactName, " phone : ",phoneNumber, " sttaus : ", status);

    const data = {
      checked,
      contactName,
      phoneNumber,
      status,
      dueDate
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
      <div>
        <form onSubmit = { this.onSubmitHandler }>
          <input type = "number" placeholder = "id" id = "id" onChange = { this.onChangeHandler } />        
          <input type = "number" placeholder = "checked" id = "checked" onChange = { this.onChangeHandler } />
          <input type = "text" placeholder = "contactName" id = "contactName" onChange = { this.onChangeHandler } />
          <input type = "text" placeholder = "phoneNumber" id = "phoneNumber" onChange = { this.onChangeHandler } />
          <input type = "text" placeholder = "status" id = "status" onChange = {this.onChangeHandler }/>
          <input type = "text" placeholder = "dueDate" id = "dueDate" onChange = { this.onChangeHandler }/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default AddCallDetails;
