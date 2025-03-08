import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { LoadCanvasTemplate, validateCaptcha, loadCaptchaEnginge } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from || '/';   // If the user is not logged in, redirect to the page they were trying to access

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true });
            })
    }

    const handleValidateCaptcha = (e) => {
        const captcha = e.target.value;
        if (validateCaptcha(captcha)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="Type the text captcha" className="input input-bordered" required />
                                {/* <button className='btn btn-outline btn-xs mt-2'>Validate</button> */}
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn btn-primary" type="submit" value='Login' />
                            </div>
                        </form>
                        <p className='mx-7 mt-[-30px]'> <SocialLogin></SocialLogin></p>
                        <p className='px-6'><small>New Here? <Link to='/signUp'>Create an account</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;