const {Schema, model}=require("mongoose")

let userSchema=new Schema({
    name:{
        type:String,
        required:[true,"name field should be mandatory"]
    },
    email:{
        type:String,
        required:[true,"email fields should be mandatory"],
        unique:[true,"email has registered"]
    },
    password:{
        type:String,
        required:[true,"password should be mandatory"],
        unique:[true,"password should be unique"]
    }
},
{
    timestamps:true
})

const User=model("user",userSchema)

module.exports=User