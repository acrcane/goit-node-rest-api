const Contacts = require("../models/contacts")

const checkOwners = async (req, res, next) => {
    const userId = req.user.id

    const allContacts = await Contacts.find({ owner: userId })
    try {
        if (allContacts.length === 0) {
            return res.status(200).json([]);
        }
        // res.status(200).json('all')
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = checkOwners