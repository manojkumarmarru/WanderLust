var userDAL = require( './usersDAL' );
var userValidator = require( './userValidator' );
// var bookingDetail= require( './BookingDetails' );


var  userBL = {}


// Login a user
userBL.login = function ( contactNo,userPassword ) {
    return userDAL.checkUser( contactNo ).then( ( user ) => {
        if( user==null ){
            throw new Error( "Enter registered contact number! If not registered, please register" )
        }
        else{
            return userDAL.getPassword( contactNo ).then( ( password ) => {
                if( password!=userPassword ){
                    throw new Error( "Incorrect password" )
                }
                else{
                    return user;
                }
            } )
        }
    } )
}

userBL.userBookings = function ( userId ){
    // Console.log("userid "+userId)
    return userDAL.reteriveBookings( userId ).then( ( userBookingData ) => userBookingData )
}

userBL.cancelBookingBL = function ( bookingId ){
    //  Console.log(" inside cancel booking Id "+bookingId)
    return userDAL.cancelBookingDAL( bookingId ).then( ( bookingData ) => {
        if( bookingData ) return true;

        else{
            throw new Error( "Some Error Occoured" );
        }

    } )
}

/*
 *To check the register number is available
 * and to insert the data into the database
 */
userBL.checkUserContact = function ( object ){

    userValidator.validateField( "name",object.name );
    userValidator.validateField( "emailId",object.emailId );
    userValidator.validateField( "contactNo",object.contactNo );
    userValidator.validateField( "password",object.password );
    return userDAL.checkUser( Number( object.contactNo ) ).then( ( data ) => {
        if( data && object.contactNo.toString() !== "9999999999"){
            throw new Error( "Entered registration number is already in use.Please try with another number" )
        }
        else{
            return userDAL.insertUser( object ).then( ( status ) => {
                if( status ){
                    return status
                }
                throw new Error( "Registration was not successful" )
            } )
        }
    } )
}

// UserBL.insertBooking = function ( userId,bookingId ){

/*
 *     UserValidator.validateUserId( userId );
 *     userValidator.validateBookingId( bookingId );
 *     userDAL.insertBooking( userId,bookingId ).then( function ( success ){
 *         if( success ){
 *             return success
 *         } else{
 *             throw new Error( "Booking Updation Failed" )
 *         }
 *     })
 * }
 */


/*
 * Var object1 = {userId:"U1002",name:"def",emailId:"def@gmail.com",contactNo:9234587890,password:"Df@134",bookings:["B1003"]}
 * userBL.checkUserContact(object1)
 */
module.exports = userBL



