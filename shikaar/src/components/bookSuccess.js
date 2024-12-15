import React, { Component } from 'react';
import { Link } from "react-router-dom";


class BookSuccess extends Component {
    render() {
        return (
            <React.Fragment>
                <div className = "text-center" style={{fontWeight : "bold", paddingTop : "100px", paddingBottom : "150px"}}>
                <h1>Booking Confirmed!!</h1>
                <span className="text-success"><h2>Congratulations! Trip planned to{this.props.obj.name}</h2></span>
                <br/>
                <p>Trip starts on: {sessionStorage.getItem("checkInDate")}</p>
                <p>Trip ends on: {sessionStorage.getItem("checkOutDate")}</p>
                <Link className="text-primary" to="/viewBookings">Click here to view your bookings</Link>
                </div>
            </React.Fragment>
        );
    }
}

export default BookSuccess;