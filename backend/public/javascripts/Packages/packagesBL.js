const packageDAL = require( "./packagesDAL" ),

    packageBL = {}

packageBL.retrieveBooking=function (){
    return packageDAL.retrieveBooking().then( ( packages ) => {
        if( packages ){
            // Console.log( packages )
            return packages
        }
    } ).
        then( ( booking ) => booking )
}


packageBL.fetchDestinationDetails=function ( keyword ){

    return packageDAL.fetchDestinationDetails( keyword ).then( ( packages1 ) => {
        if( packages1 ){
            // Console.log(packages1)

            return packages1
        }
    } ).
        then( ( booking1 ) =>
        // Console.log(booking1)
            booking1 )
}


// Implement

// PackageBL.fetchDestinationDetails( 'Uluru' ).then((ab)=>console.log(ab))




module.exports = packageBL;
