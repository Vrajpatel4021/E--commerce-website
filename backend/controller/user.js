const express = require("express")
const path = require('path')
const User = require('../model/user')
const router = express.Router()
const bcrypt = require('bcrypt')
const fs =  require('fs')
const multer =require('multer')
const catchAsyncErrors = require("../middleware/catchAsyncErrors")



const {upload} = require('../multer')
const ErrorHandler=require('../utils/errorhandler')

router.post("/create-user",upload.single('file'),catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const userEmail = await User.findOne({email});


    if(userEmail){
        const filepath = path.join(__dirname,'../uploads',req.file.filename)

        try{
            fs.unlinkSync(filepath)

        }catch(err){
            console.log("Error removing file: ",err)
            return  res.status(500).json({message:"Error removing file"})
        }

        return next(new ErrorHandler("User Already Exists: ",400))
    } 
    
    
    let fileUrl="";
    if(req.file){
        fileUrl=path.join("uploads",req.file.filename)
    }

    const hashedPassword = await bcrypt.hash(password,10)
    console.log("At create","PassWord:",password,"Hash:",hashedPassword)

   

    const user=await User.create({
        name:name,
        email:email,
        password : hashedPassword,
        avatar: {
            public_id:req.file?.filename||"",
            url:fileUrl,

        }
    });

    console.log(user)
    res.status(201).json({message:"User Created Successfully",success:true,user})
}));


module.exports=router;