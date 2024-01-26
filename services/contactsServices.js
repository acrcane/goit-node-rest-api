const fs = require("node:fs/promises");
const path = require("node:path");
const Contact = require('../models/contact')

const contactsPath = path.join(__dirname, '..', "db", "contacts.json");

async function read() {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
}

async function write(data) {
    return await fs.writeFile(contactsPath, JSON.stringify(data));
}




async function listContacts() {
    const data = await read();

    return data;
}


async function getContactById(id) {
    const data = await read();
    const result = data.find((contact) => contact.id === id);
    
    if (!result) {
        return {
            status: 404,
            message: 'Not found'
        }
    }
    return result || null
}


async function removeContact(contactId) {
    const data = await read();
    const index = data.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
        return null;
    }

    const deletedContact = data[index]
    const newContacts = [...data.slice(0, index), ...data.slice(index + 1)];

    await write(newContacts);

    return deletedContact
}


async function addContact(payload) {
    const data = await read();
    const newContact = new Contact(payload);

    data.push(newContact);

    await write(data);

    return newContact;
}

async function updateContactById(id, updateData){
    const data = await read();
    const index = data.findIndex((contact) => contact.id === id)

    if(index === -1){
        return null
    }

    const updateCont = {...data[index], ...updateData}

    data[index] = updateCont

    await write(data)

    return updateCont
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById
};