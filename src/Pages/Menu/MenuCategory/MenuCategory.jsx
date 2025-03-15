import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, img, description }) => {
    return (
        <div className='md:pt-8'>
            {title && <Cover img={img} title={title} description={description}></Cover>}
            <div className='grid md:grid-cols-2 gap-10 my-16  px-4 md:px-12 lg:px-28' >
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`} className='flex justify-center'>
                <button className='btn btn-outline border-0 border-b-4 mb-8 mt-[-30px]'>Order Your Favorite Item</button>
            </Link>
        </div>
    );
};

export default MenuCategory;