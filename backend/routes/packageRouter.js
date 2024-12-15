const express = require( "express" ),
    router = express.Router(),
    packageBL = require( "../public/javascripts/Packages/packagesBL" )

router.get( "/hotDeals",( request,response,next ) => {
    // Implement get method to get all the hot deals
    packageBL.retrieveBooking().then( ( data ) => {
        response.json( data )
    } ).
        catch( ( err ) => {
            next( err );
        } )


} );


router.get( "/destinations/:keyword",( request,response,next ) => {
    // Implement get method to get all the packages based on the keyword
    packageBL.fetchDestinationDetails( request.params.keyword ).then( ( data ) => {
        response.json( data )

    } ).
        catch( ( err ) => {
            next( err );
        } )
} );

module.exports = router


