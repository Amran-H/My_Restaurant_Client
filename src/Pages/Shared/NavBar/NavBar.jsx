import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { CgMenu, CgClose } from 'react-icons/cg';
import useCart from '../../../hooks/useCart';
import useAdmin from '../../../hooks/useAdmin';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [cart] = useCart();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
    };

    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    const navOptions = (
        <>
            <li>
                <NavLink to='/' className={({ isActive }) => isActive ? 'text-blue-500 font-semibold' : 'text-white'}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to='/contactUs' className={({ isActive }) => isActive ? 'text-blue-500 font-semibold' : 'text-white'}>
                    Contact Us
                </NavLink>
            </li>
            <li>
                <NavLink to='/menu' className={({ isActive }) => isActive ? 'text-blue-500 font-semibold' : 'text-white'}>
                    Our Menu
                </NavLink>
            </li>
            <li>
                <NavLink to='/order/salad' className={({ isActive }) => isActive ? 'text-blue-500 font-semibold' : 'text-white'}>
                    Order Food
                </NavLink>
            </li>
            {user && isAdmin && (
                <li>
                    <NavLink to='/dashboard/adminHome' className={({ isActive }) => isActive ? 'text-blue-500 font-semibold' : 'text-white'}>
                        Dashboard
                    </NavLink>
                </li>
            )}
            {user && !isAdmin && (
                <li>
                    <NavLink to='/dashboard/userHome' className={({ isActive }) => isActive ? 'text-blue-500 font-semibold' : 'text-white'}>
                        Dashboard
                    </NavLink>
                </li>
            )}
            <li>
                <NavLink to='/dashboard/cart' className={({ isActive }) => isActive ? 'text-blue-500 font-semibold flex items-center' : 'text-white flex items-center'}>
                    <FaShoppingCart className='mr-[3px]' />
                    <div className='bg-blue-600 text-white text-xs rounded-full px-[6px] py-[2px]'>{cart.length}</div>
                </NavLink>
            </li>
        </>
    );


    return (
        <>
            <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between py-4 w-full bg-black bg-opacity-50 shadow-sm fixed z-50">
                {/* Logo */}
                <Link to='/' className="text-2xl font-bold text-white">New Restaurant <span className='text-red-700'>.</span></Link>

                {/* User & Mobile Menu */}
                <div className=" flex gap-4">
                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-6">{navOptions}</ul>

                    {user ? (
                        <div className="flex items-center text-white">
                            <FaUser className="hidden md:flex mr-3" />
                            <div className='flex flex-col'>
                                <span className='hidden md:flex text-left text-yellow-400 mt-[-8px]'>{user?.displayName}</span>
                                <button onClick={handleLogOut} className="hidden md:block text-left text-sm font-semibold hover:text-gray-300 mt-[-2px] ">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <Link to='/login' className=" hidden md:block text-white bg-blue-600 hover:bg-blue-800 py-[5px] px-3 rounded-lg uppercase">Login</Link>
                    )}

                    <button
                        className="md:hidden text-white relative w-8 h-8 flex items-center justify-center"
                        onClick={toggleMobileMenu}
                    >
                        {/* Menu Icon (Visible when closed) */}
                        <CgMenu
                            className={`absolute w-7 h-7 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'
                                }`}
                        />
                        {/* Close Icon (Visible when open) */}
                        <CgClose
                            className={`absolute w-7 h-7 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-90'
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Dropdown) */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed top-16 left-0 right-0 bg-gray-900 shadow-lg z-40">
                    <ul className="flex flex-col gap-4 p-6">
                        {navOptions}
                        {user ? (
                            <li>
                                <div className='flex'>
                                    <FaUser className="text-white mr-3 mt-[-4px]" />
                                    <span className='text-left text-yellow-400 mt-[-8px] '> {user?.displayName}</span>
                                </div>
                                <button onClick={handleLogOut} className="block w-full text-white text-left">Logout</button>
                            </li>
                        ) : (
                            <li>
                                <Link to='/login' className="block w-full text-center text-white">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
};

export default NavBar;