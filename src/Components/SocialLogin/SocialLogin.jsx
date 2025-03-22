import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // State to track loading

    const handleGoogleSignIn = () => {
        setLoading(true); // Set loading to true when the process starts
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
                    .finally(() => {
                        setLoading(false); // Set loading to false after the process is complete
                    });
            })
            .catch(error => {
                console.error('Google Sign-In was canceled or failed:', error);
                setLoading(false); // Reset loading if the popup is closed or an error occurs
            });
    };

    return (
        <div>
            <div className='divider'>or</div>
            <button
                onClick={handleGoogleSignIn}
                className={`btn btn-ghost w-full border border-black ${loading ? 'cursor-wait' : ''}`}
                disabled={loading} // Disable the button while loading
            >
                {loading ? (
                    <span className="loading loading-spinner text-black"></span> // Show spinner
                ) : (
                    <>
                        <FaGoogle className="mr-2" /> Google
                    </>
                )}
            </button>
        </div>
    );
};

export default SocialLogin;