import React from 'react';
import axios from 'axios';

export const axiosSecure = axiosSecure.create({
    baseURL: 'http://localhost:5000',
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;