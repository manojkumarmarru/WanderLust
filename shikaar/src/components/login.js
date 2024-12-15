import React, { Component } from "react";

import {InputText} from 'primereact/inputtext';
import axios from "axios";
import { Navigate  } from 'react-router-dom';
import {backendUrlUser} from '../BackendURL';
import {Message} from 'primereact/message';






class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginform: {
                contactNo: "",
                password: ""
            },
            loginformErrorMessage: {
                contactNo: "",
                password: ""
            },
            loginformValid: {
                contactNo: false,
                password: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            loadHome: false,
            loadRegister: false,
            userId: "",
            
        }
        

    }

    handleClick = () => {
        this.setState({ loadRegister: true })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { loginform } = this.state;
        this.setState({
            loginform: { ...loginform, [name]: value }
        });
        this.validateField(name, value);
    }

    


    login = () => {
        const { loginform } = this.state;
        axios.post(backendUrlUser+'/login', loginform)
            .then(response => {
               // console.log(response);
                let userId = response.data.userId;
                sessionStorage.setItem("contactNo", response.data.contactNo);
                sessionStorage.setItem("userId", userId);
                sessionStorage.setItem("userName", response.data.name);
                window.location.reload();
                this.setState({ loadHome: true, userId: userId })

            }).catch(error => {
                if (error.response) {
                  this.setState({ errorMessage: error.response.data.message , successMessage : ""});
                } else {
                  this.setState({ errorMessage: error.message, successMessage : ""});
                }
                sessionStorage.clear();
            })
        // console.log(this.state.loginform.contactNo, this.state.loginform.password);
    }

    handleSubmit = (event) => {
        
        event.preventDefault();
        this.login();

    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.loginformErrorMessage;
        let formValid = this.state.loginformValid;
        switch (fieldName) {
            case "contactNo":
                let cnoRegex = /^[1-9]\d{9}$/;
                if (!value || value === "") {
                    fieldValidationErrors.contactNo = "Please enter your contact Number";
                    formValid.contactNo = false;
                } else if (!value.match(cnoRegex)) {
                    fieldValidationErrors.contactNo = "Contact number should be a valid 10 digit number";
                    formValid.contactNo = false;
                } else {
                    fieldValidationErrors.contactNo = "";
                    formValid.contactNo = true;
                }
                break;
            case "password":
                if (!value || value === "") {
                    fieldValidationErrors.password = "Password is mandatory";
                    formValid.password = false;
                    } else if (value.length<=7 || value.length>=20 || !(value.match(/[a-zA-z]/) && value.match(/[0-9]/) && value.match(/[-!@#$%^&*]/))) {
                        fieldValidationErrors.password = "Should contain a number, uppercase & lowercase alphabet and a special character"
                        formValid.password = false;
                } else {
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.contactNo && formValid.password;
        this.setState({
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid,
            successMessage: ""
        });
        
    }

    

    render() {
        if (this.state.loadHome === true) return <Navigate  to={'/home/' + this.state.userId} />
        if (this.state.loadRegister === true) return <Navigate  to={'/register'} />
        var a = <span className="text-danger">*</span>
        return (
            <React.Fragment>
               
            <section id="loginPage" className=" book-page-viewbooking "> 
                <div className="row login-class" >
                    <div className="col-md-4 offset-4 ">
                        <div  className="card bg-light">
                            <div className="card-body text-left ">
                                <h1  >Login</h1>
                                <br/>
                                <form className="form " onSubmit={this.handleSubmit}> {/* [formGroup]="loginForm" (ngSubmit)="login()" */}
                                    <div className="form-group">
                                        {/* <label htmlFor="uContactNo">Contact Number<span className="text-danger">*</span></label> */}
                                        <span className="p-float-label">
                                        <InputText
                                        size="30"
                                        id="float-input"
                                            type="number"
                                            value={this.state.loginform.contactNo}
                                            onChange={this.handleChange}
                                            
                                            name="contactNo"
                                            className="form-control"
                                        />
                                        <label htmlFor="float-input" className="font-weight-bold text-dark" >Contact No{a}</label>
                                        </span>
                                        {this.state.loginformErrorMessage.contactNo ? (<span className="text-danger small" >
                                        <small><Message severity="error"  text={this.state.loginformErrorMessage.contactNo} /></small>
                                    </span>)
                                        : null}
                                    </div>
                                    
                                    <br/>
                                    
                                    <div className="form-group">
                                        {/* <label htmlFor="uPass">Password<span className="text-danger">*</span></label> */}
                                        <span className="p-float-label">
                                        <InputText
                                         size="30"
                                         id="float-input1"
                                            type="password"
                                            value={this.state.loginform.password}
                                            onChange={this.handleChange}
                                            name="password"
                                            className="form-control"
                                        />
                                        <label htmlFor="float-input1" className="font-weight-bold text-dark" >Password{a}</label>
                                        </span>
                                        {this.state.loginformErrorMessage.password ? (<span className="text-danger small">
                                        <Message severity="error" text={this.state.loginformErrorMessage.password} />
                                    </span>)
                                        : null}<br />
                                        <br/>
                                    <span ><span className="text-danger">*</span> marked feilds are mandatory</span>
                                    <br />                                        
                                    </div>                    
                                    <button
                                        type="submit"
                                        name="submit"
                                        disabled={!this.state.loginformValid.buttonActive}
                                        label="Login" 
                                        className=" btn btn-primary btn-block" 
                                    >  Login                                      
                                    </button>
                                </form>
                                <br />
                                {/* <!--can be a button or a link based on need --> */}
                                <button label="Click here to Register" className="btn btn-primary btn-block" id="abc" onClick={this.handleClick} >Click here to Register</button>
                                {this.state.errorMessage && (<div className={'text-danger font-weight-bold'}>{this.state.errorMessage}</div>)}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           
            </React.Fragment>
        )
    }
}

export default Login;
