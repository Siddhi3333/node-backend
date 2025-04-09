const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    FullName:{type:String,required:true},
    Email:{type:String,required:true,unique:true},
    Age:{type:Number,required:true},
    password:{type:String,required:true},
})

module.exports= mongoose.model('User',UserSchema)