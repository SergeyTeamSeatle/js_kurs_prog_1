const Base = require("../base")

class Flower extends Base {
    constructor(name, color, price, forPerson, forHoliday) {
        super();
        this.name = name
        this.color = color
        this.price = price
        this.forPerson = forPerson
        this.forHoliday = forHoliday

    }

    getColor(){
        return  this.color
    }
    getName(){
        return  this.name
    }

    getPrice(){
        return  this.price
    }
    getPersonId(name) {
        for (let i = 0; i < this.forPerson.length; i++) {
            if (this.forPerson[i] === name) {
                return i
            }
        }
    }

    getHolidayId(name) {
        for (let i = 0; i < this.forHoliday.length; i++) {
            if (this.forHoliday[i] === name) {
                return i
            }
        }
    }

}


module.exports = Flower