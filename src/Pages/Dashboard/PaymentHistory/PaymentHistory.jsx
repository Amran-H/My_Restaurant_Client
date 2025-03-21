import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    // Sort payments by date in descending order (latest payment first)
    const sortedPayments = [...payments].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div>
            <SectionTitle heading={"Payment History"} subHeading={"At a Glance!"} />
            <div className='bg-slate-100 p-1 md:p-6'>
                <div className='flex justify-between mb-4 font-semibold'>
                    <h2 className="text-2xl font-bold">Total Payments: {payments.length}</h2>
                </div>

                {/* Table for Larger Screens */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className='bg-[#D1A054] text-white'>
                            <tr>
                                <th>#</th>
                                <th>EMAIL</th>
                                <th>TRANSACTION ID</th>
                                <th>TOTAL PRICE</th>
                                <th>STATUS</th>
                                <th>PAYMENT DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPayments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <th className='py-4'>{index + 1}</th>
                                    <td>{payment.email}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>${payment.price}</td>
                                    <td>{payment.status}</td>
                                    <td>{moment(payment.date).format('MMMM Do YYYY, h:mm:ss A')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Card Layout for Mobile Screens */}
                <div className="block md:hidden">
                    {sortedPayments.map((payment, index) => (
                        <div key={payment._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg">#{index + 1}</h3>
                                <p className="text-sm text-gray-500">{moment(payment.date).format('MMMM Do YYYY, h:mm:ss A')}</p>
                            </div>
                            <p><span className="font-semibold">Email:</span> {payment.email}</p>
                            <p><span className="font-semibold">Transaction ID:</span> {payment.transactionId}</p>
                            <p><span className="font-semibold">Total Price:</span> ${payment.price}</p>
                            <p><span className="font-semibold">Status:</span> {payment.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;