import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Featured from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';
import Contact from '../Contact.jsx/Contact';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>home</title>
            </Helmet>
            <Banner />
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Contact></Contact>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;