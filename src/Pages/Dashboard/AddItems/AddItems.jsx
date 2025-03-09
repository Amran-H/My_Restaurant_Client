import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useForm } from "react-hook-form"
import { FaUtensils } from "react-icons/fa"

const AddItems = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            <SectionTitle heading={"ADD AN ITEM"}
                subHeading={"What's new?"}>
            </SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-control w-full my-6'>
                        <label className="label">
                            <span className='label-text'>Recipe Name*</span>
                        </label>
                        <input type="text"
                            placeholder='Recipe Name'
                            {...register('name', { required: true })}
                            className='input input-bordered w-full' />
                    </div>

                    <div className='flex gap-6'>
                        {/* category */}
                        <div className='form-control w-full'>
                            <label className="label">
                                <span className='label-text'>Category*</span>
                            </label>
                            <select {...register("category", { required: true })}
                                className='select select-bordered w-full '>
                                <option disabled selected>Select a category</option>
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
                                <span className='label-text'>Price*</span>
                            </label>
                            <input type="number"
                                placeholder='Price'
                                {...register('price', { required: true })}
                                className='input input-bordered w-full' />
                        </div>

                    </div>
                    {/* recipe details */}
                    <div className='form-control'>
                        <label className="label">
                            <span>Recipe Details*</span>
                        </label>
                        <textarea {...register('recipe', { required: true })} className='textarea textarea-bordered h-40' placeholder="Recipe details"></textarea>
                    </div>
                    {/* file upload */}
                    <div className='form-control w-full my-6'>
                        <input {...register('image', { required: true })} type="file" className='file-input w-full max-w-xs' />
                    </div>
                    <button className='btn'>Add Item <FaUtensils></FaUtensils> </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;