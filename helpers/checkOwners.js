const HttpError = require('../helpers/HttpError')
const Contacts = require('../models/contacts')

const checkOwners = async (req, res, next) => {
    try {
        const contact = await Contacts.findById(req.params.id);
        if (!contact) {
            throw HttpError(404, 'Contact not found');
        }
        if (contact.owner.toString() !== req.user.id) {
            throw HttpError(403, 'Unauthorized');
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = checkOwners