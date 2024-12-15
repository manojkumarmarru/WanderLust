const bookValidator = {}


bookValidator.validateNoofPersons = function ( noOfPersons ){
    // Console.log(noOfPersons)
    if( !( noOfPersons>=1&&noOfPersons<=5 ) ){
        throw new Error( "Error in noOfPersons" );
    }
}

bookValidator.validateStartDate=function ( startDate ){
    const today = new Date(),
        bdate = new Date( startDate );

    if( bdate<today ){
        throw new Error( "Error in startDate" );

    }
}

module.exports = bookValidator;