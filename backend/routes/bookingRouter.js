const express = require( "express" ),
    router = express.Router(),
    userBL = require( "../public/javascripts/Users/usersBL" ),
    // Import neccessary modules
    booking= require( "../public/javascripts/Bookings/booking" ),
    bookingBL= require( "../public/javascripts/Bookings/bookingsBL" );

var destnobj;
router.post( "/:userId/:destinationId",( request,response,next ) => {

    /*
     *Implement post method
     *console.log(5416546)
     */
    destnobj=booking.toObject( request.body );
    destnobj.userId=request.params.userId;
    destnobj.destId=request.params.destinationId;
    // Console.log(destnobj)
    bookingBL.bookDestination( destnobj ).then( ( s ) => {
        response.send( s );
    } ).
        catch( ( err ) => {
            next( err );
        } )


} );

router.delete( "/cancelBooking/:bookingId",( request,response,next ) => {

    // Implement delete method
    // console.log( `booking id inside delete  ${request.params.bookingId}` )
    userBL.cancelBookingBL( request.params.bookingId ).then( ( userBookingsDetails ) => {
        response.json( {"Message": "Successfully Cancelled the bookings"} );
    } ).
        catch( ( err ) => {
            next( err );
        } )
} )

router.get( "/getDetails/:destinationId",( request,response,next ) => {
    // Implement get method
    var destinationId=request.params.destinationId
    bookingBL.getDestination( destinationId ).then( ( result ) => {
        response.send( result );
    } ).
        catch( ( err ) => {
            next( err );
        } )


} )

module.exports=router;
