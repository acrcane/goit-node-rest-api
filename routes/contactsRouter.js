const express = require("express");
const {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContactController,
    updateStatusController,
} = require("../controllers/contactsControllers");
const validateBody = require("../helpers/validateBody");
const {
    createContactSchema,
    updateContactSchema,
} = require("../schemas/contactsSchemas");
const isValidId = require('../helpers/isValidId')
const isValidToken = require('../helpers/isValidToken')
// const checkOwners = require('../helpers/checkOwners')
const errorWrapper = require("../utils/errorWrapper");

const contactsRouter = express.Router();

contactsRouter.get("/", isValidToken,errorWrapper(getAllContacts));

contactsRouter.get("/:id",isValidToken, isValidId, errorWrapper(getOneContact));

contactsRouter.delete("/:id", isValidToken, isValidId, errorWrapper(deleteContact));

contactsRouter.post(
    "/",
    isValidToken, 
    validateBody(createContactSchema),
    errorWrapper(createContact),
);

contactsRouter.put(
    "/:id",isValidToken, isValidId,
    validateBody(updateContactSchema),
    errorWrapper(updateContactController)
);

contactsRouter.patch("/:id/favorite", updateStatusController);

module.exports = contactsRouter;
