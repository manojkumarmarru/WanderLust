const express = require( "express" ),
    router = express.Router(),

    user = require( "../public/javascripts/Users/users" ),
    userBL = require( "../public/javascripts/Users/usersBL" )

router.post( "/register",( req,res,next ) => {
    // Implement post method to register a new user.

    // Console.log( user.toObject( req.body ) )
    userBL.checkUserContact( user.toObject( req.body ) ).then( ( response ) => {
        res.json( response )
    } ).
        catch( ( err ) => {
            res.status( 400 ).json( {"message": err.message} )
            next( err )
        } )
    // UserBL.checkUserContact(req.body.contactNumber)
} )

// Router to login
router.post( "/login",( req,res,next ) => {
    // console.log( req.body )
    // Console.log(req.body)
    const contactNo = req.body.contactNo,
        password = req.body.password;

    userBL.login( parseInt( contactNo ),password ).then( ( userDetails ) => {
        res.json( userDetails );
    } ).
        catch( ( err ) => {
            next( err );
        } )
} )

router.get( "/getBookings/:userId",( req,res,next ) => {
    // Implement get method
    userBL.userBookings( req.params.userId ).then( ( userBookingsDetails ) => {

        res.json( userBookingsDetails );
    } ).
        catch( ( err ) => {
            res.status( 400 ).json( {"message": err.message} )
            next( err );
        } )
} )

module.exports = router;
