const bookingDAL = require( "./bookingsDAL" ),
    bookValidator = require( "./bookValidator" ),


    bookingBL = {}

// Implement your buisness logic
bookingBL.bookDestination=function ( destinationBooking ){
    bookValidator.validateNoofPersons( destinationBooking.noOfPersons );
    bookValidator.validateStartDate( destinationBooking.checkInDate );
   return bookingBL.checkPreviousBookings(destinationBooking.userId,destinationBooking.checkInDate,destinationBooking.checkOutDate).then((boolean)=>{
     if(boolean){
    return bookingDAL.checkAvailability( destinationBooking.destId ).then( ( destinationObj ) => {

        if( destinationObj == null ) {
            // Console.log("destinationObj");
            throw new Error( "Requested destination package is not available" );
        }
        else if( destinationObj.availability < destinationBooking.noOfPersons ) {
            if( destinationObj.availability>0 ){
                throw new Error( " Sorry"+ destinationObj.availability + "only seats unavailable" );
            } else{
                throw new Error( " Sorry no seats are unavailable" );
            }
        }
        else{
            // Console.log(destinationObj)
            destinationBooking.destinationName=destinationObj.name;

           var promise = bookingDAL.bookDestination( destinationBooking );
            return promise;
        }
    } ).
        then( ( bookingId ) => bookingId )
    } 
  else{
      throw new Error("Sorry !! A user can Book only once in a period")
  }})
}

bookingBL.getDestination=function ( destinationId ){
    return bookingDAL.checkAvailability( destinationId ).then( ( result ) => {

        if( result == null ) {
            // Console.log("destinationObj");
            throw new Error( "Requested package is not available" );
        }
        else{
            return result;
        }
    } )

}

bookingBL.checkPreviousBookings=function(userId,checkInDate,checkOutDate){
    var userDetails=bookingDAL.getUserDetails(userId)
              return userDetails.then((userdetails)=>{
                    bookingsArray=userdetails.bookings
                   return bookingDAL.getBookingDetails(bookingsArray).then((BookingDetails)=>{
                       
                    checkInDate = new Date(checkInDate);
                    checkOutDate = new Date(checkOutDate);
                    var flag = 0;
                    for(let i=0;i<BookingDetails.length;i++){
                        const bDate = new Date(BookingDetails[i].checkOutDate);
                        const dDate = new Date(BookingDetails[i].checkInDate);
                        if(checkInDate>bDate ||  dDate>checkOutDate){
    
                        }else{
                            flag = 1;
                            break;
                        }
                    }                   
                     if(flag===1){
                         return false
                     }          
                     else
                     return true    
                    })

               })

}





/*
 * BookingBL.bookDestination({bookingId:"yyr",userId:"U10fghtgjtfr01",destId:"D1001",destinationName:"A Week in Greece: Athens, Mykonos & Santorini",checkInDate:"2019-01-15",checkOutDate:"2018-12-16",noOfPersons:2 ,totalCharges:5998,timeStamp:new Date().getTime().toString()},
 * ).then((d)=>{console.log(d)})
 */
//bookingBL.checkPreviousBookings("U1001","2019-02-15","2019-02-02").then((d)=>{console.log(d)})
module.exports = bookingBL