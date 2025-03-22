import React, { useState } from 'react';
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaPaypal, FaShopify, FaShoppingCart, FaUsers, FaUtensils, FaBars, FaTimes } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="max-w-[1280px] mx-auto flex relative">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-50 bg-[#D1A054] min-h-screen w-64 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                <ul className="menu pb-4 pt-[52px] md:pt-4">
                    {isAdmin ? (
                        <>
                            <li><NavLink to="/dashboard/adminHome" onClick={toggleSidebar}><FaHome /> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/addItems" onClick={toggleSidebar}><FaUtensils /> Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manageItems" onClick={toggleSidebar}><FaList /> Manage Items</NavLink></li>
                            {/* <li><NavLink to="/dashboard/bookings" onClick={toggleSidebar}><FaBook /> Manage Bookings</NavLink></li> */}
                            <li><NavLink to="/" onClick={toggleSidebar}><FaBook /> Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/users" onClick={toggleSidebar}><FaUsers /> All Users</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/dashboard/userHome" onClick={toggleSidebar}><FaHome /> User Home</NavLink></li>
                            {/* <li><NavLink to="/dashboard/reservation" onClick={toggleSidebar}><FaCalendar /> Reservation</NavLink></li> */}
                            <li><NavLink to="/" onClick={toggleSidebar}><FaCalendar /> Reservation</NavLink></li>
                            <li><NavLink to="/dashboard/paymentHistory" onClick={toggleSidebar}><FaPaypal /> Payment History</NavLink></li>
                            <li><NavLink to="/dashboard/cart" onClick={toggleSidebar}><FaShoppingCart /> My Cart ({cart?.length})</NavLink></li>
                            {/* <li><NavLink to="/dashboard/review" onClick={toggleSidebar}><FaAd /> Add Reviews</NavLink></li> */}
                            <li><NavLink to="/" onClick={toggleSidebar}><FaAd /> Add Reviews</NavLink></li>
                            {/* <li><NavLink to="/dashboard/bookings" onClick={toggleSidebar}><FaList /> My Bookings</NavLink></li> */}
                            <li><NavLink to="/" onClick={toggleSidebar}><FaList /> My Bookings</NavLink></li>
                        </>
                    )}

                    <div className="divider"></div>
                    {/* Shared nav */}
                    <li><NavLink to="/" onClick={toggleSidebar}><FaHome /> Home</NavLink></li>
                    <li><NavLink to="/order/salad" onClick={toggleSidebar}><FaList /> Menu</NavLink></li>
                    <li><NavLink to="/order/salad" onClick={toggleSidebar}><FaShopify /> Shop</NavLink></li>
                    <li><NavLink to="/contactUs" onClick={toggleSidebar}><FaEnvelope /> Contact</NavLink></li>
                </ul>
            </div>

            {/* Toggle Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-[#D1A054] text-white p-2 rounded-full"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Dashboard Content */}
            <div className="flex-1 p-4 ml-0 md:ml-64">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;