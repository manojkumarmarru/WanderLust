import React, { Component } from "react";
import axios from "axios";
import {backendUrlUser,backendUrlBooking} from '../BackendURL';
import {Card} from 'primereact/card';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Dialog} from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Link} from 'react-router-dom';
import {Messages} from 'primereact/messages';
import numeral from "numeral";

class PlannedTrips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingData: "",
            errorMessage: "",
            claimBooking:"",
            logged_userId: sessionStorage.getItem('userId'),
            dialog_visible: false,
            dataStatus:false
        };
  }
  onClick = (booking) => {
    this.setState({ dialog_visible: true ,claimBooking : booking})
  }

  onHide = () => {
    this.setState({ dialog_visible: false });
  }

   fetchBookingbyID = () => {
      
    axios.get(backendUrlUser+'/getBookings/'+this.state.logged_userId).then((successresponse)=>{
      this.setState({bookingData:successresponse.data,dataStatus : true,errorMessage:""});
    }).catch((error)=>{
        this.setState({
          errorMessage: error.message,
          bookingData: "",
          dataStatus : true
        });
    })
  };

showSuccess() {
    this.messages.show({severity: 'success', detail: ' So Sad to see you go! Your Booking has successfully Cancelled'});
}
clear() {
    this.messages.clear();
}
  
  cancelBooking=()=>{

    this.setState({dialog_visible:false,dataStatus : false});
   
    axios.delete(backendUrlBooking+'/cancelBooking/'+this.state.claimBooking.bookingId).then((successresponse)=>{
        this.fetchBookingbyID();
        if(successresponse){            
            this.setState({dialog_visible:false ,
                errorMessage:""
                //  dataStatus : true
                })
            this.showSuccess();
        }
        
      }).catch(error => {
        this.setState({bookingData:""});
        if (error.response) {
          this.setState({ errorMessage: error.response.data.message , successMessage : "",});
        } else {
          this.setState({ errorMessage: error.message, successMessage : ""});
        }
        
      })       
  };

  componentDidMount = () =>{
      this.fetchBookingbyID();
    }
    
  render(){   
    var bookings = this.state.bookingData;
    
    var month=['January','February','March','April','May','June','July','August','September','October','November','December'];
    const foot = (
        <div>
          <Button  className=" p-button-info  btn-primary:hover btn-block btn-viewbooking" label="BACK" onClick={this.onHide}  />
          <Button className=" p-button-danger  btn-block btn-viewbooking" label="CONFIRM CANCELATION" onClick={this.cancelBooking} />
        </div>
      );
    const noBooking =(
        <div className="row" style={{paddingBottom : "168px"}}>
            <div className="col-md-12" >
            <h1 >Sorry you have no Planned Trips Yet! </h1> <br/><br/>
            <a href="/"><Button  className="p-button-success btn btn-primary:hover btn-viewbooking" label="Click here to start booking"  /> </a><br/><br/>
            </div>
        </div>
            
    )
      const head=(
          <b>
              Confirm Cancellation
          </b>
      )

    const footer = (
        <div className="footer"> </div>
    );

    const header=(booking) =>{
        
        return(<div className='cardheader'><b>Booking Id : {booking.bookingId}</b></div>)
    }

    const checkinDate=(book)=>{        
           var checkin = new Date(book.checkInDate).toLocaleDateString();
           var checkindate=checkin.split('/');
           
            var date= month[checkindate[0]-1]+" "+checkindate[1]+","+checkindate[2]
           return(date)
    };
    const checkoutDate=(book)=>{        
        var checkout = new Date(book.checkOutDate).toLocaleDateString();
        var checkoutdate=checkout.split('/');
         
         var date= month[checkoutdate[0]-1]+" "+checkoutdate[1]+","+checkoutdate[2]
        return(date)
    };
    return(
    <React.Fragment>
        <div className="book-page-viewbooking" >
        <div  >
            {this.state.claimBooking ?<Dialog header={head} visible={this.state.dialog_visible} style={{width: '40vw',textAlign:'left' }} footer={foot} onHide={this.onHide}>            
            <div>
                <div className='text-danger'>Are you sure you want to cancel trip to {this.state.claimBooking.destinationName}</div>
                <b><div>Trip start Date : {checkinDate(this.state.claimBooking)}</div></b>
                <div><b>Trips Ends on : {checkoutDate(this.state.claimBooking)}</b></div>
                <div><b>Refund Amount : {numeral(this.state.claimBooking.totalCharges).format("$0,000.00")}</b></div>
                {/* <div>Refund Amount : ${this.state.claimBooking.totalCharges}</div> */}
           </div>  
            </Dialog>: null}
        </div>
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-6 offset-md-3 bookingTable">
        <Messages ref={(el) => this.messages = el} />
        {this.state.errorMessage === ""?
        this.state.logged_userId ?
        <div style={{marginTop:"100px" , paddingBottom : "120px" }}>
        {this.state.dataStatus ? bookings.length !==0? 
        
        (bookings.map((booking,index)=>(
            <div key={index}><br></br>
            
           <Card title={booking.destinationName}  style={{width: '600px', backgroundColor: 'rgb(161, 223, 252)',border:"10px"}} className="ui-card-shadow plantripcard " footer={footer} header={header(booking)}>
           <div className="row">
                <div className="col-md-6">
                    <b><div>Trips starts on : {checkinDate(booking)}</div></b>
                    <b><div>Trips Ends on : {checkoutDate(booking)}</div></b>
                    <b><div>Traveller : {booking.noOfPersons}</div></b>
                </div>
            <div className="col-md-5 offset-md-1">
                    <b><div>Fare Details:</div></b>
                    <div><b>${booking.totalCharges}</b></div>
                    <div><a  className="text-primary  btn-link" onClick={()=>{this.onClick(booking)}} href="#">Claim Refund</a></div>
            </div>
            </div>           
            </Card><br/><br/></div>
           )))
             :       <div>{noBooking}</div>: <div className="content-section implementation" style={{marginTop:"100px" , paddingBottom : "220px"}}>
                    <h3>Loading!!!!</h3>
                    <h5>Please wait</h5>
                    <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"/>
                </div>}  

                </div>:<div><br></br><h2 className="text-info" style={{marginTop:"100px" , paddingBottom : "220px"}}>Please <Link to='/login' className="button1">login</Link> to view your trips</h2></div>
        :<div className="text-danger display-4" style={{marginBottom : "145px", marginTop: "145px"}}> {this.state.errorMessage}</div>}
        </div>
        </div>
        </div>
        </div>
       </React.Fragment>
    )
}}
export default PlannedTrips;

