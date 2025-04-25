import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

function Myproduct({ _id, name, images, description, price, onDelete }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!images || images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [images]);

    const currentImage = Array.isArray(images) && images.length > 0
        ? images[currentIndex]
        : null;

    const handleEdit = () => {
        navigate(`/create-product/${_id}`);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/v2/product/delete-product/${_id}`);
            if (response.status === 200) {
                alert("Product deleted successfully!");
                onDelete(_id); // ✅ call parent handler to update state
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Failed to delete product.");
        }
    };

    return (
        <div className="bg-neutral-200 p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div className="w-full">
                {currentImage && (
                    <img
                        src={`${axios.defaults.baseURL}${currentImage}`}
                        alt={name}
                        className="w-full h-56 object-cover rounded-lg mb-2"
                    />
                )}
                <h2 className="text-lg font-bold">{name}</h2>
                <p className="text-sm opacity-75 mt-2">{description}</p>
            </div>
            <div className="w-full mt-4">
                <p className="text-lg font-bold my-2">${price.toFixed(2)}</p>
                <button
                    className="w-full text-white px-4 py-2 rounded-md bg-neutral-900 hover:bg-neutral-700 transition duration-300"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="w-full text-white px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition duration-300 mt-2"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

Myproduct.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired, // ✅ required prop
};

export default Myproduct;
