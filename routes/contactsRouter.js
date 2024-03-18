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
const errorWrapper = require("../utils/errorWrapper");

const contactsRouter = express.Router();

contactsRouter.get("/", errorWrapper(getAllContacts));

contactsRouter.get("/:id", errorWrapper(getOneContact));

contactsRouter.delete("/:id", errorWrapper(deleteContact));

contactsRouter.post(
    "/",
    validateBody(createContactSchema),
    errorWrapper(createContact)
);

contactsRouter.put(
    "/:id",
    validateBody(updateContactSchema),
    errorWrapper(updateContactController)
);

contactsRouter.patch("/:id/favorite", updateStatusController);

module.exports = contactsRouter;
