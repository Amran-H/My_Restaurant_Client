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
            <SectionTitle heading={"Manage all Items"}
                subHeading={"Hurry up!"}>
            </SectionTitle>
            <div className='bg-slate-100 p-6'>
                <div className='flex justify-between mb-4 font-semibold'>
                    <h2 className="text-2xl font-bold">Total Items: {menu.length}</h2>
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
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                <th>UPDATE</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map(item => <tr key={item._id}>
                                    <th>
                                        {menu.indexOf(item) + 1}
                                    </th>
                                    <td>
                                        <img src={item.image} alt={item.name} className="w-20 rounded-lg" />
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.category}
                                    </td>
                                    <td>{item.price}</td>
                                    <th>
                                        <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button className="btn bg-[#D1A054] text-white btn-md"><FaRegEdit className='text-lg'></FaRegEdit> </button>
                                        </Link>
                                    </th>
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


        </div>
    );
};

export default ManageItems;