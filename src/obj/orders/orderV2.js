const OrderV1= require("./orderV1")
class OrderV2 extends OrderV1{
    constructor(flower,decoration,dateOfDelivery,address) {
        super(flower,decoration,dateOfDelivery,address);
        this.priceRange=priceRange
        this.person=person
        this.event=event
    }

}
module.exports= OrderV2