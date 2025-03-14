import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import Slide1 from "../../../assets/home/slide1.jpg";
import Slide2 from "../../../assets/home/slide2.jpg";
import Slide3 from "../../../assets/home/slide3.jpg";
import Slide4 from "../../../assets/home/slide4.jpg";
import Slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import './Category.css'; // Custom CSS file for Swiper styling

const Category = () => {
    return (
        <section className='px-4 md:px-12 lg:px-28'>
            <SectionTitle
                heading={"Order Online"}
                subHeading={"From 11.00am to 10.00pm"}
            />

            <Swiper
                slidesPerView={1} // Default for mobile
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    // When window width is >= 640px (sm)
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    // When window width is >= 768px (md)
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    // When window width is >= 1024px (lg)
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper "
            >
                <SwiperSlide>
                    <div className="relative">
                        <img src={Slide1} className='rounded-lg w-full max-h-[350px] object-cover' alt="Salads" />
                        <h3 className='absolute bottom-4 left-1/2 transform -translate-x-1/2 uppercase text-2xl md:text-3xl lg:text-4xl text-white text-center'>Salads</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img src={Slide2} className='rounded-lg w-full max-h-[350px] object-cover' alt="Soups" />
                        <h3 className='absolute bottom-4 left-1/2 transform -translate-x-1/2 uppercase text-2xl md:text-3xl lg:text-4xl text-white text-center'>Soups</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img src={Slide3} className='rounded-lg w-full max-h-[350px] object-cover' alt="Pizzas" />
                        <h3 className='absolute bottom-4 left-1/2 transform -translate-x-1/2 uppercase text-2xl md:text-3xl lg:text-4xl text-white text-center'>Pizzas</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img src={Slide4} className='rounded-lg w-full max-h-[350px] object-cover' alt="Desserts" />
                        <h3 className='absolute bottom-4 left-1/2 transform -translate-x-1/2 uppercase text-2xl md:text-3xl lg:text-4xl text-white text-center'>Desserts</h3>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img src={Slide5} className='rounded-lg w-full max-h-[350px] object-cover' alt="Salads" />
                        <h3 className='absolute bottom-4 left-1/2 transform -translate-x-1/2 uppercase text-2xl md:text-3xl lg:text-4xl text-white text-center'>Salads</h3>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;