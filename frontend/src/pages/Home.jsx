import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser') || 'Guest');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser') || 'Guest');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => navigate('/login'), 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "https://deploy-authentication-app.vercel.app/products";
            const response = await fetch(url, {
                headers: { 'Authorization': localStorage.getItem('token') }
            });

            const result = await response.json();
            if (result.success) {
                setProducts(result.products); // Ensure you use the correct key from API response
            } else {
                handleError(result.message || 'Failed to fetch products');
            }
        } catch (err) {
            handleError("Error fetching products. Please try again.");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Welcome, {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
