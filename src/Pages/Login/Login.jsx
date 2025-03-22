import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { LoadCanvasTemplate, validateCaptcha, loadCaptchaEnginge } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import loginImg from '../../../public/authentication2 1.png';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState('');
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset error before new login attempt
        const email = e.target.email.value;
        const password = e.target.password.value;
        signIn(email, password)
            .then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch(err => { setError(err.message) })
            .finally(() => setLoading(false));
    };

    const handleValidateCaptcha = () => {
        const captchaValue = document.getElementById("captchaInput").value; // Get input value
        if (validateCaptcha(captchaValue)) {
            setDisabled(false);
            setError(''); // Clear any previous errors
        } else {
            setError("Captcha validation failed. Please try again.");
            setDisabled(true);
        }
    };


    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/Rectangle 75.png')` }}>
                <div className="shadow-lg rounded-lg flex justify-evenly flex-col md:flex-row w-[90%] max-w-[1024px] p-8 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/Rectangle 77.png')` }}>
                    {/* Left Side Image */}
                    <div className="hidden md:flex w-5/12 justify-center items-center">
                        <img src={loginImg} alt="Login Illustration" className="w-full" />
                    </div>
                    {/* Login Form */}
                    <div className="w-full md:w-4/12">
                        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input type="email" name="email" className="w-full p-2 border rounded-md" placeholder="Type here" required />
                            </div>
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <input type="password" name="password" className="w-full p-2 border rounded-md" placeholder="Enter your password" required />
                            </div>
                            <div>
                                <LoadCanvasTemplate />
                                <input id="captchaInput" type="text" name="captcha" className="w-full p-2 border rounded-md mt-2" placeholder="Type here" required />
                            </div>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <div className="form-control mt-6">
                                {disabled ? (
                                    <button type="button" onClick={handleValidateCaptcha} className="btn w-full bg-[#D1A054] hover:bg-[#c57906] text-white p-2 rounded-md">
                                        Validate Captcha
                                    </button>
                                ) : (
                                    <button type="submit" className="btn w-full bg-[#D1A054] hover:bg-[#c57906] text-white p-2 rounded-md flex justify-center items-center" disabled={loading}>
                                        {loading ? <span className="loading loading-spinner text-black"></span> : 'Login'}
                                    </button>
                                )}


                            </div>
                        </form>
                        <p className="text-center mt-4 text-gray-600">
                            New here? <Link to="/signUp" className="text-[#D1A054]">Create a New Account</Link>
                        </p>
                        <p> <SocialLogin></SocialLogin></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
