import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';
// import axios from 'axios';

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        if (user && user.email) {
            // send cart item to database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,   // food name
                image,
                price,
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
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
        }
        else {
            Swal.fire({
                title: 'You are not logged in',
                text: 'You need to login to add items to cart',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login',
            }).then((result) => {
                // send the user to login page
                if (result.isConfirmed) {
                    // Only navigate if the user clicks "Login"
                    navigate('/login', { state: { from: location } });
                }
            })
        }
    }
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="Shoes" />
            </figure>
            <p className='bg-slate-900 text-white absolute right-0 mr-5 mt-5 px-4
rounded-lg'>${price}</p>
            <div className="card-body  flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button
                        onClick={handleAddToCart}
                        className='btn btn-outline bg-slate-100 text-yellow-600 border-0 border-b-4 mt-4'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;