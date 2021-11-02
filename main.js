const Storage = require("./src/act/storage")
const Orders = require("./src/act/customerActivity")
const prompt = require('prompt-promise');


(async () => {
    let store = await new Storage ()
    store.fill()
    await Orders.startOrder(store)
    console.log("End")
})();
