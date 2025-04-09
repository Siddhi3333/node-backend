const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const User = require('./models/User')


const server =express()
server.use(cors())
server.use(bodyParser.json())

// database connection
mongoose.connect('mongodb+srv://siddhi:Siddhi%40384@cluster0.jwuh75l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>
console.log('database connected'))
.catch((err)=>
console.log(err))

// create route for the data

server.post('/register',async(req,res)=>{
    try{
        const UserExist=User.findOne({Email})
        if(UserExist){
            return res.json({
                status:false,
                message:'user already exist..!'
            })
        }
        const {FullName,Email,Age,password}=req.body 
        const userObj=new User({FullName,Email,Age,password})
        await userObj.save()
        res.json({
             res:true,
             message:'user added '
        })
    }
    catch(err){
        res.json({
             status:false,
             message:`error:${err}`})
    }
})

//for login validation of user

server.post('/login',async(req,res)=>{
    try{

        const {Email,password}=req.body 
        
        const UserExist= await User.findOne({Email})
        if(!UserExist){
            return res.json({
                status:false,
                message:'user does not exist..!'
            })
        }
        if(password!==UserExist.password){
            return res.json({
                status:false,
                message:'wrong password.!'
            })
        }
        
        res.json({
             res:true,
             message:'login successfull..! '
        })
    }
    catch(err){
        res.json({
             status:false,
             message:`error:${err}`})
    }
})



server.listen(8055,()=>{
    console.log('server listening on port 8055')
})
