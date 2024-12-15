var UserDAL = require ('../public/javascripts/Users/usersDAL' );
var UserBL = require ('../public/javascripts/Users/usersBL' );




describe ( ' invalid contact number ', function () {
    it ( 'Test Case1' , function (done) {
        UserDAL.checkUser(1234567).then( ( success ) => {
            
            expect ( success ).toBeNull();
            done ();
        } )
    } )
    it ( 'Test Case2' , function (done) {
        UserDAL.checkUser(1234567890).then( ( success ) => {
            
            expect ( success ).not.toBeNull();
            done ();
        } )
    } )
    it ( 'Test Case3 getting password' , function (done) {
        UserDAL.getPassword(1234567890).then( ( success ) => {
          
            expect ( success ).not.toBeNull();
            done ();
        } )
    } )
    // it ( 'Test Case4 Incorrect password' , function (done) {
    //     UserBL.login(1234567890,"HDHGGGRFH").catch( ( success ) => {
    //         console.log(success)
    //         expect(success.message).toMatch('Incorrect password');
    //         // expect ( success ).toThrow(new Error("Incorrect password"));
    //         done ();
    //     } )
    // })
    it ( 'Test Case5 Correct password' , function (done) {
        UserBL.login(1234567890,"Def@1234").then( ( success ) => {
            
            expect ( success ).not.toBeNull();
            done ();
        } )
    } )
} )