import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [loading, setLoading] = useState(false); // State for managing loading
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        setLoading(true); // Set loading to true before payment

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
            setLoading(false); // Set loading to false if there's an error
        } else {
            setError('');
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error');
            setLoading(false); // Set loading to false if there's a confirm error
        } else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                // Now saving the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'Pending'
                };

                const res = await axiosSecure.post('/payments', payment);
                refetch();

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        title: `Payment`,
                        text: `Payment has been completed.`,
                        icon: 'success',
                        timer: 1500,
                    });
                    navigate('/dashboard/paymentHistory');
                }
            }
        }

        setLoading(false); // Set loading to false after the payment process is done
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 md:p-8 bg-slate-100 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Complete Your Payment</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-2xl">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="p-3 h-11 border border-gray-300 rounded-md shadow-sm"
                />
                <button
                    className="btn bg-[#D1A054] text-white w-full md:w-auto px-6 py-2 mt-6 text-lg font-semibold rounded-md hover:bg-[#b8863b] transition-all duration-300"
                    type="submit"
                    disabled={!stripe || !clientSecret || loading} // Disable button during loading
                >
                    {loading ? (
                        <span className="loading loading-spinner text-black"></span> // Show the loader
                    ) : (
                        'Pay'
                    )}
                </button>
                {error && <p className="text-red-600 mt-4">{error}</p>}
                {transactionId && <p className="text-green-600 mt-4">Your transaction ID: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
