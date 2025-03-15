import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();
    const [loading, setLoading] = useState(false);  // Track loading state

    const handleAddToCart = () => {
        if (user && user.email) {
            // Set loading state to true when the request is being made
            setLoading(true);

            // send cart item to database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,   // food name
                image,
                price,
            };

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    setLoading(false);  // Set loading state to false after the request
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: `${name} added to cart`,
                            showConfirmButton: false,
                            icon: 'success',
                            timer: 1500,
                        });
                        // update cart items count
                        refetch();
                    }
                })
                .catch(error => {
                    setLoading(false);  // Set loading state to false if there's an error
                    console.error(error);
                    Swal.fire({
                        title: 'Error',
                        text: 'There was an issue adding the item to the cart.',
                        icon: 'error',
                    });
                });
        } else {
            Swal.fire({
                title: 'You are not logged in',
                text: 'You need to login to add items to cart',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className="card bg-gray-100 max-w-96 shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="Food" />
            </figure>
            <p className='bg-slate-900 text-white absolute right-0 mr-5 mt-5 px-4 rounded-lg'>${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button
                        onClick={handleAddToCart}
                        className={`btn btn-outline uppercase bg-slate-200 text-yellow-600 border-0 border-b-4 mt-4 ${loading ? 'cursor-wait' : ''}`}
                        disabled={loading}  // Disable the button during loading
                    >
                        {loading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            'Add to Cart'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
