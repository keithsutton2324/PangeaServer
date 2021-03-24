//import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
var loggedIn = false;

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  }

  onInputChange = (event) => {
    var name = event.target.name
    var value = event.target.value
    this.setState({
      [name]: value
    })
  }
  handleSubmit=(event)=> {
    event.preventDefault();
    console.log("KJS---->Login.js this.state", this.state);
    let body={
        username: this.state.username,
        password: this.state.password,
    }
    Axios.post(
      "/api/login",
       body
    ).then((response)=>{
        // detect successful login
        if (response.data.username) {
          loggedIn = true;
          window.$loggedIn="loggedIn"
          console.log("KJS---->Login.js Login Successful");
          console.log("Login",response)
        }
    })
    .catch(error=>{
      loggedIn = false;
      window.$loggedIn="loggedIn"
      console.log("unsuccessful login error:", error);
    })
  }
  render() {
    return (<div>
    <script type="text/javascript" src="user.js"> 
    </script>       
    <form onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <ul>
        <li>  
        <p><input onChange={this.onInputChange} type="text" class="form-control" name={"username"} placeholder="Username" /></p>
        </li>
        <li>
        <p><input onChange={this.onInputChange} type="text" class="form-control" name={"password"} placeholder="Password" /></p>
        </li>
        <li>
        <p><button class="btn btn-lg btn-primary btn-block" id="submit" type="submit">Submit</button></p>
        </li>
        </ul>
      </form>
    </div>
    )
  }
}

export default Login;
