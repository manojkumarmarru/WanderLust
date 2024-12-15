// Implement booking bean class
const Booking = function ( checkInDate,checkOutDate,noOfPersons,totalCharges ) {
    this.bookingId ="";
    this.userId="";
    this.destId="";
    this.destinationName="";
    this.checkInDate=checkInDate;
    this.checkOutDate=checkOutDate;
    this.noOfPersons=noOfPersons;
    this.totalCharges=totalCharges;
    this.timeStamp=new Date().getTime().
        toString();

}

Booking.toObject = function ( obj ) {
    return new Booking( obj.checkInDate,obj.checkOutDate,obj.noOfPersons,obj.totalCharges );
}

module.exports = Booking;
