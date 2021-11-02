const Flower = require("./flower")
class Plant extends Flower {


    constructor(name,color,price,forPerson,forHoliDay,ear,landing,blossom) {
        super(name,color,price,forPerson,forHoliDay);
        this.ear=ear
        this.landing=landing
        this.blossom=blossom
    }

    getLanding(){ return  this.landing}
    getBlossom(){ return  this.blossom}

}
module.exports= Plant
