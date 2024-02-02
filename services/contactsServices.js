const Contact = require('../models/contacts');




async function listContacts() {
    return Contact.find();
}


async function getContactById(id) {
    
    try {
        const result = await Contact.findById(id)
        if (!result) {
            return {
                status: 404,
                message: 'Not found'
            }
        }
        return result 
    } catch (error) {
        console.error(error);
    }
}


async function removeContact(id) {

    const result = Contact.findByIdAndDelete(id)

    if(!result){
        return {
            status: 404,
            message: 'Not found'
        }   
    }
    return result
}


async function addContact(payload) {
    try {
        const newContact = new Contact(payload);
        await newContact.save()
        return newContact
    } catch (error) {
        console.error('Create contact error', error)
    }
}

async function updateContactById(id, updateData){

    try {
        const result = await Contact.findByIdAndUpdate(id, updateData)

        if(!result){
            return {
                status: 404,
                message: 'Not found'
            }   
        }
        return result
    } catch (error) {
        console.error(error);
    }
}

async function updateStatusContact(id, updateData){

    try {
        const result = await Contact.findByIdAndUpdate(id,    
            { $set: { favorite: updateData.favorite } },
            { new: true })
         
        if(!result){
            return {
                status: 404,
                message: 'Not found'
            }   
        }
        return result
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById,
    updateStatusContact
};