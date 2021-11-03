const Flower = require("../obj/folwers/flower")
const Plant = require("../obj/folwers/plant")
const OrderV1 = require("../obj/orders/orderV1")

listFlowers = []
listPlants = []
listOrders = []


class Storage {
    constructor() {
    }

    getFlowers() {
        return listFlowers
    }

    getPlant() {
        return listPlants
    }

    consolePlantsList() {
        for (let i = 0; i < listPlants.length; i++) {
            let land = ": нельзя высадить на улицу "
            let blossom = ": не цветет сейчас"
            if (listPlants[i].flower.getLanding() === true) {
                land = ": можно высадить на улицу "
            }
            if (listPlants[i].flower.getBlossom() === true) {
                blossom = ": цветёт в данный момент "
            }
            console.log("№ = " + i + " : " + listPlants[i].flower.getName() + " " + listPlants[i].flower.getColor() + land + blossom + ": цена за штуку =" + listPlants[i].flower.getPrice())
        }
    }

    consoleFlowersList() {
        for (let i = 0; i < listFlowers.length; i++) {
            console.log("№ = " + i + " : " + listFlowers[i].flower.getName() + " " + listFlowers[i].flower.getColor() + " цена за штуку =" + listFlowers[i].flower.getPrice())
        }
    }

    writeOrder(index) {
        console.clear()
        console.log("закакз №" + index)
        console.log("цветы :")
        const item = listOrders[index]
        if (item.type === '1') {
            for (let i = 0; i < item.flower.length; i++) {
                console.log(listFlowers[item.flower[i].index].flower.getName() + " цвет " + listFlowers[item.flower[i].index].flower.getColor() + "   количеством = " + item.flower[i].count)
            }
            console.log("дата поставки  :  " + listOrders[index].dateOfDelivery)
            console.log("адресс  :  " + listOrders[index].address)
        }
        if (item.type === '2') {
            for (let i = 0; i < item.flower.length; i++) {
                console.log(listPlants[item.flower[i].index].flower.getName() + " цвет " + listPlants[item.flower[i].index].flower.getColor() + "   количеством =" + item.flower[i].count)
            }
            console.log("дата поставки  :  " + listOrders[index].dateOfDelivery)
            console.log("адресс  :  " + listOrders[index].address)
        }
    }

    addOrder(objOrder) {
        listOrders.push(new OrderV1(objOrder.type, objOrder.flower, objOrder.decoration, objOrder.dateOfDelivery, objOrder.address))
        return listOrders.length - 1
    }

    addNewFolver(objFolver) {
        listFlowers.push({
            flower: new Flower(objFolver.name, objFolver.color, objFolver.price, objFolver.forPerson, objFolver.forHoliday),
            count: objFolver.count,
            deliverTomorrow: 0
        })
    }
    addNewPlant(objPlant) {
        listFlowers.push({
            flower: new Plant(objPlant.name, objPlant.color, objPlant.price, objPlant.forPerson,objPlant.forHolibay, objPlant.ear, objPlant.landing,objPlant.blossom),
            count: objPlant.count,
            deliverTomorrow: 0
        })
    }



    fill() {
        listFlowers.push({
            flower: new Flower("роза", "красная", 30, ["любимый человек", "родственник", "руководитель", "колега"], ["личная встреча", "деньрождения", "праздник"]),
            count: 100,
            deliverTomorrow: 0
        })
        listFlowers.push({
            flower: new Flower("пион", "розовый", 10, ["руководитель", "колега", "любимый человек", "родственник"], ["личная встреча", "праздник", "деньрождения"]),
            count: 100,
            deliverTomorrow: 0
        })
        listFlowers.push({
            flower: new Flower("тюльпан", "желтый", 20, ["колега", "родственник", "руководитель", "любимый человек"], ["праздник", "деньрождения", "личная встреча"]),
            count: 100,
            deliverTomorrow: 0
        })

        listPlants.push({
            flower: new Plant("роза", "желтый", 200, ["любимый человек", "родственник", "руководитель", "колега"], ["личная встреча", "деньрождения", "праздник"], 3, true, true),
            count: 5,
            deliverTomorrow: 0
        })
        listPlants.push({
            flower: new Plant("роза", "желтый", 300, ["любимый человек", "родственник", "руководитель", "колега"], ["личная встреча", "деньрождения", "праздник"], 4, true, true),
            count: 3,
            deliverTomorrow: 0
        })
        listPlants.push({
            flower: new Plant("кактус", "зелёный", 100, ["колега", "родственник", "руководитель", "любимый человек"], ["праздник", "деньрождения", "личная встреча"], 4, false, false),
            count: 10,
            deliverTomorrow: 0
        })

    }
}

module.exports = Storage
