import React, { Component } from 'react';
import {ProgressSpinner} from 'primereact/progressspinner';
import axios from "axios";
import {backendUrlPackage} from '../BackendURL';
import { Link } from "react-router-dom";


import Tabview from './tabview';
import {Sidebar} from 'primereact/sidebar';
import numeral from "numeral";

//import TabView from './tabview';
class Search extends Component {
    constructor(){
        super();
        this.state = {
            
            rowArr1:[],
            continent:"",
            visibleRight:false,
            activeIndex:0,
            DestinationObj:"",
            dataStatus : false,
            errorMessage : ""
          };
    }

    componentDidMount(){
       this.getPackages();

    }
    
    getItinerary = (aPackage) => {
        
        this.setState({visibleRight:true,
        activeIndex:0,DestinationObj:aPackage})

    };
    openBooking = (aPackage) => {
        this.setState({visibleRight:true,
            activeIndex:2,DestinationObj:aPackage})
    
      
    };

    getPackages=()=>{
        var cont =sessionStorage.getItem("continent")
      
        axios.get(backendUrlPackage+"/destinations/"+cont).then((success)=>{
       // this.setState({hotDeals:success.adta})
       if(success.data){
        var packArray=success.data
        var rowArr = packArray.map((emp) => {
        var image=emp.imageUrl.split("/")
            return (
                <tr key={emp.destinationId}>
                    <td><div className="card bg-light text-dark package-card" style={{border:"0px"}} key={emp.destinationId}>
                <div className="card-body row">
                    <div className="col-md-4">
                        <img className="package-image" alt="destination comes here" src={require("../"+image[1]+"/"+image[2])} />
                    </div>
                    <div className="col-md-5">
                        <div className="featured-text text-center text-lg-left">
                            <h4>{emp.name}</h4>
                            <div className="badge badge-info">{emp.noOfNights}<em> Nights</em></div>
                            {emp.discount ? <div className="discount text-danger">{emp.discount}% Instant Discount</div> : null}
                            <p className="text-dark text-justify mb-0">{emp.details.about}</p>
                        </div>
                        <br />
    
                    </div>
                    <div className="col-md-3">
                        <h4>Prices Starting From:</h4>
                        <div className="text-center text-success"><h6>{numeral(emp.chargesPerPerson).format("$0,000.00")}</h6></div><br /><br />
                        <div><button className="btn btn-primary book btn-block" onClick={() => this.getItinerary(emp)}>View Details</button></div><br />
                        <div><button className="btn btn-primary book btn-block" onClick={() => this.openBooking(emp)}>Book </button>  </div>
                    </div>
                </div>
            </div>
            <br/>
            </td>
                   
                    
                </tr>
            )
        })
         this.setState({rowArr1:rowArr,dataStatus : true,errorMessage : ""})
            }else{
                this.setState({rowArr1 : null ,dataStatus : true,errorMessage : ""})
            }
        }).catch(error => {
            if (error.response) {
              this.setState({ errorMessage: error.response.data.message, rowArr1 : null ,dataStatus : true});
            } else {
              this.setState({rowArr1 : null , errorMessage: error.message,dataStatus : true});
            }
          })
    }

        render() {
            const noBooking =(
                <div className="row" style={{ paddingBottom : "168px"}}>
                    <div className="col-md-12" >
                        <h2 className="text-center">Sorry,no packages are available for the entered Location! </h2>
                        <br/>
                        <Link to="/" ><button  className="btn btn-primary">Click here to go back</button></Link>
                        <br/>
                    </div> 
                </div>      
            )
            return (
            
                <React.Fragment>
                        <br/>
                        <br/>
                        <br/>
                    { this.state.visibleRight?<Sidebar style={{  overflow: "scroll"}} visible={this.state.visibleRight}  position="right" className="p-sidebar-lg" baseZIndex={1000000} onHide={(e) => {
                         sessionStorage.setItem("flightInclude","")
                         sessionStorage.setItem("travellersCount","")
                         sessionStorage.setItem("startDate","")
                         sessionStorage.setItem("checkOutDateformat","")
                         sessionStorage.setItem("checkOutDate","")
                         sessionStorage.setItem("totalCharges","")
                         this.setState({visibleRight: false})}}>
                        <Tabview ActiveIndex={this.state.activeIndex} DestinationObj={this.state.DestinationObj}/>
                        </Sidebar>:null}

               {this.state.dataStatus?this.state.rowArr1?<table>
                        <thead></thead>
                        <tbody>{this.state.rowArr1}</tbody>
                        </table> : this.state.errorMessage?<span className="text-danger"><h2>{this.state.errorMessage}</h2></span> : noBooking
                     : <div style={{marginTop:"100px" , paddingBottom : "220px"}}><ProgressSpinner/></div>
                    }
                        <br/>
                        <br/>    
                </React.Fragment>
            
            )
        }
    
    }
    
    export default Search;
