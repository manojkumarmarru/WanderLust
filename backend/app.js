const bodyParser = require( "body-parser" ),
    bookingRouter = require( "./routes/bookingRouter" ),
    cors = require( "cors" ),
    express = require( "express" ),
    myErrorLogger = require( "./public/javascripts/ErrorLogger" ),
    myRequestLogger = require( "./public/javascripts/RequestLogger" ),
    packageRouter = require( "./routes/packageRouter" ),
    userRouter = require( "./routes/userRouter" ),
    app = express();
app.use( cors() );
app.use( bodyParser.json() );
app.use( myRequestLogger );
app.use( "/user",userRouter );
app.use( "/package",packageRouter );
app.use( "/book",bookingRouter )
app.use( myErrorLogger );
app.listen( 6600 );
console.log( "Server listening in port 6600" );
module.exports = app;
