
var request = require("request");
var userBL = require("../public/javascripts/Users/usersBL")

var userdal = require("../public/javascripts/Users/usersDAL")
const port = 6600;
const backendUrlUser = `http://localhost:${port}/user`; // /register - POST, /login - POST, /getBookings/:userId - GET


describe("GET for reterive booking", function() {
    it("For  Incorrect input", function(done) {
      request.get(backendUrlUser+"/getBookings/U002", function(error, response, body) {
        body=jsonObj=JSON.parse(body)  
        expect(body.length).toEqual(0);
        done();
      });
    });
    it("For reterive booking function in  DAl", function(done) {
      userdal.reteriveBookings("U1001").then(data=>{
        
        expect(data[0].userId).toEqual("U1001");
      })
      done();
    });
     it("For reterive booking function in  DAl", function(done) {
        userdal.reteriveBookings("U10011").then(data=>{
          
          expect(data[0].userId).toEqual("U1001");
        }).catch(err=>{
          expect(err).not.toEqual("Some Error Occoured");
        })
        done();
        });  
     

    it("For reterive booking function in BL", function(done) {
      userBL.userBookings("U1001").then(data=>{
          
          expect(data[0].userId).toEqual("U1001");
        })
        done();
        });
    
    it("For reterive password", function(done) {
      userdal.getPassword(9098765432).then(data=>{
              
              expect(data).toEqual("Abc@1234");
            })
            done();
            });
    it("For reterive password", function(done) {
      userdal.getPassword(909876543).then(data=>{
                      
          expect(data).not.toEqual("Abc@1234");
          })
          done();
      });
      it("For checkUser correct input", function(done) {
        userdal.checkUser(9098765432).then(data=>{
                        
            expect(data.contactNo).toEqual(9098765432);
            })
            done();
        });
        it("For checkUser incorrect input", function(done) {
          userdal.checkUser(909876432).then(data=>{
                          
              expect(data).toEqual(null);
              })
              done();
          });
    
  

  
    it("For Correct input", function(done) {
      request.get(backendUrlUser+"/getBookings/U1002", function(error, response, body) {
        
       expect(body.length).not.toEqual(2);
        done();
      });
    });



    it("For Correct input and getting correct output", function(done) {
      request.get(backendUrlUser+"/getBookings/U1002", function(error, response, body) {
          jsonObj=JSON.parse(body)
          useridGet =jsonObj[0].userId;
       expect(useridGet).toEqual("U1002");
        done();
      });
    });
    
  });  
    
    