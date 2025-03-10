import { useQueries, useQuery } from '@tanstack/react-query';
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
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: `${user.name} is an Admin now!`,
                        icon: 'success',
                        showConfirmationButton: false,
                        timer: 1500
                    })
                }
            })
    };

    return (
        <div>
            <SectionTitle heading={"Manage all users"}
                subHeading={"How many?"}>
            </SectionTitle>

            <div className='bg-slate-100 p-6'>
                <div>
                    <h2 className="text-3xl font-semibold mb-3">Total Users: {users.length}</h2>
                </div>
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table w-full  rounded-lg">
                        {/* head */}
                        <thead className='bg-[#D1A054] text-white'>
                            <tr>
                                <th>

                                </th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ROLE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => <tr key={user._id}>
                                    <th>
                                        {users.indexOf(user) + 1}
                                    </th>
                                    <td>
                                        {user?.name}
                                    </td>
                                    <td>
                                        {user?.email}
                                    </td>
                                    <td> {user.role === 'admin' ? "Admin" : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn bg-[#D1A054] btn-md"><FaUsers className='text-xl text-white'></FaUsers> </button>}</td>
                                    <th>
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn bg-[#B91C1C] btn-md"><FaTrashAlt className='text-md text-white'></FaTrashAlt> </button>
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

export default AllUsers;