var connection = require( "../connections" );
var bookingDAL = {}

//implement Dal
bookingDAL.generateBookingId = () => {
    return connection.getConnection().then( ( db ) => {
        var my_collection = db.collection( 'Bookings' );
        return my_collection.distinct( "bookingId" ).then( ( ids ) => {
            var lastId = ids.sort().reverse()[0]
           // console.log(lastId)
           return'B'+( Number( lastId.slice( 1, ) )+1 )
        } )
    } )
}
bookingDAL.checkAvailability= function ( destinationId ) {

    return connection.getConnection().then( function ( database ) {
        return database.collection( 'Destinations' ).findOne( { "destinationId": destinationId },{_id:0} ).then( function ( destinationObj ) {
            if( destinationObj ){
                destinationObj._id="null"
                return  destinationObj
            }
            else{
               return database.collection( 'Hotdeals' ).findOne( { "destinationId": destinationId } ).then((data)=>{
                if( data){
                    return  data
                }
                else{
                    return null ;
                } 
                    })
                }
        } )
    } )
 

}

bookingDAL.bookDestination= function ( destinationBooking ) {


    return connection.getConnection().then( function ( database ){

        return bookingDAL.generateBookingId().then( ( bookngId )=>{
            destinationBooking.bookingId=bookngId;
            return database.collection( 'Bookings' ).insertOne( destinationBooking ).then( function ( destinationObj ) {
                           if( destinationObj.insertedCount==1 )
                           {
                                if(destinationBooking.destId[0]==="H")
                                {
                                      if( bookingDAL.updatingInHotDeals(destinationBooking,database))
                                      {
                                        return bookingDAL.updatingUserbooking(destinationBooking,bookngId,database)
                                      }
                                }
                                else if(destinationBooking.destId[0]==="D")
                                {
                                    if( bookingDAL.upatingInDestinations(destinationBooking,database))
                                    {
                                        return bookingDAL.updatingUserbooking(destinationBooking,bookngId,database)

                                    }


                                }
                                else{
                                    return "not destinations found to update in db"
                                }
                             
                           }
                           else{
                                return bookngId;
                              }
                        })

        })


    })
        
}


    bookingDAL.updatingInHotDeals=(obj,database)=>{
        return database.collection('Hotdeals').updateOne( {destinationId: obj.destId},{$inc: { availability: -obj.noOfPersons } } ).then((res)=>{
            if(res.modifiedCount>0)
            return true;
            else
            return false
        })

    }
    bookingDAL.upatingInDestinations=(obj,database)=>{
        return database.collection('Destinations').updateOne( {destinationId: obj.destId},{$inc: { availability: -obj.noOfPersons } } ).then((res)=>{
            if(res.modifiedCount>0)
            return true;
            else
            return false;
        })

    }
    bookingDAL.updatingUserbooking=(destinationBooking,bookingId,database)=>{
    var coll = database.collection( 'Users' )
    return coll.updateOne( {userId: destinationBooking.userId},{ $push: { bookings: bookingId }} ).then((res)=>{
        if( res.modifiedCount>0 ){

            return bookingId

            }
        else{
            return "something went wrong in updating the bookingId in users db (or) bookings db" 
            }

    })
                                    }


bookingDAL.getUserDetails=function(userId)
{

    return connection.getConnection().then( function ( database ){
                return  database.collection("Users").findOne({userId:userId}).then((result)=>{
                     if(result){
                         return result
                     }
                     else
                     return null;
                 })


    })


}
bookingDAL.getBookingDetails=function(BookingIds)
{
// console.log(userIds)
    return connection.getConnection().then( function ( database ){
                return  database.collection("Bookings").find({bookingId:{$in:BookingIds}}).toArray().then((result)=>{
                     if(result){
                         //console.log(result)
                        
                         return result
                     }
                     else
                     return null;
                 })


    })


}



//console.log(bookingDAL.bookDestination({bookingId:"",userId:"U1001",destId:"HD1001",destinationName:"A Week in Greece: Athens, Mykonos & Santorini",checkInDate:"2018-12-09",checkOutDate:"2018-12-16",noOfPersons:2 ,totalCharges:5998,timeStamp:new Date().getTime().toString()}).then((d)=>{console.log( d)}))
//bookingDAL.generateBookingId();
 //console.log(bookingDAL.checkAvailability(["D1002","D1001"]).then((d)=>{console.log(d)}))
//console.log(bookingDAL.getUserBookings("U1001").then((d)=>{console.log(d)}))


//console.log(bookingDAL.getUserBookings(["B1004","B1003"]).then((d)=>{console.log(d)}))

module.exports = bookingDAL
