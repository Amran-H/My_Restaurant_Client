import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://restaurant-server-seven-nu.vercel.app',
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    // request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // for 401 or 403 logout the user and move to login page
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;