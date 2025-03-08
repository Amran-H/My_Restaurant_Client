import React from 'react';
import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaPaypal, FaShopify, FaShoppingCart, FaVoicemail } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Dashboard = () => {
    const [cart] = useCart();

    return (
        <div className='flex'>
            {/* Sidebar */}
            <div className='w-64 min-h-screen bg-orange-400'>
                <ul className='menu py-4'>
                    <li><NavLink to='/dashboard/userHome'><FaHome></FaHome> User Home</NavLink></li>
                    <li><NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar> Reservation</NavLink></li>
                    <li><NavLink to='/dashboard/paymentHistory'><FaPaypal></FaPaypal> Payment History</NavLink></li>
                    <li><NavLink to='/dashboard/cart'><FaShoppingCart></FaShoppingCart> My Cart ({cart?.length})</NavLink></li>
                    <li><NavLink to='/dashboard/review'><FaAd></FaAd> Add Reviews</NavLink></li>
                    <li><NavLink to='/dashboard/bookings'><FaList></FaList> My Bookings</NavLink></li>

                    <div className='divider '></div>

                    <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to='/order/salad'><FaList></FaList> Menu</NavLink></li>
                    <li><NavLink to='/order/salad'><FaShopify></FaShopify> Shop</NavLink></li>
                    <li><NavLink to='/ '><FaVoicemail></FaVoicemail> Contact</NavLink></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;