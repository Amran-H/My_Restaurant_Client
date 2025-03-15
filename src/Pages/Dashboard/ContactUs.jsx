import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import coverImg from "../../../src/assets/contact/banner.jpg"
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaPlane, FaPlaneDeparture, FaPaperPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone is required"),
    message: yup.string().required("Message is required"),
});

const info = [
    {
        icon: <FaPhoneAlt size={20} />,
        title: "PHONE",
        text: "+88 (018) 24 ** 789\nor +88 (018) ** 56 701",
    },
    {
        icon: <FaMapMarkerAlt size={20} />,
        title: "ADDRESS",
        text: "New Avenue, Maijdee,\n Noakhali, Bangladesh",
    },
    {
        icon: <FaClock size={20} />,
        title: "WORKING HOURS",
        text: "Mon - Fri: 08:00 - 22:00\nSat - Sun: 10:00 - 23:00",
    },
];

const ContactUs = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };


    return (
        <div>
            <Helmet>
                <title>Contact Us</title>
            </Helmet>
            <Cover img={coverImg} title={"Contact Us"} description={"Have a question? Just Ask."}></Cover>
            <SectionTitle
                subHeading={"Give Us a visit"}
                heading={"Our Location"}
            ></SectionTitle>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center px-12 md:px-12 lg:px-28">
                {info.map((item, index) => (
                    <div key={index} className="w-full border shadow-lg">
                        <div className="bg-[#C69652] text-white flex justify-center items-center py-4">
                            {item.icon}
                        </div>
                        <div className="p-6 text-center bg-gray-100">
                            <h2 className="text-lg font-semibold">{item.title}</h2>
                            <p className="text-sm mt-2 whitespace-pre-line">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <SectionTitle
                subHeading={"Send Your Thoughts"}
                heading={"Contact Form"}
            ></SectionTitle>

            {/* Form */}
            <div className="max-w-full bg-gray-100 p-4 md:p-8 rounded-lg shadow-md mx-6 md:mx-12 lg:mx-28 mb-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-semibold">Name*</label>
                            <input
                                {...register("name")}
                                type="text"
                                placeholder="Enter your name"
                                className="w-full p-3 border rounded-md focus:ring focus:ring-gray-300"
                            />
                            <p className="text-red-500 text-sm">{errors.name?.message}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Email*</label>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-3 border rounded-md focus:ring focus:ring-gray-300"
                            />
                            <p className="text-red-500 text-sm">{errors.email?.message}</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Phone*</label>
                        <input
                            {...register("phone")}
                            type="text"
                            placeholder="Enter your phone number"
                            className="w-full p-3 border rounded-md focus:ring focus:ring-gray-300"
                        />
                        <p className="text-red-500 text-sm">{errors.phone?.message}</p>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Message*</label>
                        <textarea
                            {...register("message")}
                            placeholder="Write your message here"
                            className="w-full p-3 border rounded-md focus:ring focus:ring-gray-300 h-32"
                        />
                        <p className="text-red-500 text-sm">{errors.message?.message}</p>
                    </div>

                    {/* reCAPTCHA */}
                    <div className="flex justify-center">
                        <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-[#967043] text-white py-3 px-6 rounded-md hover:bg-[#805a37] flex items-center mx-auto"
                        >
                            Send Message <span className='ml-2'><FaPaperPlane /></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;