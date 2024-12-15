var PackagesDAL = require ('../public/javascripts/Packages/packagesDAL' );
var request = require( "request" );
var destinationUrl = "http://localhost:6600/package/destinations/Asia";
var destinationFailUrl = "http://localhost:6600/package/destinations/kerala";

describe ( ' hotDeals return array of 3 hotdeals available ', function () {
    it ( 'Test Case1' , function (done) {
        PackagesDAL.retrieveBooking().then( ( success ) => {
            expect ( success.length ).toEqual (3);
            done ();
        } )
    } )
} )

describe ( ' hotDeals return array ', function () {
    it ( 'Test Case2' , function (done) {
        PackagesDAL.fetchDestinationDetails( 'Europe' ).then( ( success ) => {
            expect ( success.length ).toEqual ( 6 );
            done ();
        } )
    } )
} )

describe ( ' hotDeals return array ', function () {
    it ( 'Test Case3' , function (done) {
        PackagesDAL.fetchDestinationDetails('Kanpur').then( ( success ) => {
            expect ( success ).toEqual ( null );
            done ();
        } )
    } )
} )

describe( "Destination search using url", function () {
    describe( "GET /", function () {
      it( "Egypt is present in packages", function ( done ) {
        request.get( destinationUrl, function ( error, response, body ) {
          
            expect( body.length ).not.toEqual( 6 );
          done();
        } );
      } );
    } );
  } );

  describe( "Destination not present ", function () {
    describe( "GET /", function () {
      it( "Kerala is not present in packages", function ( done ) {
        request.get( destinationFailUrl, function ( error, response, body ) {
          console.log(body)
            expect( body ).toEqual( '' );
          done();
        } );
      } );
    } );
  } );