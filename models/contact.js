const { v4: uuidv4 } = require('uuid');

class Contact {
    constructor(payload){
        this.id = uuidv4()
        this.name = payload.name
        this.email = payload.email
        this.phone = payload.phone
    }
}

module.exports = Contact