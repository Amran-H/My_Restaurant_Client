import React, { useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: res.data.data.display_url
                };

                const menuRes = await axiosSecure.post('/menu', menuItem);

                if (menuRes.data.insertedId) {
                    reset();
                    setPreviewImage(null); // Reset preview after successful upload
                    Swal.fire({
                        title: `${data.name} added`,
                        text: `${data.name} has been added to the menu.`,
                        icon: 'success',
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            console.error("Error uploading:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Image Selection for Preview
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    return (
        <div>
            <SectionTitle heading="ADD AN ITEM" subHeading="What's new?" />
            <div className="bg-[#F3F3F3] py-8 px-2 sm:px-8 lg:px-12 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text font-bold">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register('name', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 mb-6">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Category*</span>
                            </label>
                            <select
                                defaultValue="default"
                                {...register("category", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Price*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">
                            <span>Recipe Details*</span>
                        </label>
                        <textarea
                            {...register('recipe', { required: true })}
                            className="textarea textarea-bordered h-40"
                            placeholder="Recipe details"
                        ></textarea>
                    </div>

                    {/* Image Upload Section */}
                    <div className="form w-full my-6">
                        <div className="flex flex-col lg:flex-row items-start gap-6">
                            {/* Show Selected Image */}
                            <div className="flex flex-col">
                                <label className="label">
                                    <span className="label-text font-bold">Selected Image</span>
                                </label>
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Selected Preview"
                                        className="w-40 h-40 rounded-lg object-cover border shadow-md"
                                    />
                                ) : (
                                    <div className="w-40 h-40 flex items-center justify-center border rounded-lg bg-white text-gray-500">
                                        No Image Selected
                                    </div>
                                )}
                            </div>

                            {/* Upload Image Button */}
                            <div className="flex flex-col w-full">
                                <label className="label">
                                    <span className="label-text font-bold">Upload Image*</span>
                                </label>
                                <input
                                    {...register('image', { required: true })}
                                    type="file"
                                    className="file-input w-full max-w-xs"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        className="btn bg-[#B58130] text-white flex items-center justify-center w-full lg:w-auto"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <>
                                Add Item <FaUtensils />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;
