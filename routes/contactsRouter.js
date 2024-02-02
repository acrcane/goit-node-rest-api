const express = require("express")
const validateBody = require("../helpers/validateBody")
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContactController,
  updateStatusController
} = require("../controllers/contactsControllers")
// const validateBody = require("../helpers/validateBody")
const {createContactSchema, updateContactSchema, updateStatusSchema} = require("../schemas/contactsSchemas")


const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id",validateBody(updateContactSchema) ,updateContactController);

contactsRouter.patch("/:id/favorite", validateBody(updateStatusSchema), updateStatusController)


module.exports = contactsRouter