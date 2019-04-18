import React, { Component } from 'react';
import axios from 'axios';

let userId = 4;

export class SettingsEdit extends Component {
    state = {
        "id": "",
        "userName": "",
        "firstName": "",
        "lastName": "",
        "password": "",
        "diplayPicture": ""
    };

    onChangeHandler = (event) =>
    {
        console.log(event.target.value);
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    onSubmitHandler = (event) =>
    {
        event.preventDefault();
        const userName = this.state.userName;
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const password = this.state.password;
        const displayPicture = this.state.displayPicture;

        const data = {
            "userName": userName,
            "firstName": firstName,
            "lastName": lastName,
            "password": password,
            "displayPicture": displayPicture
        }

        axios.put('/users/update-user-details/4',data)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

    }

  render() {
    return (
      <div style = {{ textAlign: "center"}}>
        <form onSubmit = { this.onSubmitHandler }>
            User Name   : <input type = "text" placeholder = "userName" id = "userName" onChange = { this.onChangeHandler }/><br/><br/>
            First Name  : <input type = "text" placeholder = "firstName" id = "firstName" onChange = { this.onChangeHandler }/><br/><br/>
            Last Name   : <input type = "text" placeholder = "lastName" id = "lastName" onChange = { this.onChangeHandler }/><br/><br/>
            Password    : <input type = "password" placeholder = "password" id = "password" onChange = { this.onChangeHandler }/><br/><br/>
            Display Picture : <input type = "file" placeholder = "displayPicture" id = "displayPicture" onChange = { this.onChangeHandler }/><br/><br/>
            <input type = "Submit" id = "Submit"/>
        </form>
      </div>

    )
  }
}

export default SettingsEdit
