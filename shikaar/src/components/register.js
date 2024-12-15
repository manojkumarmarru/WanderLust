import React, { Component } from "react";
import axios from "axios";
import "../App";
import { Link } from "react-router-dom";
import {backendUrlUser} from '../BackendURL';
import {Sidebar} from 'primereact/sidebar'
import {ProgressSpinner} from 'primereact/progressspinner';
import {InputText} from 'primereact/inputtext';

import {Message} from 'primereact/message';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        name: "",
        emailId: "",
        contactNo: "",
        password: ""
      },
      formErrorMessage: {
        name: "",
        emailId: "",
        contactNo: "",
        password: ""
      },
      formValid: {
        name: false,
        emailId: false,
        contactNo: false,
        password: false,
      },
      successMessage: "",
      errorMessage: "",
      registeredStatus : false,
      spinnerStatus : false
    };
  }

  handleRegistration = ()=>{
    this.setState({registeredStatus : false})
  }

  register = () => {
    /* 
     Write code for axios POST request 
     Handle success and error cases as mentioned in QP
    */
   this.setState({spinnerStatus : true})
    axios.post(backendUrlUser + "/register",this.state.formValue).then(success=>{
              // To make a refreshed page look after the submit button is pressed
        if(success){
          this.setState({successMessage : "Successfully Registered",registeredStatus : true,spinnerStatus : false,
          formValue: {
            name: "",
            emailId: "",
            contactNo: "",
            password: ""
          }
        })
    
        }
        }).catch(error => {
      if (error.response) {
        this.setState({ errorMessage: error.response.data.message, successMessage: "",spinnerStatus : false,
        formValue: {
          name: "",
          emailId: "",
          contactNo: "",
          password: ""
        } });
      } else {
        this.setState({spinnerStatus : false, errorMessage: error.message, successMessage: "" ,
        formValue: {
          name: "",
          emailId: "",
          contactNo: "",
          password: ""
        }});
      }
    })
  }


  handleRegister = (event) => {
    // prevent page reload and invoke submitAllocation() method
    event.preventDefault();
    this.register();
  }


  handleChange = (event) => {
    /*
      Handles any change in input field and assign it to their formValue state. 
      Invoke validateField() to trigger validations on every change of state
    */
        // and update form state with value. Should also invoke validate field
        if(this.state.errorMessage.length !== 0){
          this.setState({errorMessage : ""})
        }
        var inputfield = event.target.name;
        var enteredvalue = event.target.value;
    
        var formObj = this.state.formValue
        formObj[inputfield] = enteredvalue
    
        this.setState({formValue : formObj})
        this.validateField(inputfield, enteredvalue); 
  }

  validateField = (fieldName, value) => {
   var errorMessage = "";

    switch (fieldName) {
      case "name":
            errorMessage = "field required"
            if(value){
              var regex1 = new RegExp(/^[A-Za-z][A-Za-z\s]{2,}[^\s]$/)
              regex1.test(value)?errorMessage="":errorMessage = "Should contain atleast 4 alphabets (alphabets and spaces only)" }       
        break;

      case "emailId":
            errorMessage = "field required"
            if(value){
              var regex2 = new RegExp(/[\w.]+@[a-z]+\.[a-z]{2,3}$/)
              regex2.test(value)?errorMessage="":errorMessage = "Should be of format: exa23le&^@exm.com" }
        break;

      case "contactNo":
            errorMessage = "field required"
            if(value){
              var regex3 = new RegExp(/^[6-9][0-9]{9}$/)
              regex3.test(value)?errorMessage="":errorMessage = "Should be a  valid Indian number" 
            }
        break;    

      case "password":   
            errorMessage = "field required"
            if (value) {
              var regex4 = new RegExp(/^(?=.*[A-Z])(?=.*[!@#$&*%&])(?=.*[0-9])(?=.*[a-z]).{7,20}$/)
              regex4.test(value)?errorMessage="":errorMessage = "Should contain a number, uppercase & lowercase alphabet and a special character(!@#$&*%&)" 
            }
        break;

      default:
        break;
    }

    var fromErrObj = this.state.formErrorMessage;
    fromErrObj[fieldName] = errorMessage
    this.setState({formErrorMessage : fromErrObj})


                                // FormValid Manipulation
  var status = false;
    if(errorMessage === ""){
      status = true
    }
  
    var formValidObj = this.state.formValid;
    formValidObj[fieldName] = status;
    formValidObj.buttonActive = formValidObj.name && formValidObj.emailId 
                                 &&formValidObj.contactNo && formValidObj.password 

    this.setState({formValid : formValidObj})   
  }

  render() {
      var a = <span className="text-danger">*</span>
    return (
    
    <React.Fragment >
        {!this.state.registeredStatus? 
                <div className="registerSection" id = "register" >
                <div className="container-fluid row" style={{marginTop : "75px",position : "relative"}}>
                  <div className="col-md-5 offset-md-4 text-left">
                   <div  className="card bg-white" style={{width : "500px"}}>
                      <div className="card-body text-left">
                        <div>
                          <h2>Join Us</h2>
                        </div>
                        <br/>
                        {/* Create form to display the view as shown in QP */}
                        {/* Display success or error message for appropriate inputs*/}
                        
                        <form onSubmit={this.handleRegister}>

                                    {/* Name */}
                          <div className="form-group">
                            <span className="p-float-label">
                             <InputText id="name" value= {this.state.formValue.name}
                              required type="text"
                              name = "name" 
                              onChange={this.handleChange} 
                              className="form-control"/>
                              <label htmlFor="name"  className="font-weight-bold text-dark">Name{a}</label>
                            </span>
                            {this.state.formErrorMessage.name ? <Message severity="error" text={this.state.formErrorMessage.name} /> :null}
                          </div>
                          <br/>
                                    {/* Email Id */}
                          <div className="form-group">
                            <span className="p-float-label">
                             <InputText id="emailId" value= {this.state.formValue.emailId}
                              required type="email"
                              name = "emailId" 
                              onChange={this.handleChange} 
                              className="form-control"/>
                              <label htmlFor="emailId"  className="font-weight-bold text-dark">Email Id{a}</label>
                            </span>
                            {this.state.formErrorMessage.emailId ? <Message severity="error" text={this.state.formErrorMessage.emailId } /> :null}
                          </div>
                          <br/>

                                    {/* Contact Number */}
                          <div className="form-group">
                            <span className="p-float-label">
                             <InputText id="contactNo" value= {this.state.formValue.contactNo}
                              required type="number"
                              min = "6000000000"
                              max = "9999999999"
                              name = "contactNo" 
                              onChange={this.handleChange} 
                              className="form-control"/>
                              <label htmlFor="contactNo"  className="font-weight-bold text-dark">Contact Number{a}</label>
                            </span>
                            {this.state.formErrorMessage.contactNo? <Message severity="error" text={this.state.formErrorMessage.contactNo} /> :null}
                          </div>
                          <br/>

                                    {/* Password */}
                         <div className="form-group">
                            <span className="p-float-label">
                             <InputText id="password" value= {this.state.formValue.password}
                              required type="password"
                              name = "password" 
                              onChange={this.handleChange} 
                              className="form-control"/>
                              <label htmlFor="password"  className="font-weight-bold text-dark">Password{a}</label>
                            </span>
                            {this.state.formErrorMessage.password ? <Message severity="error" text={this.state.formErrorMessage.password} /> :null}
                          </div>
                          <br/>

                          <p>{a}marked fields are mandatory</p>  

                          <button type="submit" name="Regsubmit" className="btn btn-block btn-primary" disabled = {!this.state.formValid.buttonActive}>Register</button><br/>                          
                          <div>
                          <br/>
                          <span className="text-danger" style={{fontWeight : "bold"}}  name="errorMessage">{this.state.errorMessage}</span>
                          </div>
                        </form>
                        {this.state.spinnerStatus ?  <Sidebar visible={true} onHide ={()=>{this.setState({visible_Right  : true})}} style={{backgroundColor : "rgba(0,0,0,0.3)"}}  fullScreen={true} baseZIndex={1000000}>
                          <div className="text-center" >
                          <ProgressSpinner />
                          </div>
                          </Sidebar>:null}
                        </div>
                      </div>  
                  </div>
                </div>
              </div>
          : 
          <div className="container-fluid row" style={{marginTop : "75px",position : "relative"}}>
              <div className="col-md-6 offset-3" style={{marginBottom : "200px"}}> 
              <h3><p className="text-success" name="successMessage">{this.state.successMessage}</p></h3>
              <Link to="/login"><a onClick={this.handleRegistration} href="/login" style={{marginBottom : "160px"}} ><h4><u>Click here to login</u></h4></a></Link>
              </div>
          </div>}
        <br/>
      </React.Fragment>
    );
  }
}

export default Register;
