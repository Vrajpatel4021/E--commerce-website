import React, { useEffect, useState } from "react";
import Myproduct from "../components/auth/myproduct";
import Nav from "../components/auth/nav";
import axios from "../axiosConfig";
import { useSelector } from "react-redux";

export default function MyProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const email = useSelector((state) => state.user.email);

    useEffect(() => {
        if (!email) return alert("Error: email not found");
        axios
            .get(`/api/v2/product/my-products?email=${email}`)
            .then((res) => {
                setProducts(res.data.products);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [email]);

    // ✅ Delete handler to remove product from local state
    const handleProductDelete = (deletedId) => {
        setProducts((prev) => prev.filter((product) => product._id !== deletedId));
    };

    if (loading) {
        return <div className="text-center text-white mt-10">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
    }

    return (
        <>
            <Nav />
            <div className="w-full min-h-screen bg-neutral-800">
                <h1 className="text-3xl text-center text-white py-6">My products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                    {products.map((product) => (
                        <Myproduct
                            key={product._id}
                            {...product}
                            onDelete={handleProductDelete} // ✅ Pass delete handler
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
