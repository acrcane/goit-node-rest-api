const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById,
    updateStatusContact
} = require("../services/contactsServices")



const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user
    const allContacts = await listContacts(owner)
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
        const owner = req.user._id
        const createdContact = await addContact({...req.body}, owner);
        console.log(owner);
        if (!createdContact) {
            return res.status(400).json({ message: 'Not created' });
        }
        res.status(201).json(createdContact)
    
    } catch (error) {
        res.status(400).json({ message: 'Not created' });
        console.error(error)
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

const updateStatusController = async (req, res) => {
    const id = req.params.id

    const updatedContact = await updateStatusContact(id, req.body);
    
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
    updateContactController,
    updateStatusController
}
