const Contact = require("../Model/contactmodel")

const getAllContacts= async (req,res)=>{
   let contact= await Contact.find({user_id:req.user.id})
    res.status(200).json(contact)
}

const getOneContact=async (req,res)=>{
    let oneContact=await Contact.findById(req.params.id)
    if (!oneContact) {
        res.status(400).json({error:"No such contact"})
    }
    res.status(200).json(oneContact)
}

const addContacts=async (req,res)=>{
    let {name,contact_no,email}=req.body
    let addContact=await Contact.create({
        name:name,
        contact_no:contact_no,
        email:email
    })
    res.status(200).json(addContact)
}




const updateContact=async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission to update other user contacts");
    }
  
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
  
    res.status(200).json(updatedContact);
  
}

const deleteContact= async (req,res)=>{


const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
}


module.exports={getAllContacts,getOneContact,addContacts,updateContact,deleteContact}