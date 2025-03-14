import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        setLoading(true);
        setError('');

        createUser(data.email, data.password)
            .then((result) => {
                return updateUserProfile(data.name, data.photoURL);
            })
            .then(() => {
                const userInfo = {
                    name: data.name,
                    email: data.email,
                };
                return axiosPublic.post('/users', userInfo);
            })
            .then(res => {
                if (res.data.insertedId) {
                    reset();
                    Swal.fire({
                        title: "User created successfully",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/');
                }
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <Helmet>
                <title>SignUp</title>
            </Helmet>
            <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/Rectangle 75.png')` }}>
                <div className="shadow-lg rounded-lg flex justify-evenly flex-col md:flex-row w-[90%] max-w-[1024px] p-8 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/Rectangle 77.png')` }}>
                    <div className="hidden md:flex w-5/12 justify-center items-center">
                        <img src="/authentication2 1.png" alt="Sign Up Illustration" className="w-full" />
                    </div>
                    <div className="w-full md:w-4/12">
                        <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input type="text" {...register("name", { required: true })} className="w-full p-2 border rounded-md" placeholder="Your name" />
                                {errors.name && <p className="text-red-500 text-xs">Name is required</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Photo URL</label>
                                <input type="text" {...register("photoURL", { required: true })} className="w-full p-2 border rounded-md" placeholder="Photo URL" />
                                {errors.photoURL && <p className="text-red-500 text-xs">Photo URL is required</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input type="email" {...register("email", { required: true })} className="w-full p-2 border rounded-md" placeholder="Email" />
                                {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                })} className="w-full p-2 border rounded-md" placeholder="Password" />
                                {errors.password?.type === 'required' && <p className="text-red-500 text-xs">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-500 text-xs">Minimum 6 characters required</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-500 text-xs">Maximum 20 characters allowed</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-500 text-xs">Must contain upper, lower, number, and special character</p>}
                            </div>
                            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                            <div className="form-control mt-6">
                                <button type="submit" className="btn w-full bg-[#D1A054] hover:bg-[#c57906] text-white p-2 rounded-md flex justify-center items-center" disabled={loading}>
                                    {loading ? <span className="loading loading-spinner"></span> : 'Sign Up'}
                                </button>
                            </div>
                        </form>
                        <p className="text-center mt-4 text-gray-600">
                            Already have an account? <Link to="/login" className="text-[#D1A054]">Login</Link>
                        </p>
                        <p> <SocialLogin></SocialLogin></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;