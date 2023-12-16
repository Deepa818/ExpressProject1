const {Schema,model}=require('mongoose')

let contactSchema=new Schema({
    name:{
        type:"String",
    }
    ,
    contact_no:{
        type:Number
    }
    ,
    email:{
        type:String
    }
},
{
    timestamps:true
})

const Contact=model('contact',contactSchema)

module.exports=Contact