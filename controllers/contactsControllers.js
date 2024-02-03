const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById,
    updateStatusContact
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
    const contactId = req.params.id;
    const deleteContactResult = await removeContact(contactId);

    if (deleteContactResult.status === 404) {
        return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(deleteContactResult);
}

const createContact = async (req, res) => {
    try{
        const createdContact = await addContact(req.body);
        
        if(!createdContact){
            res.status(400).json({ message: error.message });
        }

        res.status(201).json(createdContact)
    
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error(error)
    }
};

const updateContactController = async (req, res) => {
        try {
            const id = req.params.id
            const updateData = req.body
            const updatedContact = await updateContactById(id, updateData);
        
        if (updatedContact.status === 404) {
            return res.status(404).json({ message: 'Not found' });
        }

        res.status(200).json(updatedContact)
        } catch (error) {
            console.error(error);
        }
};

const updateStatusController = async (req, res) => {
   try {
    const id = req.params.id

    const updatedStatus = await updateStatusContact(id, req.body);
    
    if (updatedStatus.status === 404) {
        return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(updatedStatus)
   } catch (error) {
    console.error(error);
   }
};

module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContactController,
    updateStatusController
}
