import React from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDelete = async (id) => {
        // Show confirmation modal
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Call the delete API
                    const res = await axiosSecure.delete(`/menu/${id}`);

                    // Check if the item was deleted
                    if (res.data.deletedCount > 0) {
                        refetch(); // Re-fetch the updated menu list
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your item has been deleted.',
                            icon: 'success',
                            timer: 1500,
                        });
                    }
                } catch (error) {
                    // Handle error
                    console.error('Error deleting item:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was an issue deleting the item.',
                        icon: 'error',
                    });
                }
            }
        });
    };


    return (
        <div>
            <SectionTitle heading={"Manage all Items"} subHeading={"Hurry up!"}>
            </SectionTitle>
            <div className='bg-slate-100 p-1 md:p-6 rounded-lg'>
                <div className='flex flex-col md:flex-row justify-between mb-4 font-semibold'>
                    <h2 className="text-xl md:text-2xl font-bold pt-4">Total Items: {menu.length}</h2>
                </div>
                {/* Responsive Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className='bg-[#D1A054] text-white'>
                            <tr>
                                <th>#</th>
                                <th>IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                <th>UPDATE</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => (
                                    <tr key={item._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <img src={item.image} alt={item.name} className="w-12 md:w-20 rounded-lg" />
                                        </td>
                                        <td className="text-sm">{item.name}</td>
                                        <td className="text-sm">{item.category}</td>
                                        <td className="text-sm">{item.price}</td>
                                        <th>
                                            <Link to={`/dashboard/updateItem/${item._id}`}>
                                                <button className="btn bg-[#D1A054] text-white btn-sm md:btn-md">
                                                    <FaRegEdit className='text-sm md:text-lg'></FaRegEdit>
                                                </button>
                                            </Link>
                                        </th>
                                        <th>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="btn bg-[#B91C1C] text-white btn-sm md:btn-md">
                                                <FaTrashAlt className='text-sm'></FaTrashAlt>
                                            </button>
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* Card Layout for Mobile */}
                <div className="block md:hidden">
                    {
                        menu.map((item, index) => (
                            <div key={item._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-lg">#{index + 1}</h3>
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg" />
                                </div>
                                <p><span className="font-semibold">Name:</span> {item.name}</p>
                                <p><span className="font-semibold">Category:</span> {item.category}</p>
                                <p><span className="font-semibold">Price:</span> ${item.price}</p>
                                <div className="flex justify-between mt-4">
                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                        <button className="btn bg-[#D1A054] text-white btn-sm">
                                            <FaRegEdit className='text-sm'></FaRegEdit> Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn bg-[#B91C1C] text-white btn-sm">
                                        <FaTrashAlt className='text-sm'></FaTrashAlt> Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageItems;