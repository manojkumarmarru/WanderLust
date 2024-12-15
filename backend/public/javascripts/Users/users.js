const users = function ( userId,name,emailId,contactNo,password,bookings ){
    this.userId = userId;
    this.name = name;
    this.emailId = emailId;
    this.contactNo = contactNo;
    this.password = password;
    if(bookings !== undefined){
        this.bookings = bookings;
    }else{
        this.bookings = []
    }

}

users.toObject = function ( result ){
    return new users( result.userId,result.name,result.emailId,result.contactNo,result.password,result.bookings );
}

module.exports = users;
