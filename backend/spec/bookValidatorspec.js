var bookingDAL = require( "../public/javascripts/Bookings/bookingsDAL" );
var Request = require("request")
var prmsee=  {
  "_id":"null",
    "destinationId" : "D1001",
    "continent":"Europe",
    "imageUrl":"/assets/geece.jpg",
    "name" : "A Week in Greece: Athens, Mykonos & Santorini",
    "details" : {
        "about" : "Watch the setting sun from the hilltops of Greece’s most famous islands.Experience ancient history and open-air museums in the capital of Athens. Then, the quintessential, beautiful Greek islands you’ve been dreaming of come to life on the isles of Mykonos and Santorini.",
        "itinerary" : {
            "dayWiseDetails":{
                    "firstDay":"Travel day: Board your overnight flight to Athens.",
                    "restDaysSightSeeing":[
                                            "Santorini",
                                            "Acropolis", 
                                            "Parthenon", 
                                            "Temple of Apollo", 
                                            "Ruins of Olympia", 
                                            "Ancient Theater of Epidaurus"
                                        ],
                    "lastDay":"Departure:Transfer to the airport for your flight home."
            },
            "packageInclusions" : [ 
                "7 nights in handpicked hotels", 
                "7 breakfasts", 
                "3 dinners with beer or wine", 
                "3 guided sightseeing tours", 
                "Expert tour director & local guides", 
                "Private deluxe motor coach"
            ],
            "tourHighlights" : [ 
                "Greece",
                "Athens",
                "Mykonos",
                "Santorini",
                "Acropolis", 
                "Parthenon", 
                "Temple of Apollo", 
                "Ruins of Olympia", 
                "Ancient Theater of Epidaurus", 
                "Corinth Canal photo stop"
            ],
            "tourPace" : [ 
                "On this guided tour, you will walk for about 2 hours daily across uneven terrain, including paved roads and unpaved trails, with some hills and stairs."
            ]
        }
    },
    "noOfNights" : 7.0,
    "flightCharges":500,
    "chargesPerPerson" : 2499.0,
    "discount" : 0.0,
    "availability":30
}

const port = 6600;
//  const backendUrlUser = `http://localhost:${port}/user`; // /register - POST, /login - POST, /getBookings/:userId - GET
//  const backendUrlPackage = `http://localhost:${port}/package`; // /hotDeals -> GET, /destinations -> GET, 
  const backendUrlBooking = `http://localhost:${port}/book`; // /:userId/:destinationId -> POST, /cancelBooking/:bookingId -> DELETE, /getDetails/:destinationId - GET, 

 describe('Booking DAL functionatlities test Suite:',function(){
    it('Test Case 1:insertBooking',function(done){
        
      var booking={bookingId:"",userId:"U1001",destId:"D1002",destinationName:"A Week in Greece: Athens, Mykonos & Santorini",checkInDate:"2018-12-09",checkOutDate:"2018-12-16",noOfPersons:2 ,totalCharges:5998,timeStamp:new Date().getTime().toString()};

     bookingDAL.bookDestination(booking).then((d)=>{
      expect(d).not.toEqual("B1000")
      done();
    }
     )
    });
    
     
    
    it('Test Case 2:checkingAvailability  with wrong data',function(done){

     bookingDAL.checkAvailability("D101").then((d)=>{
       //console(d)
      expect(d).toBe(null)
      done();
    }
     )
    });
    it('Test Case 2:checkingAvailability  with correct data',function(done){

    
      bookingDAL.checkAvailability("D1001").then((d)=>{
        //console(d)
       expect(d).toEqual(prmsee)
       done();
     }
      )
     });
it("get request to bookings",function(done){
Request.get(backendUrlBooking+'/getDetails/D1001',function(err,res,data){
  
  a=JSON.parse(data)
  
  expect([a].length).toEqual(1)
  done();
})
})});

// it("post request to bookings",function(done){
    
//     obj={userId:"U1001",destId:"HD1001",checkInDate:"2018-12-09",checkOutDate:"2018-12-16",noOfPersons:2 ,totalCharges:5998}
//     Request.post(backendUrlBooking+"/U1001/HD1001",obj,function(err,res){
//      // console.log("tharun")
//       a=JSON.parse(data)
      
//       expect([a].length).toEqual(1)
//       done();
//     })
//     })
