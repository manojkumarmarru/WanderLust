import React, {Component} from 'react';
import {  Navigate } from "react-router-dom";
// import axios from "axios";
// import {backendUrlBooking} from '../BackendURL';
// import {InputText} from 'primereact/inputtext';

import {Message} from 'primereact/message';
import {TabView,TabPanel} from 'primereact/tabview';
import {InputSwitch} from 'primereact/inputswitch';
//import {Button} from 'primereact/button';
import numeral from "numeral";
import {Dialog} from 'primereact/dialog';

export class TabViewDemo extends Component {
    constructor(props){
        super(props);

     this.state={
      //  displayCharges:"",
       flightInclude:false,
         formValue:{
           travellersCount:"",
           startDate:"",
           
         },
         formErrorMessage:{
             travellersCount:"",
             startDate:""
         },
         formValid:{
            travellersCount:"",
            startDate:"",
            buttonActive:false

         },
          //Navigate :"",
          dailogVisible:false,
          successMessage:""
     }
    }

    validateField = (fieldName, value) => {
        /* 
          Perform validation as given in QP and assign error message
        */
      
       let fieldValidationErrors = this.state.formErrorMessage;
       let formValid = this.state.formValid;
    switch(fieldName){
     case "travellersCount":
    if (value === "") {
      fieldValidationErrors.travellersCount= "field required"
      formValid.travellersCount = false;
    } else {
      if (value>=1 && value<=5) {
        fieldValidationErrors.travellersCount= "";
        formValid.travellersCount= true;
        
      } else {
        fieldValidationErrors.travellersCount = "Number of Travellers sholud be in the range of 1 to 5";
        formValid.travellersCount = false;
       
      }
    }
    break;
    case "startDate":
    if (value === "") {
        fieldValidationErrors.startDate= "field required"
        formValid.startDate = false;
      } 
      else
       {
        
        let today = new Date();
        let bdate = new Date(value);
        if (bdate >today)
         {
          fieldValidationErrors.startDate= "";
          formValid.startDate= true;
          sessionStorage.setItem("checkOutDate",this.calculateCheckOutDate(value))
          
         } 
        else
         {
          fieldValidationErrors.startDate = "Booking date should  be after today's date";
          formValid.startDate = false;
         
         }
      }
      break;
      default:
      break;
       }

       formValid.buttonActive =
       formValid.startDate &&
       formValid.travellersCount
       this.setState({
       formErrorMessage: fieldValidationErrors,
       formValid: formValid,
       successMessage: ""
       });

      };


      formatDate = (date)=>{
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
     }


calculateCheckOutDate=(startDate)=>{
  var  destnObj=this.props.DestinationObj;
  var checkInDate=new Date(startDate);
  var format={year:'numeric',month:'long',day:'numeric'};
  sessionStorage.setItem("checkInDate" , checkInDate.toLocaleString('en',format))
  var CheckoutDate=new Date(checkInDate.setDate(checkInDate.getDate()+destnObj.noOfNights));
  var checkOutDateformat = CheckoutDate
  sessionStorage.setItem("checkOutDateformat",this.formatDate(checkOutDateformat))
  var fullDate=(CheckoutDate.toLocaleString('en',format));
return fullDate
}

    calculateCharges=(event)=>{
      var  destnObj=this.props.DestinationObj;
        var charges=(this.state.formValue.travellersCount*destnObj.chargesPerPerson)
        var totlCharges=this.state.formValue.flightInclude===true?(charges+destnObj.flightCharges):charges
        sessionStorage.setItem("totalCharges",totlCharges);
      
      if(event.target.name === "calculateCharges"){
      this.setState({successMessage:"Your trip ends on "+this.calculateCheckOutDate(this.state.formValue.startDate)+" and you will pay "+numeral(totlCharges).format("$0,000.00")})
      }else{
        this.redirct()
      }
    }
    handleChange = event => {
        /*
          Handles any change in input field and assign it to their
          formValue state.invoke validateField() to trigger validations on every change of state
        */
       const target = event.target;
       const value = target.value;
       const name = target.name;
       sessionStorage.setItem(name,value);
       const { formValue } = this.state;
       this.setState({formValue: { ...formValue, [name]: value}});
       this.validateField(name, value);
      };
      redirct=()=>{
        // var visible=false;
        var destnObj=this.props.DestinationObj
        if(!sessionStorage.getItem("userId"))
        {
          sessionStorage.clear();
          this.setState({dailogVisible:true})
        }
      else{
      var bookingUrl="/book/"+destnObj.destinationId;
        this.setState({redirect:<Navigate  push to={bookingUrl}></Navigate >}) ;
          }
                  }
// flightInclusion=(event)=>{
// this.setState({flightInclude:event.target.value})
// }

    render() {
        var pkge=this.props.DestinationObj
        var image=this.props.DestinationObj.imageUrl.split("/")

        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro text-left">
                        <h2>{pkge.name}</h2>
                    </div>
                </div>

                <div className="content-section implementation">
                    <TabView  activeIndex={this.props.ActiveIndex}>
                      <TabPanel  header="Overview">
                        < div className="row panel-body bg-blue">
                            <div className="col-md-5 offset-0" style={{marginLeft:38, height:"100%"}}>
                              <img className="package-image" alt="destination comes here" src={require("../"+image[1]+"/"+image[2])} />
                            </div>
                            <div className="col-md-5 text-left"style={{marginLeft:38}} >
                                 <h4>Package Includes:</h4>
                                <ul>
                                    {pkge.details.itinerary.packageInclusions.map((data,index)=>{
                                    return ( <li key={index}>{data}</li>)
                                     })} 
                                </ul>
                            </div>

                        </div><br/>
                        <div className="row" >
                        <div className="col-md-11 text-justify" style={{marginLeft:38}}>
                        <h4>Tour Overview:</h4>
                        <p>{pkge.details.about}</p>
                        </div>
                        </div>
                        </TabPanel>
                        <TabPanel header="Itinerary">
                          <div className="text-left">
                            <h3>Day Wise Itinerary</h3>
                          <h5>Day 1</h5>
                          <p>{pkge.details.itinerary.dayWiseDetails.firstDay}</p>
                          {pkge.details.itinerary.dayWiseDetails.restDaysSightSeeing.map((data,index)=>{
                                    return (
                                      <span key={index}>
                                      <h5>Day {index+2}</h5>
                                      <p>{data}</p></span>
                                        )
                                     })} 
                           <h5>Day {pkge.details.itinerary.dayWiseDetails.restDaysSightSeeing.length+2}</h5>
                           <p>{pkge.details.itinerary.dayWiseDetails.lastDay}</p>
                       <p className="text-danger">**This itinerary is just a suggestion,itinerary can be modified as per requirement.<a href="/">Contact Us</a> for more details</p>
                           
                           </div>
                        </TabPanel>
                        <TabPanel header="Book">
                        <form className="text-left" onSubmit={this.handleSubmit}>
                        <h4 >**Charges per person: {(numeral(pkge.chargesPerPerson).format("$0,000.00"))}</h4>
                           <div className="form-group">
                              <label className="font-weight-bold">Number of Travelers:</label>
                              <input type="number"  name="travellersCount" min="1" max="5" placeholder="How many of you were coming??" className="form-control" onChange={this.handleChange }/>
                           </div>
                           {this.state.formErrorMessage.travellersCount? <Message severity="error" text={this.state.formErrorMessage.travellersCount} /> :null}<br/>
                           <div className="form-group">
                              <label className="font-weight-bold" >Trip start Date:</label>
                              <input type="date"  name="startDate"  className="form-control" onChange={this.handleChange}/>
                           </div>
                           {this.state.formErrorMessage.startDate? <Message severity="error" text={this.state.formErrorMessage.startDate} /> :null}<br/>

                           <label className="font-weight-bold">Include Flights:</label>
                           <span><InputSwitch name="flightInclude" checked={this.state.formValue.flightInclude} onChange={this.handleChange} /></span><br/>
                           <br/>
                           <button 
                      type="button"
                     name="calculateCharges"
                      className="btn btn-primary font-weight-bold"
                      disabled={!this.state.formValid.buttonActive}
                      onClick={this.calculateCharges}
                    >
                    CALCULATE CHARGES
                    </button><br/><br/>

                    {this.state.successMessage?<h5 className="text-success">{this.state.successMessage}</h5>:<span>**Charges exculde flight charges</span>}<br/>

                <div style={{textAlign:"center"}}>
                     <button
                      type="button"
                      className="btn btn-primary"
                      disabled={!this.state.formValid.buttonActive}
                      onClick={this.calculateCharges}>
                      Book
                    </button> &nbsp;
                   <a href="/"> <button
                      type="button"
                      className="btn btn-primary"
                     // onClick={(e) => this.setState({redirect:<Navigate  to="/login"></Navigate >})}
                      disabled={false}
                    >
                      Cancel
                    </button></a>
                    </div>  
                  </form>
                  {this.state.redirect}
                  {this.state.dailogVisible?<Dialog  header="not logged in ??" visible={this.state.dailogVisible} style={{width: '50%'}} modal={true} onHide={() => this.setState({dailogVisible: false})}>
           <h3 style={{Color : "rgb(161, 182, 186)"}} className="text-center ">Please <a href="/login">Login</a>  to continue</h3><br/>
           {/* <button className="btn btn-primary"  onClick={() => this.setState({redirect:<Navigate  to="/login"></Navigate >})} >Login</button> */}
        </Dialog>:null}
                        </TabPanel>
                        
                    </TabView>
                </div>
            </div>
        )
    }
}
export default TabViewDemo;