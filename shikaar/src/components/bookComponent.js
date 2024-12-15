import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Fieldset} from 'primereact/fieldset';
import {InputSwitch} from 'primereact/inputswitch';
import axios from "axios";
import { backendUrlBooking} from "../BackendURL";
import { ProgressSpinner } from "primereact/progressspinner";
import numeral from "numeral";
import {Message} from 'primereact/message';
import BookSuccess from "./bookSuccess";


class Book extends Component {
    constructor(props){
        super(props);
        this.state={
            panelCollapsed1 : true,
            panelCollapsed2 : true,
            panelCollapsed3 : true,

            // formValue:{
            //     noOfPersons: "",
            //     checkInDate: "",
            //     totalCharges: "",
            //     checkOutDate : "",
            //     flightInclude: "",
            // },
            formValue :{
                noOfPersons: Number(sessionStorage.getItem("travellersCount")),
                checkInDate: sessionStorage.getItem("startDate"),
                totalCharges:sessionStorage.getItem("totalCharges"),
                checkOutDate : sessionStorage.getItem("checkOutDateformat"),
                flightInclude: sessionStorage.getItem("flightInclude")=== "true",
            },
            formErrorMessage:{
                noOfPersons:"",
                checkInDate:""
            },
            formValid:{
               noOfPersons:true,
               checkInDate:true,
               buttonActive : sessionStorage.getItem("travellersCount") !== ""
            },
            dstnObj : "",
            successMessage : "",
            errorMessage : "",
            dataStatus : "",
            bookingStatus : false
        }
    }

    componentDidMount=()=>{
        this.getDstnObj();
        this.setState({successMessage:<span>Your trip ends on  {sessionStorage.getItem("checkOutDate")} <h3> You pay : {numeral(sessionStorage.getItem("totalCharges")).format("$0,000.00")}</h3></span>})
        // this.calculateCharges(sessionStorage.getItem("travellersCount"),sessionStorage.getItem("startDate"),sessionStorage.getItem("flightInclude") === "true");
    }

    getDstnObj=()=>{
        var destinationId  = window.location.pathname.split("/")[2]
        axios.get(backendUrlBooking + '/getDetails/'+ destinationId).then((success)=>{ 
            this.setState({dstnObj : success.data,errorMessage : "",dataStatus : true})
        }).catch(error => {
            if (error.response) {
              this.setState({ errorMessage: error.response.data.message , successMessage : "",dataStatus : true});
            } else {
              this.setState({ errorMessage: error.message, successMessage : "",dataStatus : true});
            }
          })
    }

    handleSubmit = ()=>{
        this.setState({dataStatus : false})
        // console.log("handle Submit")
        axios.post(backendUrlBooking + "/" + sessionStorage.getItem("userId") +"/"
         + window.location.pathname.split("/")[2],this.state.formValue).then((success)=>{
            if(success.data){
            sessionStorage.setItem("flightInclude","")
            sessionStorage.setItem("travellersCount","")
            sessionStorage.setItem("startDate","")
            sessionStorage.setItem("checkOutDateformat","")
            sessionStorage.setItem("totalCharges","")
            this.setState({successMessage : "Successfully created",bookingStatus : true ,dataStatus : true});
            }
        }).catch(error => {
            sessionStorage.setItem("flightInclude","")
            sessionStorage.setItem("travellersCount","")
            sessionStorage.setItem("startDate","")
            sessionStorage.setItem("checkOutDateformat","")
            sessionStorage.setItem("totalCharges","")
            if (error.response) {
              this.setState({ errorMessage: error.response.data.message , successMessage : "",dataStatus : true ,bookingStatus : false});
            } else {
              this.setState({ errorMessage: error.message, successMessage : "" , bookingStatus : false,dataStatus : true});
            }
          })
    }

    formatDate = (date)=>{
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
     }

    calculateCharges=(personCount,chkinDateVal,flightInclude)=>{
        if(personCount!=="" && chkinDateVal!=="") {
            var charges = (personCount * this.state.dstnObj.chargesPerPerson)
            var chkinDate = new Date(chkinDateVal);
            var format = {year:'numeric',month:'long',day:'numeric'};
            sessionStorage.setItem("checkInDate" , chkinDate.toLocaleString('en',format))            
            var checkOutDate = new Date(chkinDate.setDate(chkinDate.getDate() + this.state.dstnObj.noOfNights));
            sessionStorage.setItem("checkOutDate" , checkOutDate.toLocaleString('en',format))
            var fullDate = (checkOutDate.toLocaleString('en',format));
            var totlCharges = flightInclude?(charges + this.state.dstnObj.flightCharges):charges;
            this.setState({successMessage:<span>Your trip ends on  {fullDate} <h3> You pay : {numeral(totlCharges).format("$0,000.00")}</h3></span>});
        }
    }
    
    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const formValueObj  = this.state.formValue;
        if(name === "checkInDate"){
            var chkinDate = new Date(value);
            var checkOutDate = new Date(chkinDate.setDate(chkinDate.getDate() + this.state.dstnObj.noOfNights));
            formValueObj.checkOutDate = this.formatDate(checkOutDate)
        }
        formValueObj[name] = value

        this.setState({ formValue: formValueObj}) 
        this.validateField(name, value);
    };


    validateField = (name, value)=>{
        var error = "";
        var status = false;
        this.setState({errorMessage : ""})
    switch (name) {
        case "noOfPersons":
                error = "field required"
                if(value){
                    value>=1 && value<=5 ? error = "" : error = " Value should be in between 1 to 5"
                }
                if(error === "" && this.state.formValid.checkInDate){
                    this.calculateCharges(value,this.state.formValue.checkInDate,this.state.formValue.flightInclude)
                }
                else{
                    this.setState({successMessage : "" })
                }
                
            break;
        
        case "checkInDate":
                error = "field required"
                new Date(value) > new Date() ? error = "" : error ="Booking date should be greater than today"
                if(error === "" && this.state.formValid.noOfPersons){
                    this.calculateCharges(this.state.formValue.noOfPersons,value,this.state.formValue.flightInclude)
                }
                 else{
                     this.setState({successMessage : "" })
                }
            break;

        case "flightInclude":
                if(this.state.formValid.noOfPersons && this.state.formValid.checkInDate){
                    this.calculateCharges(this.state.formValue.noOfPersons,this.state.formValue.checkInDate,value)
                }
            break;

        default:
            break;
        }

        if(error === ""){
            status = true
        }else{
            status = false
        }

        const { formErrorMessage } = this.state;
        this.setState({ formErrorMessage: { ...formErrorMessage, [name]: error } })

        var formValidObj =this.state.formValid;
        formValidObj[name] =status;
        formValidObj.buttonActive = formValidObj.noOfPersons && formValidObj.checkInDate
        this.setState({formValid : formValidObj})
    }
 
    render() {
        // {console.log(this.state.dstnObj)}
        // {console.log(this.state.formValue.checkInDate)}
        // {console.log(this.state.formValue.totalCharges)}
        return (
          <React.Fragment>
            {this.state.dataStatus ? !this.state.bookingStatus ? 
                (<div className="bookSection" id = "book">
                {this.state.redirect}
                 <div className="container-fluid row" style={{marginTop : "75px",position : "relative"}}>

                                                       {/* FieldSet */}
                   <div className="col-md-6 offset-md-1 text-left">
                    <h2>{this.state.dstnObj.name}</h2>
                    
                    <Fieldset  legend="Overview" toggleable={true} collapsed={this.state.panelCollapsed1} onToggle={(e) => this.setState({panelCollapsed1: e.value})}>
                      <p className="text-justify">
                          {this.state.dstnObj.details.about}
                      </p>
                   </Fieldset>
                   <br/>

                   <Fieldset  legend="Package Inclusions" toggleable={true} collapsed={this.state.panelCollapsed2} onToggle={(e) => this.setState({panelCollapsed2: e.value})}>
                       <ul>
                           {this.state.dstnObj.details.itinerary.packageInclusions.map((item,index)=>{return(<li key={index}>{item}</li>)})}
                       </ul>
                   </Fieldset>
                   <br/>

                   <Fieldset  legend="Itinerary" toggleable={true} collapsed={this.state.panelCollapsed3} onToggle={(e) => this.setState({panelCollapsed3: e.value})}>
                      <div >
                       <h3>Day Wise Itinerary</h3>
                       <h5>Day 1</h5>
                       <p>{this.state.dstnObj.details.itinerary.dayWiseDetails.firstDay}</p>
                       {this.state.dstnObj.details.itinerary.dayWiseDetails.restDaysSightSeeing.map((item,index)=>{
                           return(
                               <span key={index}>
                               <h5>Day {index+2}</h5>
                               <p>{item}</p></span>
                           )
                       })}
                       <h5>Day {this.state.dstnObj.details.itinerary.dayWiseDetails.restDaysSightSeeing.length+2}</h5>
                       <p>{this.state.dstnObj.details.itinerary.dayWiseDetails.lastDay}</p>
                       
                       <p className="text-danger">**This itinerary is just a suggestion,itinerary can be modified as per requirement.<Link to="/">Contact Us</Link> for more details</p>
                    
                     </div>
                   </Fieldset>
                   
                   </div>   


                                                                   {/* Form */}
                   <div className="col-md-4 m-2 text-left card bg-light" style={{height : "100%"}}>
                    <div className="card-body"> 
                     <form >

                                                           {/* Number of Travelers */}
                      <div className="form-group" >
                         <label htmlFor="noOfPersons" style={{fontWeight : 600}}>Number of Travelers:</label>
                         <input type="number"  name="noOfPersons" min = "1"  max = "5" placeholder="How many of you were coming??" className="form-control" value={this.state.formValue.noOfPersons} onChange={this.handleChange }/>
                         {this.state.formErrorMessage.noOfPersons ? <Message severity="error" text={this.state.formErrorMessage.noOfPersons} /> :null}                      
                      </div>
                          
                                                           {/* Trip start Date */}
                      <div className="form-group" >
                         <label htmlFor="checkInDate"style={{fontWeight : 600}}>Trip start Date:</label>
                         <input type="date"  name="checkInDate"  className="form-control" value={this.state.formValue.checkInDate} onChange={this.handleChange}/>
                         {this.state.formErrorMessage.checkInDate ? <Message severity="error" text={this.state.formErrorMessage.checkInDate} /> :null}                      
                       </div>

                                                           {/* flightInclude */}                                
                       <div>
                         <label style={{fontWeight : 600}}>Include Flights: &nbsp;</label>
                         <span><InputSwitch name="flightInclude"  checked={this.state.formValue.flightInclude} onChange={this.handleChange} /></span><br/>
                         <br/>
                       </div>

                       <span >{this.state.successMessage}</span>
                       <span className="text-danger">{this.state.errorMessage}</span>

                      </form>
                      <div>
                           <button type="button" className="btn btn-primary btn-block" name="confirmBooking" onClick={this.handleSubmit} disabled={!this.state.formValid.buttonActive}>Click To Book</button>
                            <br/>
                           <Link to="/packages" ><button type="button" name="goBack" className="btn btn-primary btn-block" onClick={()=>{
                                sessionStorage.setItem("flightInclude","")
                                sessionStorage.setItem("travellersCount","")
                                sessionStorage.setItem("startDate","")
                                sessionStorage.setItem("checkOutDateformat","")
                                sessionStorage.setItem("checkOutDate","")
                                sessionStorage.setItem("totalCharges","")
                           }}>Go Back</button></Link>
                       </div>
                     </div>
                   </div>                 
                 </div>                  
                        </div> ) : <BookSuccess obj = {this.state.dstnObj}/> 
               :<div style={{marginTop:"100px" , paddingBottom : "220px"}}><ProgressSpinner/></div>
               } 
           </React.Fragment>           
        );
    }
}
export default Book;
