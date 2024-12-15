const fs = require( "fs" ),

    RequestLogger = function ( req,res,next ) {

        const logMessage = `${String( new Date() )} ${req.method} ${req.url}\n`;

        fs.appendFile( "RequestLogger.txt",logMessage,( err ) => {
            if( err ) return next( err );
        } );
        next();

    }

module.exports = RequestLogger;