const fs = require( "fs" ),

    logger = function ( err,req,res,next ) {
        if( err ) {
            fs.appendFile( "ErrorLogger.txt",`${err.stack}\n`,( err ) => {
                if( err ) {
                    // console.log( "logging error failed" );
                }
            } );
            res.status( 500 );
            // console.log( err.message )
            res.json( {"message": err.message} )
        }
        next();
    }

module.exports = logger;