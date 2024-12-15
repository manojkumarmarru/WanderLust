var bookingDAL = require('../public/javascripts/Bookings/bookingsDAL');

var userDAL = require('../public/javascripts/Users/usersDAL');
var request = require("request");

var baseUrlCancel = "http://localhost:6600/book/cancelBooking/B1001";




describe("CancelBooking Component", function() {

   

    it('Check Available seats has updated in Destination Collection',function(done){

        var resultDest;

        bookingDAL.checkAvailability('D1001').then(function(dest){

            resultDest = dest.availability;

            //console.log(resultDest);

            expect(resultDest).toBeGreaterThan(0)

            done();

        })

    })





    it('Check BookingId is updated in Users',function(done){

        var resultDest;

        userDAL.checkUser(9098765432).then(function(detail){

            

            expect(detail.bookings).not.toEqual([])

            done();

        })

    })

    
    
});

describe("cancel booking", function() {
    describe("DELETE/", function() {
      it("returns Cancelled Booking id", function(done) {
        request.get(baseUrlCancel, function(error, response, body) {
            
          expect(body).not.toEqual('{"message":"Booking not found for id B1001"}');
          done();
        });
      });
    });
  });
