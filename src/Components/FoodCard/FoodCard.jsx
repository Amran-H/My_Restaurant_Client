import React from 'react';

const FoodCard = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="Shoes" />
            </figure>
            <p className='bg-slate-900 text-white absolute right-0 mr-5 mt-5 px-4
rounded-lg'>${price}</p>
            <div className="card-body  flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className='btn btn-outline bg-slate-100 text-yellow-600 border-0 border-b-4 mt-4'>Add to Cart</button>

                </div>
            </div>
        </div>
    );
};

export default FoodCard;