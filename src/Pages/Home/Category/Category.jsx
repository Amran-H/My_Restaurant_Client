import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import Slide1 from "../../../assets/home/slide1.jpg"
import Slide2 from "../../../assets/home/slide2.jpg"
import Slide3 from "../../../assets/home/slide3.jpg"
import Slide4 from "../../../assets/home/slide4.jpg"
import Slide5 from "../../../assets/home/slide5.jpg"
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section>
            <SectionTitle heading={"Order Online"}
                subHeading={"From 11.00am to 10.00pm"}>
            </SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-20"
            >
                <SwiperSlide><img src={Slide1} alt="" />
                    <h3 className='uppercase text-4xl -mt-16 text-white text-center'>Salads</h3>
                </SwiperSlide>
                <SwiperSlide><img src={Slide2} alt="" /><h3 className='uppercase text-4xl -mt-16 text-white text-center'>Soups</h3> </SwiperSlide>
                <SwiperSlide><img src={Slide3} alt="" /><h3 className='uppercase text-4xl -mt-16 text-white text-center'>Pizzas</h3></SwiperSlide>
                <SwiperSlide><img src={Slide4} alt="" /><h3 className='uppercase text-4xl -mt-16 text-white text-center'>Desserts</h3></SwiperSlide>
                <SwiperSlide><img src={Slide5} alt="" /><h3 className='uppercase text-4xl -mt-16 text-white text-center'>Salads</h3></SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;