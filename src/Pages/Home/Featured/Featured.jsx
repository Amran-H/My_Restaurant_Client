import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import featuredImage from "../../../assets/home/featured.jpg";
import './Featured.css';

const Featured = () => {
    return (
        <div className='featured-item text-white pt-8 my-20 bg-fixed '>
            <SectionTitle subHeading={"Check It Out"} heading={"Featured Item"}></SectionTitle>
            <div className='md:flex justify-center items-center pb-20 pt-12 px-6 md:px-36 bg-slate-800 bg-opacity-40'>
                <div>
                    <img src={featuredImage} alt="" />
                </div>
                <div className='md:ml-10 pt-6'>
                    <p>Aug 25, 2025</p>
                    <p>WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate minus obcaecati itaque odit tempore perspiciatis unde ab, consequuntur dicta excepturi, quod ex voluptas modi ullam libero optio voluptatem rerum quisquam consequatur, vero exercitationem! Dolor esse unde tempora suscipit quisquam soluta beatae laboriosam placeat molestiae consequatur hic necessitatibus, inventore alias eligendi?</p>
                    <button className='btn btn-outline border-0 border-b-4 mt-4 text-white'>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;