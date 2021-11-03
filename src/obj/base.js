class Base {
    #id = makeId()
    constructor() {
    }
    get id() {
        return this.#id;
    }
}

module.exports = Base

 function makeId() {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < 14; i++) {
        if (i===4||i===9)
            result +="-"
        else
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
