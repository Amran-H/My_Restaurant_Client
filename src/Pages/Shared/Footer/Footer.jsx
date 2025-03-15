import React from 'react';
import { FaFacebook, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <div className="container text-white mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">

                {/* Left Section - Contact Info */}
                <div className="text-center w-full md:w-1/2 bg-[#1F2937] py-10">
                    <h3 className="text-lg font-semibold">Contact Us</h3>
                    <p className="text-sm mt-3 mb-1">123 Stadium Street, Noakhali, Bangladesh</p>
                    <p className="text-sm mb-1">+88 (018) 24 ** 789</p>
                    <p className="text-sm mb-1">Mon - Fri: 08:00 - 22:00</p>
                    <p className="text-sm">Sat - Sun: 10:00 - 23:00</p>
                </div>

                {/* Right Section - Social Media */}
                <div className="text-center md:mt-0 w-full md:w-1/2 bg-[#121826] h-[160px] md:h-[212px] pt-10">
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <p className="text-sm mt-3 mb-3">Join us on social media</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <a href="#" className="text-xl hover:text-gray-400"><FaFacebookF /></a>
                        <a href="#" className="text-xl hover:text-gray-400"><FaInstagram /></a>
                        <a href="#" className="text-xl hover:text-gray-400"><FaTwitter /></a>
                    </div>
                </div>
            </div>


            {/* bottom */}
            <div className="footer footer-center bg-black text-white p-1">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All rights reserved by <a href="https://amran-h.netlify.app/" className="underline" target='blank'>Amran Hossain</a></p>
                    <p className='mt-[-5px]'>Web Developer ||  <a href="mailto:amran.h.akash@gmail.com" className="underline">amran.h.akash@gmail.com</a></p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;