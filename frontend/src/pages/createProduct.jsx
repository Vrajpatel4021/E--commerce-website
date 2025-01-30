import React,{useState, useEffect} from "react";
import {AiOutlinePlusCircle} from  'react-icons/ai'
import axios from "axios";
// import { options } from "../../../backend/controller/user";

const CreateProduct=()=>{
const[images,setImages]=useState([])
const[name,setName]=useState("")
const[description,setDescription]=useState("")
const[category,setCategory]=useState("")
const[tags,setTags]=useState("")
const[price,setPrice]=useState(0)
const[stock,setStock]=useState(0)
const[email,setEmail]=useState("")
const[previewImages,setPreviewImages]=useState([]);

const categoriesData=[
    {title: "Fashion"},
    {title: "Electronics"},
    {title: "Books"},
    {title: "Home Appliances"},
]

const handleImageChange=(e)=>{
    const files=Array.from(e.target.files)
    setImages((prevImages)=>prevImages.concat(files))
const imagePreviews=files.map((file)=>URL.createObjectURL(file))
setPreviewImages((prevPreviews)=>prevPreviews.concat(imagePreviews))
}
useEffect(()=>{
    return()=>{
        previewImages.forEach((url)=>URL.revokeObjectURL(url))
    }
},[previewImages]) // to avoid memory leakage
const handleSubmit= async (e)=>{
    
    e.preventDefault();
   console.log('Hello')
   const formData=new FormData();
   formData.append('name',name)
   formData.append('description',description)
   formData.append('category',category)
   formData.append('tags',tags)
   formData.append('price',price)
   formData.append('stock',stock)
   formData.append('email',email)
   images.forEach((image) => {
    formData.append("images", image);
    console.log(images);
});

// Log formData for debugging
for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
}
   try{
    const response = await axios.post("http://localhost:8000/api/v2/product/product", formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
    if(response.status===201){
        alert("Product created Successfully");
        setImages([]);
        setName("")
        setDescription("")
        setCategory("")
        setTags("")
        setPrice("")
        setStock("")
        setEmail("")
    }
   } catch (err){
    console.log("error Creating Product",err)
    alert("Failed to create product, check again")
   }
}
return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
        <div className="w-[90%] max-w-[500px] bg-white shadow-md h-auto rounded-md p-6 mx-auto mt-8 sm:mt-16 lg:mt-24">
            <h5 className="text-[24px] font-bold text-center mb-4 text-gray-700">Create Product</h5>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label htmlFor="" className="pb-1 block text-gray-500">Email <span className="text-red-500"></span>

                    </label>
                    <input type="email" name='email' value={email} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200" onChange={(e)=>setEmail(e.target.value)} placeholder="enter Email..." required />
                </div>
                <div className="mt-4">
                    <label htmlFor="" className="pb-1 block text-gray-500">Produt Name<span className="text-red-500"></span>

                    </label>
                    <input type="text"  value={name} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200" onChange={(e)=>setName(e.target.value)} placeholder="Enter Product Name..." required />
                </div>
                <div className="mt-4">
                <label htmlFor="" className="pb-1 block text-gray-500">Description <span className="text-red-500"></span>

                 </label>
                 <textarea value={description} className="w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg transition-shadow duration-200 " onChange={(e)=>setDescription(e.target.value)} placeholder="Provide the product description" rows='3' cols='40'></textarea>
                </div>
                <div className="mt-4">
                <label htmlFor="" className="pb-1 block text-gray-500">Category <span className="text-red-500"></span>

                 </label>
                 <select className="w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg transition-shadow duration-200 "  value={category} onChange={(e)=>setCategory(e.target.value)} required>
                    <option value="">Choose a Category</option>
                    {categoriesData.map((i)=>(
                        <option value={i.title} key ={i.title}>
                            {i.title}
                        </option>
                    ))}
                 </select>
                 </div>
                 <div className="mt-4">
                    <label htmlFor="" className="pb-1 block text-gray-500">Tags 

                    </label>
                    <input type="text" value={tags} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200" onChange={(e)=>setTags(e.target.value)} placeholder="Enter the Tags" required />
                </div>
                <div className="mt-4">
                    <label htmlFor="" className="pb-1 block text-gray-500">Price <span className="text-red-500"></span>

                    </label>
                    <input type="Number"  value={price} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200" onChange={(e)=>setPrice(e.target.value)} placeholder="Enetr the price" required />
                </div>
                <div className="mt-4">
                    <label htmlFor="" className="pb-1 block text-gray-500">Stock <span className="text-red-500"></span>

                    </label>
                    <input type="Number"  value={stock} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-200" onChange={(e)=>setStock(e.target.value)} placeholder="enter the stock" required />
                </div>
                <div className="mt-4">
                    <label htmlFor="" className="pb-1 block text-gray-500">Upload Images <span className="text-red-500"></span>

                    </label>
                    <input type="file" id="upload" className="hidden" multiple onChange={handleImageChange} required />
                    <label htmlFor="upload" className="cursor-pointer flex items-center justify-center w-[100px] h-[100px] bg-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200" >
                        <AiOutlinePlusCircle size ={30} color="#555"/>
                    </label>
                    <div className="flex flex-wrap mt-2">
                        {previewImages.map((img,index)=>(
                        <img src={img} key={index} alt={previewImages} className="w-[100px] h-[100px] object-cover m-2 rounded-md"/>
    
                        ))}
                    </div>
                     <button type="submit" className="w-full mt-6 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors duration-200">Create </button>                    
                    </div>
            </form>
        </div>
    </div>
)
}
export default CreateProduct;