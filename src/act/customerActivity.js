const prompt = require('prompt-promise');

const personList = ["руководитель", "колега", "любимый человек", "родственник"]
const holidayList = ["личная встреча", "деньрождения", "праздник"]


exports.startOrder = startOrder

async function startOrder(store) {
    let orderIndex = false
    let fistAnswer = await prompt("вы знаете что хотите  y/n ")
    if (fistAnswer === "y") {
        orderIndex = await orderType1(store)
    } else {
        if (fistAnswer === "ADMIN") {
            await adminOpt(store)
        } else {
            if (await prompt("вы хотите чтобы мы подобрали вам букет  y/n ") === "y") {
                orderIndex = await orderType2(store)
            } else {
                console.log("вы ещё не оприделились с типом заказа. приходите ещё")
            }
        }
    }
    if (orderIndex === false) {
        console.log("неполучились сдклать заказ")
    } else {
        store.writeOrder(orderIndex)
    }
    if (await prompt("[хотите ещё сделать заказ]  y/n ") === "y") {
        console.clear()
        await startOrder(store)
    }
    await prompt.finish()

}


async function flowers(list = []) {
    let index = await prompt("какой цветок хотите заказать ? (введите № ) ")
    let count = await prompt("какое количество? ")
    list.push({
        index: index,
        count: count
    })
    if (await prompt("хотите добвить ещё цветов y/n ") === "y") {
        await flowers(list)
    }
    return list
}

async function decoration(list = []) {
    let decor = await prompt("какие улучьшениея букета хотите добавить [] ?")
    list.push(decor)
    if (await prompt("хотите добвить ещё что-то y/n ") === "y") {
        await flowers(list)
    }
    return list
}

async function fullPrise(list, arrFlower) {
    let priseRes = 0
    for (let i = 0; i < list.length; i++) {
        priseRes = priseRes + arrFlower[list[i].index].flower.getPrice() * list[i].count
    }
    return priseRes
}

async function checkCount(list, arrFlower) {
    let dateDelta = 0

    for (let i = 0; i < list.length; i++) {
        if (arrFlower[list[i].index].count <= list[i].count) {
            arrFlower[list[i].index].deliverTomorrow = arrFlower[list[i].index].deliverTomorrow + list[i].count
            dateDelta = 1
        } else {
            arrFlower[list[i].index].count = arrFlower[list[i].index].count - list[i].count
        }
    }
    return dateDelta
}

async function orderType1(objectStorage) {
    let newOrder = {
        type: "",
        flower: [],
        decoration: [],
        dateOfDelivery: "",
        address: ""
    }

    newOrder.type = await prompt("хотите закакзать цветок в букет(1) или горшке(2)?  (1/2)  ")
    if (newOrder.type === "1") {
        console.clear()
        objectStorage.consoleFlowersList()
        newOrder.flower = await flowers([])
        // newOrder.decoration = await decoration([])
        const allPrise = await fullPrise(newOrder.flower, objectStorage.getFlowers())
        console.log("цена = " + allPrise)
        newOrder.address = await prompt("укажите адрес доставки: ")
        let date = new Date()
        let delta = await checkCount(newOrder.flower, objectStorage.getFlowers())
        date.setDate(date.getDate() + delta)
        newOrder.dateOfDelivery = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
        return objectStorage.addOrder(newOrder)
    }

    if (newOrder.type === "2") {
        console.clear()
        objectStorage.consolePlantsList()
        newOrder.flower = await flowers([])
        // newOrder.decoration = await decoration([])
        const allPrise = await fullPrise(newOrder.flower, objectStorage.getPlant())
        console.log("цена = " + allPrise)
        newOrder.address = await prompt("укажите адрес доставки: ")
        let date = new Date()
        let delta = await checkCount(newOrder.flower, objectStorage.getPlant())
        date.setDate(date.getDate() + delta)
        newOrder.dateOfDelivery = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
        return objectStorage.addOrder(newOrder)
    }
}


async function orderType2(objectStorage) {
    let list
    let flowerIndex
    let newOrder = {
        type: "",
        flower: [],
        decoration: [],
        dateOfDelivery: "",
        address: ""
    }
    let newOrderType2 = {
        type: "",
        person: "",
        many: "",
        count: "",
        ok: ""
    }
    newOrderType2.type = await prompt("хотите закакзмть цветок в букет(1) или горшке(2) ?  (1/2)  ")
    newOrderType2.person = personList[(parseInt(await prompt("кому будете покупить букет (" + personList + ")   1/2/3/4  "))) - 1]
    newOrderType2.holiday = holidayList[(parseInt(await prompt("кому будете покупить букет (" + holidayList + ")  1/2/3  "))) - 1]
    newOrderType2.many = await prompt("ценовой диапозон ?")
    if (newOrderType2.type === "2") {
        list = objectStorage.getPlant()
    } else list = objectStorage.getFlowers()

    flowerIndex = await BestFlower(list, newOrderType2)
    newOrderType2.count = await countFlowers(list[flowerIndex].flower.getPrice(), newOrderType2.many)
    if ( list[flowerIndex].count < newOrderType2.count) newOrderType2.count=list[flowerIndex].count;
    if (newOrderType2.count === -1 ) {
        console.log("мы не смогли подобрать вам букет")
        return false
    }
    newOrderType2.ok = await prompt("вас устраивает заказ : " + list[flowerIndex].flower.getName() + "; цвет - " + list[flowerIndex].flower.getColor() + "; кличество цветков - " + newOrderType2.count + " ?  (y/n)  ")
    if (newOrderType2.ok === 'n') {
        return false
    }
    newOrder.address = await prompt("укажите адрес доставки: ")
    let date = new Date()
    let delta = await checkCount(newOrder.flower, objectStorage.getFlowers())
    date.setDate(date.getDate() + delta)
    newOrder.dateOfDelivery = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    newOrder.type = newOrderType2.type
    newOrder.flower = {
        index: flowerIndex,
        count: newOrderType2.count
    }
    return objectStorage.addOrder(newOrder)
}


async function countFlowers(price, many) {
    let i = 1
    while (i * price <= many) {
        i = i + 2
    }
    return i - 2
}


async function BestFlower(list = [], OrderV2) {
    let rez = []
    for (let i = 0; i < list.length; i++) {
        rez[i] = list[i].flower.getPersonId(OrderV2.person) + list[i].flower.getHolidayId(OrderV2.holiday)
    }
    return min(rez)
}


function min(arr) {
    let min = arr[0]
    let index = 0
    for (let i = 1; i < arr.length; ++i) {
        if (arr[i] < min) {
            min = arr[i];
            index = i
        }
    }
    return index
}

async function adminOpt(store) {
    let action = await prompt(`Каие опции сделать?
    1) добавить новый вид цветков
    2) изменить текущий
    3) удальть имеющийся 
    (1/2/3)   `)
    switch (action) {
        case "1":
            await addFlower(store)
            break
        case "2":
            await editFlower(store)
            break
        case "3":
            await deleteFlower(store)
            break
        default:
            console.log("неверное действие");
    }
    if (await prompt("выйти из режима администратора  y/n ") === "n") {
        console.clear()
        await adminOpt(store)
    }
    console.clear()
}

async function newListLike(list, order) {
    let rez = []
    for (let i = 0; i < order.length; i++) {
        rez.push(list[parseInt(order[i]) - 1])
    }
    return rez
}


async function addFlower(store) {
    let flower = {
        type: "",
        name: "",
        color: "",
        price: 0,
        forPerson: [],
        forHoliday: [],
        count: 0,
        landing: false,
        blossom: false
    }

    flower.type = await prompt("хотите заказать цветок в букет(1) или горшке(2) ?  (1/2)  ")
    flower.name = await prompt("название цветка  ")
    flower.color = await prompt("цвет цветка  ")
    flower.price = parseInt(await prompt("цена за штуку цветка  "))
    let personIndex = (await prompt(" 1)руководитель 2)колега 3)любимый человек 4)родственник  (введите номера через запятую  3,2,1,4 ) "))
    flower.forPerson = await newListLike(personList, personIndex.split(","))
    let HolidayIndex = await prompt(" 1)личная встреча 2)деньрождения 3)праздник  (введите номера через запятую  3,2,1 ) ")
    flower.forHoliday = await newListLike(holidayList, HolidayIndex.split(","))
    flower.count = parseInt(await prompt("количество цветв в партии  "))
    if (flower.type === "2") {
        flower.price = parseInt(await prompt("введите возрост цветка"))
        if (await prompt("возможноли высодить цветок y/n") === "y") flower.landing = true
        if (await prompt("цветёт-ли цветок сейчас y/n") === "y") flower.blossom = true
        store.addNewPlant(flower)
    } else {
        store.addNewFolver(flower)
    }
}


async function editFlower(store) {
    let list
    let type = await prompt("хотите измениеть цветок для букетов(1) или горшке(2) ?  (1/2)  ")
    if (type === "2") {
        store.consolePlantsList();
        list = store.getPlant()
    }
    if (type === "1") {
        store.consoleFlowersList();
        list = store.getFlowers()
    }
    let index = parseInt(await prompt("введите номер  "))
    console.log("колчество = " + list[index].count)
    let param = await prompt("хотите поменять цену (1) или количество (2) (другое - ничего не менять) ")
    if (param === "1") list[index].flower.setPrice(parseInt(await prompt("цена за штуку цветка  ")))
    if (param === "2") list[index].count = list[index].count + (parseInt(await prompt("новое количество товара  ")))
    console.clear()
    if (type === "2") {
        store.consolePlantsList()
    }
    if (type === "1") {
        store.consoleFlowersList()
    }
}

async function deleteFlower(store) {
    let list
    let type = await prompt("хотите измениеть цветок для букетов(1) или горшке(2) ?  (1/2)  ")
    if (type === "2") {
        store.consolePlantsList();
        list = store.getPlant()
    }
    if (type === "1") {
        store.consoleFlowersList();
        list = store.getFlowers()
    }
    let index = parseInt(await prompt("введите номер  "))
    list.splice(index, 1)
    console.clear()
    if (type === "2") {
        store.consolePlantsList()
    }
    if (type === "1") {
        store.consoleFlowersList()
    }
}
