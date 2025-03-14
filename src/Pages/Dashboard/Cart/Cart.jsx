import React, { useState } from 'react';
import useCart from '../../../hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart();
    const [loadingItems, setLoadingItems] = useState({});  // Track loading state for each item
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        setLoadingItems(prevState => ({ ...prevState, [id]: true }));  // Set loading for the clicked item

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your item has been deleted.',
                                icon: 'success',
                                timer: 1500,
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Something went wrong while deleting the item.',
                            icon: 'error',
                        });
                    })
                    .finally(() => {
                        setLoadingItems(prevState => ({ ...prevState, [id]: false }));  // Reset loading for the clicked item
                    });
            } else {
                setLoadingItems(prevState => ({ ...prevState, [id]: false }));  // Reset loading if deletion is canceled
            }
        })
    }

    return (
        <div>
            <SectionTitle heading={"Wanna Add More?"}
                subHeading={"My Cart"} />
            <div className='bg-slate-100 p-6'>
                <div className='flex justify-between mb-4 font-semibold'>
                    <h2 className="text-3xl">Total Orders: {cart.length}</h2>
                    <h2 className="text-3xl">Total Price: {totalPrice}</h2>
                    {cart.length ? <Link to="/dashboard/payment"><button className='btn bg-[#D1A054]  w-[70px] text-white font-bold'>Pay</button>
                    </Link> : <button disabled={!cart.length} className='btn bg-[#D1A054]  w-[70px] text-white font-bold'>Pay</button>}
                </div>
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className='bg-[#D1A054] text-white'>
                            <tr>
                                <th>#</th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item._id}>
                                    <th>{cart.indexOf(item) + 1}</th>
                                    <td>
                                        <img src={item.image} alt={item.name} className="w-20 rounded-lg" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className={`btn bg-[#B91C1C] text-white btn-md ${loadingItems[item._id] ? 'cursor-wait' : ''}`}  // Disable button for the specific item
                                            disabled={loadingItems[item._id]}  // Disable only the clicked item button
                                        >
                                            {loadingItems[item._id] ? (
                                                <span className="loading loading-spinner loading-spinner-sm" style={{ width: '14px' }}></span>  // Loader icon for the specific item
                                            ) : (
                                                <FaTrashAlt />
                                            )}
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;
