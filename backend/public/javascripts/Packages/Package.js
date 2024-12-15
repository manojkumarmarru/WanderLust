// Package bean class
const packages = function ( destinationId,continent,name,imageUrl,details,noOfNights,flightCharges,discount,chargesPerPerson,availability ){
    this.destinationId = destinationId;
    this.continent = continent;
    this.name = name;
    this.imageUrl = imageUrl;
    this.details = details;
    this.noOfNights = noOfNights;
    this.flightCharges = flightCharges;
    this.chargesPerPerson = chargesPerPerson;
    this.discount = discount;
    this.availability = availability;

}

packages.toObject = function ( result ){
    return new packages( result.destinationId,result.continent,result.name,result.imageUrl,result.details,result.noOfNights,result.flightCharges,result.chargesPerPerson,result.discount,result.availability );
}

module.exports = packages;
