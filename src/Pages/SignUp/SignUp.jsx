import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { LoadCanvasTemplate, validateCaptcha, loadCaptchaEnginge } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useFormAction, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const SignUp = () => {
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

        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
            })
            .then(() => {
                // create user entry in the database
                const userInfo = {
                    name: data.name,
                    email: data.email,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            reset();
                            Swal.fire({
                                position: "top-end",
                                title: "User created successfully",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
                        }
                    })
            })
            .catch(error => console.log(error));

    };

    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, [])

    // const handleValidateCaptcha = () => {
    //     const captcha = captchaRef.current.value;
    //     if (validateCaptcha(captcha)) {
    //         setDisabled(false);
    //     } else {
    //         setDisabled(true);
    //     }
    // }

    return (
        <>
            <Helmet>
                <title>SignUp</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">SignUp now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name='name' placeholder="name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="photoURL" className="input input-bordered" />
                                {errors.photoURL && <span className='text-red-600'>Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} name='password' placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className='text-red-600'>Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-600'>Minimum 6 characters required</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-600'>Maximum 20 characters required</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-600'>Password must have one lower, one upper case, one number and one special character</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {/* <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input type="text" ref={captchaRef} name='captcha' placeholder="Type the text captcha" className="input input-bordered" required />
                            <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-2'>Validate</button>
                        </div> */}
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value='Sign Up' />
                            </div>
                        </form>
                        <p className='mx-7 mt-[-30px]'> <SocialLogin></SocialLogin></p>
                        <p className='px-6'><small>Already have an account? <Link to='/login'>Please Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;