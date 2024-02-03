const express = require("express")
const validateBody = require("../helpers/validateBody")
const validId = require('../helpers/isValidId')
const {createContactSchema, updateContactSchema, updateStatusSchema} = require("../schemas/contactsSchemas")
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContactController,
  updateStatusController
} = require("../controllers/contactsControllers")


const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", validId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validId, validateBody(updateContactSchema) ,updateContactController);

contactsRouter.patch("/:id/favorite", validId, validateBody(updateStatusSchema), updateStatusController)


module.exports = contactsRouter