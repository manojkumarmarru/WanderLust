import React, { Component } from 'react';
import {Sidebar} from 'primereact/sidebar';
import Tabview from './tabview';
import {ProgressSpinner} from 'primereact/progressspinner';
import axios from "axios";
import {backendUrlPackage} from '../BackendURL';
import numeral from "numeral";
class Hotdeals extends Component {
    constructor(){
        super();
        this.state = {
            rowArr:[],
            visibleRight:false,
            activeIndex:0,
            DestinationObj:""

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
        axios.get(backendUrlPackage+"/hotDeals").then((success)=>{
            this.setState({errorMessage:""})

        var packArray=success.data
  
    var rowArr = packArray.map((emp) => {
        var image=emp.imageUrl.split("/")
        
        return (
           
            <tr key={emp.destinationId}>
    
            
                <td><div className="card bg-light text-dark package-card " style={{border:"0px"}} key={emp.destinationId}>
            <div className="card-body row">
                <div className="col-md-4"  >
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
                    <div className="text-center text-success"><h6>{numeral(emp.chargesPerPerson).format("$0,00.00")}</h6></div><br /><br />
                    <div><button className="btn btn-primary book btn-block" onClick={() => this.getItinerary(emp)}>View Details</button></div><br />
                    <div><button className="btn btn-primary book btn-block" onClick={() => this.openBooking(emp)}>Book </button>  </div>
                </div>
            </div>
        </div><br/></td>
            </tr>
        )
    })
     this.setState({rowArr:rowArr})
        }).catch(error => {
            this.setState({bookingData:""});
            if (error.response) {
              this.setState({ errorMessage: error.response.data.message });
            } else {
              this.setState({ errorMessage: error.message});
            }
          })
    }
    
    render() {  
        return (
            <React.Fragment>
         { this.state.visibleRight?<Sidebar style={{overflow: "scroll"}} visible={this.state.visibleRight}  position="right" className="p-sidebar-lg" baseZIndex={1000000} onHide={() =>{ 
             sessionStorage.setItem("flightInclude","")
             sessionStorage.setItem("travellersCount","")
             sessionStorage.setItem("startDate","")
             sessionStorage.setItem("checkOutDateformat","")
             sessionStorage.setItem("checkOutDate","")
             sessionStorage.setItem("totalCharges","")
            this.setState({visibleRight: false})}}>
        <Tabview ActiveIndex={this.state.activeIndex} DestinationObj={this.state.DestinationObj}/>
            </Sidebar>:null
        }
                {  !this.state.errorMessage ? this.state.rowArr.length!==0 ? <div>
                    <br/><br/>
                    <table>
                    <thead></thead>
                    <tbody>{this.state.rowArr}</tbody>
                    </table> 
                    <br/><br/>
                    </div>: <div className="content-section implementation" style={{marginTop:"100px" , paddingBottom : "220px"}}>
                    <h3>Loading!!!!</h3>
                    <h5>Please wait</h5>
                    <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"/>
                </div> : <div className="text-danger display-4" style={{marginBottom : "145px", marginTop: "145px"}}>{this.state.errorMessage}</div>
                }
            </React.Fragment>
        
        )
    }

}

export default Hotdeals;
