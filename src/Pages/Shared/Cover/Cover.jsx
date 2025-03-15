import React from 'react';
import { Parallax } from 'react-parallax';

const Cover = ({ img, title, description }) => {
    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="the menu"
            strength={- 200}
        >
            <div
                className="hero md:min-h-[500px] w-auto"
            >
                <div ></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className=" bg-black bg-opacity-60 px-10 md:px-80 mt-14 md:mt-0 py-5 md:py-20">
                        <h1 className="mb-5 text-3xl md:text-5xl font-bold uppercase text-white">{title}</h1>
                        <p className="mb-5">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </Parallax >


    );
};

export default Cover;