const express=require("express")
const { getAllContacts, getOneContact, addContacts, updateContact, deleteContact } = require("../Controller/contactController")
const contactRouter=express.Router()

contactRouter.get("/",getAllContacts)

contactRouter.get('/:id',getOneContact)

contactRouter.post("/",addContacts)

contactRouter.put("/:id",updateContact)

contactRouter.delete("/:id",deleteContact)


module.exports=contactRouter