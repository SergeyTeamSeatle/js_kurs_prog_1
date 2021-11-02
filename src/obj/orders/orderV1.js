const Base = require("../base")
class OrderV1 extends Base{

    constructor(type,flower,decoration,dateOfDelivery,address) {
        super()
        this.type=type
        this.flower=flower
        this.decoration=decoration
        this.dateOfDelivery=dateOfDelivery
        this.address=address

    }

    getType(){
        return
    }




}
module.exports= OrderV1