const express= require('express')
const mongoose = require('mongoose')
const User = require("../model/User");
const Product = require('../model/product')
const router=express.Router()
const {pupload}=require('../multer');
// const { default: Product } = require('../../frontend/src/components/Product');

const validateProductData=(data)=>{
    const errors=[];
    console.log("data: ",data);
    if(!data.name)errors.push('Product Name is required')
    if(!data.description)errors.push('Product Description is required')
    if(!data.price || data.price<0 || isNaN(data.price))errors.push('Product price is required')
    if(!data.stock || data.stock<0 || isNaN(data.stock))errors.push('Product stock is required')
    if(!data.category)errors.push('Product Category is required')
    if(!data.email)errors.push('Product Email is required')

        return errors;
}
router.post('/product', pupload.array('images',10), async(req, res)=>{
    // const{name, description,category,tags,price,stock,email}=req.bod;
    const images = req.files.map((file)=>file.path);
    console.log(req.body);
    console.log(req.files);
    const validationErrors=validateProductData(req.body)
    if(validationErrors.length>0){
        return res.status(400).json({errors:validationErrors})
    }
    if(!req.files || req.files.length===0){
        return res.status(400).json({error:'At least one image is needed'})
    }
    try{
        const {name,description,category,tags,price,stock, email
        }=req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: "email doesnot exists"})
        }
        const newProduct = new Product({
            name,
            description,
            category,
            tags,
            price,
            stock,
            email,
            images,
        })
        await newProduct.save()
        res.status(201).json({
            message:'product create successfully',
            product: newProduct,
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            error:'Server error, could not create a product for you'
        })
    }
})
module.exports=router;