import React from 'react';

const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className='flex space-x-2'>
            <img style={{ borderRadius: '0 200px 200px 200px' }} className="w-[104px] mr-6" src={image} alt="" />
            <div>
                <h3 className='uppercase mb-2'>{name}---------</h3>
                <p className='text-sm'>{recipe}</p>
            </div>
            <p className='text-yellow-500'>{price}</p>

        </div>
    );
};

export default MenuItem;