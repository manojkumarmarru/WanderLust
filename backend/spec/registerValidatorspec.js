const port = 6600;
const backendUrlUser = `http://localhost:${port}/user`; // /register - POST, /login - POST, /getBookings/:userId - GET
const backendUrlPackage = `http://localhost:${port}/package`; // /hotDeals -> GET, /destinations -> GET, 
const backendUrlBooking = `http://localhost:${port}/book`; // /:userId/:destinationId -> POST, /cancelBooking/:bookingId -> DELETE, /getDetails/:destinationId - GET,

var userDAL = require('../public/javascripts/Users/usersDAL');
var userBL = require('../public/javascripts/Users/usersBL');
var Validator = require('../public/javascripts/Users/userValidator');


describe ( ' Checking user contact details', function () {

    it ('Insert User test case1' , function(done){
        var obj = {name:"abc",emailId:"abc@gmail.com",contactNo:90558765432,password:"Abc@1234",bookings:["B1001","B1002"]}        
        userDAL.insertUser(obj).then(response => {
            // console.log(obj)
            expect(response.contactNo).toEqual( obj.contactNo )
            done();
        } )
        })
  
    it('Check User test case(negative)' , function(done){
        var contactNo = 7894561230;
        userDAL.checkUser(contactNo).then(response=>{
            expect(response).toEqual( null )
            done();
        })
    })    

    it('Check User test case(positive)' , function(done){
        var contactNo = 9098765432;
        userDAL.checkUser(contactNo).then(response=>{
            // console.log(response)
            expect(response.contactNo).toEqual( contactNo )
            done();
        })
    })

    it('Validation  of userBL(checkUsercontact function +ve) ' , function(done){
        var userObj = {name:"abhjscbdh", emailId:"abc@gmail.com",contactNo : "9999999999", password:"Abc@1234",bookings:["B1001","B1002"]}
        userBL.checkUserContact(userObj).then(response=>{
            response._id = null
            expect(response.contactNo).toEqual(userObj.contactNo)
            done();
        }).catch(()=>{
            var error;
            expect(error).toEqual(null)
            done();
        })
    })    

    it('Validation  of userBL(checkUsercontact function -ve) ' , function(done){
        var userObj = {name:"abhjscbdh", emailId:"abc@gmail.com",contactNo : "9098765432", password:"Abc@1234",bookings:[]}
        userBL.checkUserContact(userObj).then(response=>{
            response._id = null
            expect(response.contactNo).toEqual(userObj.contactNo)
            done();
        }).catch(()=>{
            var error;
            expect(error).toEqual(null)
            done();
        })
    })  

    it("Generation of userId", function( done ){
        userDAL.generateId().then(response=>{
            expect(response).not.toEqual("");
            done();
        })
    })


    it( "Test Case 1: Inputs are Valid", ()=>{
        expect( Validator.validateField( "name","Praveen Kumar" ) ).toBeUndefined ();
        } );
        
        it( "Test case 2: Inputs are Invalid", ()=>{
        expect( function () { Validator.validateField( "name","Praveen@34" ) } ).toThrow( new Error ( ( "Please enter a valid name") )) ;
        } );
        } );
        describe( "Email validation suite:", ()=>{
        it( "Test Case 1: Inputs are Valid",()=>{
        expect( Validator.validateField( "emailId","prasanna@gmail.com" ) ).toBeUndefined ();
        } );
        
        it( "Test case 2: Inputs are Invalid", ()=>{
        expect( function (){ Validator.validateField( "emailId","prasanna967@gmail.comr" )} ).toThrow( new Error ( ( "Please enter a valid email" ) ) );
        } );
        } );
        describe( "ContactNo validation suite:", ()=>{
        it( "Test Case 1: Inputs are Valid", ()=>{
        expect( Validator.validateField( "contactNo","8184835532" ) ).toBeUndefined ();
        } );
        
        it( "Test case 2: Inputs are Invalid", ()=>{
        expect( function (){ Validator.validateField( "contactNo","123456789000" )} ).toThrow( new Error ( ( "Please enter a valid contact number" ) ) );
        } );
        } );
        describe( "Password validation suite:", ()=>{
        it( "Test Case 1: Inputs are Valid", ()=>{
        expect( Validator.validateField( "password","Re@ct16" ) ).toBeUndefined ();
        } );
        
        it( "Test case 2: Inputs are Invalid",()=>{
        expect( function (){ Validator.validateField( "password","123456789000" ) } ).toThrow( new Error ( ( "Please enter a valid password" ) ) );
        } );

} )