import React from 'react';
import FoodCard from '../../../Components/FoodCard/FoodCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'; // Fix import

import 'swiper/css';
import 'swiper/css/pagination';

const OrderTab = ({ items }) => {
    return (
        <div>
            <Swiper
                pagination={Pagination}
                modules={[Pagination]} // Ensure it's correctly used
                className='mySwiper'
            // spaceBetween={20}
            // slidesPerView={3} // Adjust as needed
            >
                <SwiperSlide>
                    <div className='grid md:grid-cols-3 mb-10 gap-10 px-8 md:px-12 lg:px-28'>
                        {
                            items.map(item => (<FoodCard
                                key={item._id}
                                item={item}
                            ></FoodCard>
                            ))
                        }
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default OrderTab;
