const Validator = {}


Validator.validateField = ( fieldName,value ) => {
    let errorMessage = "";

    switch( fieldName ) {
    case"name":
        if( value ){
            const regex1 = new RegExp( /^[A-Za-z][A-Za-z\s]*[^\s]$/ )
            regex1.test( value )?errorMessage="":errorMessage = "Please enter a valid name"}
        break;

    case"emailId":
        if( value ){
            const regex2 = new RegExp( /[\w.]+@[a-z]+\.[a-z]{2,3}$/ )

            regex2.test( value )?errorMessage="":errorMessage = "Please enter a valid email"}
        break;

    case"contactNo":
        if( value ){
            const regex3 = new RegExp( /^[6-9][0-9]{9}$/ )

            regex3.test( value )?errorMessage="":errorMessage = "Please enter a valid contact number"
        }
        break;

    case"password":
        if( value ) {
            const regex4 = new RegExp( /^(?=.*[A-Z])(?=.*[!@#$&*%&])(?=.*[0-9])(?=.*[a-z]).{7,20}$/ )

            regex4.test( value )? errorMessage="" : errorMessage = "Please enter a valid password"
        }
        break;

    default:
        break;
    }

    // Throwing Error for corresponding validations
    if( errorMessage !== "" ){
        // Console.log(errorMessage)
        throw new Error( errorMessage )
    }
}

Validator.validateUserId = ( userId ) => {
    const regexUser = new RegExp( /^U[0-9]{4,}$/ )

    if( !regexUser.test( userId ) ){
        throw new Error( "Invalid Userid" )
    }
}

Validator.validateBookingId = ( bookingId ) => {
    const regexBooking = new RegExp( /^U[0-9]{4,}$/ )

    if( !regexBooking.test( bookingId ) ){
        throw new Error( "Invalid BookingId" )
    }
}

module.exports = Validator;
