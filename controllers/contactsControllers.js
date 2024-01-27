const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById
} = require("../services/contactsServices")

const getAllContacts = async (req, res) => {
    const allContacts = await listContacts()
    res.status(200).json(allContacts)
};

const getOneContact = async (req, res) => {
    const id = req.params.id
    const findById = await getContactById(id)

    if(!findById || findById.status === 404){
        return res.status(404).json({message: 'Not found'})
    }

    res.status(200).json(findById)    
};

const deleteContact = async (req, res) => {
    const contactId = req.params.id
    const deleteContactById = await removeContact(contactId)

    if(!deleteContactById){
        return res.status(404).json({message: 'Not found'})
    }

    res.status(200).json(deleteContactById)
};

const createContact = async (req, res) => {
    try{
        const createdContact = await addContact(req.body);
        res.status(201).json(createdContact)

        if(!createdContact){
            res.status(400).json({ message: error.message });
        }
    
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateContactController = async (req, res) => {
        const id = req.params.id
        const updateData = req.body
        const updatedContact = await updateContactById(id, updateData);
        
        if (!updatedContact) {
            return res.status(404).json({ message: 'Not found' });
        }

        res.status(201).json(updatedContact)
};

module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContactController
}
