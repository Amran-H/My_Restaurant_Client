import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Menu = () => {
    return (
        <div>
            <Helmet>
                <title>Our Menu</title>
            </Helmet>
            <h3>Menu</h3>
        </div>
    );
};

export default Menu;