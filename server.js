const express=require('express')
const { default: mongoose } = require('mongoose');
const contactRouter = require('./Router/contactRouter');
const userRoute = require('./Router/userRoute');
const app=express()


async function db(){
    await mongoose.connect("mongodb://127.0.0.1:27017/MyContacts") 
    console.log("db connected");
}db()


app.get('/',(req,res)=>{
     res.send("This is my project>>>>")
})

app.use(express.json())
app.use('/contact',contactRouter)
app.use('/user',userRoute)

app.listen(5000,()=>{
    console.log("server running on port 5000");
})