import React, { useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { name, recipe, category, price, _id, image } = useLoaderData();
    console.log(name, recipe, category, price, _id, image);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [isLoading, setIsLoading] = useState(false); // Loader state
    const [previewImage, setPreviewImage] = useState(null);


    const onSubmit = async (data) => {
        setIsLoading(true); // Start loading
        try {
            let imageURL = image;
            // Upload image
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                // Send menu data to server
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: res.data.data.display_url
                };

                const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);

                if (menuRes.data.modifiedCount > 0) {
                    // reset();
                    Swal.fire({
                        title: `${data.name} updated`,
                        text: `${data.name} has been updated`,
                        icon: 'success',
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            console.error("Error uploading:", error);
        } finally {
            setIsLoading(false); // Stop loading
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
            <SectionTitle heading="UPDATE AN ITEM" subHeading="Modify your item" />
            <div className='bg-[#F3F3F3] py-8 px-12'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-control w-full my-6'>
                        <label className="label">
                            <span className='label-text font-bold'>Recipe Name*</span>
                        </label>
                        <input type="text"
                            defaultValue={name}
                            placeholder='Recipe Name'
                            {...register('name', { required: true })}
                            className='input input-bordered w-full' />
                    </div>

                    <div className='flex gap-6 mb-6'>
                        {/* Category */}
                        <div className='form-control w-full'>
                            <label className="label">
                                <span className='label-text font-bold'>Category*</span>
                            </label>
                            <select defaultValue={category} {...register("category", { required: true })}
                                className='select select-bordered w-full '>
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div className='form-control w-full '>
                            <label className="label">
                                <span className='label-text font-bold'>Price*</span>
                            </label>
                            <input type="number"
                                defaultValue={price}
                                placeholder='Price'
                                {...register('price', { required: true })}
                                className='input input-bordered w-full' />
                        </div>
                    </div>

                    {/* Recipe Details */}
                    <div className='form-control'>
                        <label className="label font-bold">
                            <span>Recipe Details*</span>
                        </label>
                        <textarea {...register('recipe', { required: true })} className='textarea textarea-bordered h-40' defaultValue={recipe} placeholder="Recipe details"></textarea>
                    </div>

                    {/* Image Upload Section */}
                    <div className="form w-full my-6">
                        <div className="flex items-start gap-6">
                            {/* Show Selected Image */}
                            <div className="flex flex-col">
                                <label className="label">
                                    <span className="label-text font-bold">Selected Image</span>
                                </label>
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Selected Preview"
                                        className="w-48 h-48 rounded-lg object-cover border shadow-md"
                                    />
                                ) : (
                                    <img
                                        src={image} // This is the existing image
                                        alt="Existing Image"
                                        className="w-48 h-48 rounded-lg object-cover border shadow-md"
                                    />
                                )}
                            </div>

                            {/* Upload Image Button */}
                            <div className="flex flex-col">
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


                    <div className='flex justify-center mt-4'>
                        {/* Submit Button with Loader */}
                        <button className='btn bg-[#B58130] text-white flex items-center ' disabled={isLoading}>
                            {isLoading ? (
                                <span className="loading loading-spinner"></span> // Tailwind Spinner
                            ) : (
                                <>
                                    Update Recipe Details <FaUtensils />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
