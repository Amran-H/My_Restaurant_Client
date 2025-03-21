import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleDeleteUser = user => {
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
                axiosSecure.delete(`/users/${user._id}`)
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
    };

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: `${user.name} is an Admin now!`,
                        icon: 'success',
                        showConfirmationButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <div>
            <SectionTitle heading={"Manage all users"} subHeading={"How many?"} />
            <div className='bg-slate-100 p-1 md:p-6'>
                <div>
                    <h2 className="text-3xl font-semibold mb-3">Total Users: {users.length}</h2>
                </div>

                {/* Table for Larger Screens */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="table w-full rounded-lg">
                        {/* head */}
                        <thead className='bg-[#D1A054] text-white'>
                            <tr>
                                <th>#</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ROLE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>
                                        {user.role === 'admin' ? "Admin" : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn bg-[#D1A054] btn-md">
                                                <FaUsers className='text-xl text-white' />
                                            </button>
                                        )}
                                    </td>
                                    <th>
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn bg-[#B91C1C] btn-md">
                                            <FaTrashAlt className='text-md text-white' />
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Card Layout for Mobile Screens */}
                <div className="block md:hidden">
                    {users.map((user, index) => (
                        <div key={user._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg">#{index + 1}</h3>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                            <p><span className="font-semibold">Name:</span> {user?.name}</p>
                            <p>
                                <span className="font-semibold">Role:</span> {user.role === 'admin' ? "Admin" : (
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn bg-[#D1A054] btn-sm mt-2">
                                        <FaUsers className='text-sm text-white' /> Make Admin
                                    </button>
                                )}
                            </p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => handleDeleteUser(user)}
                                    className="btn bg-[#B91C1C] btn-sm text-white">
                                    <FaTrashAlt className='text-sm text-white' /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;