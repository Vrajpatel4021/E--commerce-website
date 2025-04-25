import React, { useEffect, useState } from "react";
import  Myproduct from "../components/auth/myProduct";   //change in this line
import Nav from '../components/auth/nav'
import axios from "../axiosConfig";
import { useSelector } from 'react-redux'; // Import useSelector

export default function MyProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Get the email from Redux state
  const email = useSelector((state) => state.user.email);
  //mail which is present in mongodb
  useEffect(() => {
    if (!email) return alert("error in display");
    axios.get(`/api/v2/product/my-products?email=${email}`)
        .then((res) => {
            setProducts(res.data.products); // <-- res.data, not res.json()
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching products:", err);
            setError(err.message);
            setLoading(false);
        });
}, [email]);

    if (loading) {
        return <div className="text-center text-white mt-10">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
    }

    return (
        <>
        <Nav/>
        <div className="w-full min-h-screen bg-neutral-800">
            <h1 className="text-3xl text-center text-white py-6">My products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                {products.map((product) => (
                    <Myproduct key={product._id} {...product} />  //change in this line
                ))}
            </div>
        </div>
        </>
    );
}