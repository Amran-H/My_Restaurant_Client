import React from 'react';
import useCart from '../../../hooks/useCart';
import { FaCut, FaTrash, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {

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
            }
        })
    }

    return (
        <div>
            <SectionTitle heading={"Wanna Add More?"}
                subHeading={"My Cart"}>
            </SectionTitle>
            <div className='flex justify-between mb-4 font-semibold'>
                <h2 className="text-3xl">Total Orders: {cart.length}</h2>
                <h2 className="text-3xl">Total Price: {totalPrice}</h2>
                <button className='btn bg-[#D1A054]  w-[70px] text-white font-bold'>Pay</button>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">

                <table className="table w-full">
                    {/* head */}
                    <thead className='bg-[#D1A054] text-white'>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>ITEM IMAGE</th>
                            <th>ITEM NAME</th>
                            <th>PRICE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(item => <tr key={item._id}>
                                <th>
                                    {cart.indexOf(item) + 1}
                                </th>
                                <td>
                                    <img src={item.image} alt={item.name} className="w-20 rounded-lg" />
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>{item.price}</td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn bg-[#B91C1C] text-white btn-md"><FaTrashAlt></FaTrashAlt> </button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Cart;