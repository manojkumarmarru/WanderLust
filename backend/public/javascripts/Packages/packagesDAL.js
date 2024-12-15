const connection = require( "../connections" ),
    PackagesDAL = {}

exports.dec=PackagesDAL.retrieveBooking= function (){
    var dbpromise = connection.getConnection()
    return dbpromise.then( ( db ) => {
        const coll = db.collection( "Hotdeals" );

        return coll.find().toArray().
            then( ( saved ) => {
                if( !saved ){
                    throw new Error()
                }
                else{
                    return saved
                }
            } )
    } )
}

exports.abc=PackagesDAL.fetchDestinationDetails = function ( destination )
{
    const fetchArray=[]

    var conection= connection.getConnection()
    return conection.then( ( db ) => {
        var destinationColl=db.collection( "Destinations" )
       var  hotDealsColl=db.collection( "Hotdeals" )
        var fetchData= destinationColl.find( {"$or": [
            {"continent": destination},
            {"name": {"$regex": destination}},
            {"details.itinerary.tourHighlights": {"$regex": destination,
                "$options": "i"}},
            {"details.itinerary.tourHighlights": destination}
        ]} ).toArray()
        return fetchData.then( ( packagedata ) => {
            for( let i=0; i<packagedata.length; i++ ) fetchArray.push( packagedata[i] )
            var fetchData1=hotDealsColl.find( {"$or": [
                {"continent": destination},
                {"name": {"$regex": destination}},
                {"details.itinerary.tourHighlights": {"$regex": destination,
                    "$options": "i"}},
                {"details.itinerary.tourHighlights": destination}
            ]} ).toArray()
            return fetchData1.then( ( packagedata2 ) => {
                for( let i=0; i<packagedata2.length; i++ ) fetchArray.push( packagedata2[i] )
                if( fetchArray.length>0 ) return fetchArray
                return null;
            } )
        } )
    } )
}


// PackagesDAL.retrieveBooking().then((a)=>{console.log(a)})


module.exports = PackagesDAL