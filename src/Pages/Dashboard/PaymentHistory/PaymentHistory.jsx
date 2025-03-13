import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            console.log(res.data);
            return res.data;
        }
    })

    return (
        <div>
            <SectionTitle heading={"Payment History"}
                subHeading={"At a Glance!"}>
            </SectionTitle>
            <div className='bg-slate-100 p-6'>
                <div className='flex justify-between mb-4 font-semibold'>
                    <h2 className="text-2xl font-bold">Total Payments: {payments.length}</h2>
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
                                <th>EMAIL</th>
                                <th>TRANSACTION ID</th>
                                {/* <th>CATEGORY</th> */}
                                <th>TOTAL PRICE</th>
                                <th>STATUS</th>
                                <th>PAYMENT DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map(payment => <tr key={payment._id}>
                                    <th className='py-4'>
                                        {payments.indexOf(payment) + 1}
                                    </th>
                                    <td>{payment.email}</td>
                                    <td>{payment.transactionId}</td>
                                    {/* <td>{payment.category}</td> */}
                                    <td>{payment.price}</td>
                                    <td>{payment.status}</td>
                                    <td>{payment.date}</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default PaymentHistory;