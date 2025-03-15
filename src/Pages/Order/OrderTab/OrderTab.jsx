import React, { useState } from 'react';
import FoodCard from '../../../Components/FoodCard/FoodCard';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";

const OrderTab = ({ items }) => {
    const itemsPerPage = 6; // Adjust based on how many cards per page
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Slice the items based on the current page
    const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="px-8 md:px-12 lg:px-28">
            {/* Grid Layout for Food Cards */}
            <div className="grid md:grid-cols-3 mb-10 gap-10">
                {paginatedItems.map(item => (
                    <FoodCard key={item._id} item={item} />
                ))}
            </div>

            {/* Pagination Controls buttons */}
            <div className="flex items-center justify-start gap-4 mb-16">
                {/* Previous Button */}
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={` rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:text-primary hover:bg-white'}`}
                    disabled={currentPage === 1}
                >
                    <FaRegArrowAltCircleLeft className='text-3xl' />

                </button>

                {/* Page Indicator */}
                <span className="text-lg">
                    {currentPage} / {totalPages}
                </span>

                {/* Next Button */}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={` rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:text-primary hover:bg-white'}`}
                    disabled={currentPage === totalPages}
                >
                    <FaRegArrowAltCircleRight className='text-3xl' />
                </button>
            </div>
        </div>
    );
};

export default OrderTab;
