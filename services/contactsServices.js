const Contacts = require('../models/contacts');




async function listContacts() {
    return Contacts.find();
}


async function getContactById(id) {

    const result = Contacts.findById(id)
    
    if (!result) {
        return {
            status: 404,
            message: 'Not found'
        }
    }
    return result || null
}


async function removeContact(id) {

    const result = Contacts.findByIdAndDelete(id)

    if(!result){
        return {
            status: 404,
            message: 'Not found'
        }   
    }
    return result
}


async function addContact(payload, ownerId) {
    try {
        console.log(ownerId);
        const newContact = new Contacts({...payload, owner: ownerId} );
        await newContact.save()
        console.log(newContact);
        return newContact
    } catch (error) {
        console.error('Create contact error', error)
    }
}

async function updateContactById(id, updateData){

    const result = Contacts.findByIdAndUpdate(id, updateData)

    if(!result){
        return {
            status: 404,
            message: 'Not found'
        }   
    }
    return result
}

async function updateStatusContact(id, updateData){

    const result = await Contacts.findByIdAndUpdate(id, 
        { $set: { favorite: updateData.favorite } },
        { new: true }
    )
    if(!result){
        return {
            status: 404,
            message: 'Not found'
        }   
    }
    return result
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById,
    updateStatusContact
};