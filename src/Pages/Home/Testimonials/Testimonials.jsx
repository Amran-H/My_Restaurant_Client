import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import '@smastrom/react-rating/style.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://restaurant-server-seven-nu.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <section className='my-20 px-4 md:px-12 lg:px-28'>
            <SectionTitle
                subHeading={"What Our Clients Say"}
                heading={"Testimonials"}
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className='flex flex-col items-center mx-24 my-6'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <span className='mt-2 font-bold'>RATING</span>
                            <p className='py-6'>{review.details}</p>
                            <h3 className='text-2xl text-orange-400'>{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;