var userDetails = require( './users' );
var connection = require( "../connections" )

// var bookingDetails = require("./BookingDetails");

var userDAL = {}


userDAL.generateId = () => {
    return connection.getConnection().then( ( db ) => {
        var myCollection = db.collection( 'Users' );
        return myCollection.distinct( "userId" ).then( ( ids ) => {
            var lastId = ids.sort().reverse()[0]
           return 'U'+( Number( lastId.slice( 1, ) )+1 )
        } )
    } )
}



        //Verifying the contact number
userDAL.checkUser = function ( contactNo ) {
    return connection.getConnection().then( function ( database ) {
        return database.collection( 'Users' ).findOne( { "contactNo": contactNo } ).then( function ( customerContact ) {            
            if( customerContact ) 
                {
                    return userDetails.toObject( customerContact );
                }
            else return null;
        } )
    } )
}

    // To get the password
userDAL.getPassword = function ( contactNo ) {
  return connection.getConnection().then( function ( database ){
    return database.collection( 'Users' ).find( {"contactNo": contactNo } ).project( {_id: 0,password: 1} ).toArray().then( function ( password ) {
        if( password.length !=0 ) 
            return password[0].password;
        else 
            return null;
    } )
} )
}

userDAL.reteriveBookings =  userId=>{
    return connection.getConnection().then( database =>{
        return database.collection( 'Bookings' ).find( {"userId": userId} ).toArray().then(userBookings=>{
            if( userBookings != null ){
                return userBookings;
            }
            else{
                throw new Error("Some Error Occoured");
                
            }
        } )
    } )
}

// userDAL.insertBooking = function ( userId,bookingId ){
//     return connection.getConnection().then( function ( database ){
//         var coll = database.collection( 'Users' )
//         return coll.updateOne( {userId: userId},{ $push: { bookings: bookingId }} ).then( function ( response ){
//             if( response.modifiedCount>0 ){
//                 return bookingId
//             } else{
//                 return null
//             }
//         } )
//     } )
// }


userDAL.insertUser = function(object) {
    return connection.getConnection().then(function(database){
        var coll = database.collection('Users')
        return userDAL.generateId().then(function(id){
            object.userId = id
            object.contactNo = Number(object.contactNo)
            return coll.insertOne(object).then(function(response){
                if(response.insertedCount>0){
                    return object
                }else{
                    return null
                }
            })
        })
    })
}

userDAL.cancelBookingDAL =bookingId=>{
    return connection.getConnection().then(database=>{
        return database.collection("Bookings").findOne({"bookingId":bookingId}).then(mainData=>{
            if(mainData){
                return database.collection("Bookings").deleteOne({"bookingId":bookingId}).then(bookingData=>{
                    if(bookingData.deletedCount>0){
                        return database.collection("Users").updateMany({"userId":mainData.userId},{$pull:{"bookings":bookingId}}).then(response=>{
                            if(response.modifiedCount >0){
                                

                                if(mainData.destId[0]=="D"){
                                    
                                return database.collection("Destinations").updateOne({"destinationId":mainData.destId},
                                {$inc:{"availability":Number(mainData.noOfPersons)}}).then(result=>{
                                    if(result.modifiedCount > 0){
                                        
                                        return true;
                                    }else{
                                        throw new Error("Some Error Occoured");
                                    }

                                })}
                                else{
                                    
                                    return database.collection("Hotdeals").updateOne({"destinationId":mainData.destId},
                                {$inc:{"availability":Number(mainData.noOfPersons)}}).then(result=>{
                                    if(result.modifiedCount > 0){
                                        
                                        return true;
                                    }else{
                                        
                                        throw new Error("Some Error Occoured");
                                    }

                                })
                                }
                            }else{
                                throw new Error("Some Error Occoured");
                            }
                        })
                    }else{
                        throw new Error("Some Error Occoured");
                    }
                })
            }else{
            throw new Error("Some Error Occoured");
            }
    })
 }) 
}


module.exports = userDAL
