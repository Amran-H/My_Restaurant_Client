import React from 'react';

const Contact = () => {
    return (
        <div className="bg-gray-900 py-8 mx-8 md:mx-28 rounded-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Heading */}
                <h2 className="text-xl md:text-4xl font-bold text-white mb-4">
                    Call Us: +88 01824****88
                </h2>

                {/* Description */}
                <p className=" text-sm text-white mb-4">
                    We're here to help! Reach out to us for any inquiries or support.
                </p>

                {/* Call-to-Action Button */}
                <a
                    href="tel:+8801824****88"
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-sm md:text-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    Call Now
                </a>
            </div>
        </div>
    );
};

export default Contact;