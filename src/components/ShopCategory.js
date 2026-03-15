import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState } from 'react';
import img1 from "../Slider/img1.png";
import img2 from "../Slider/img2.png";
import img3 from "../Slider/img3.png";
import img4 from "../Slider/img4.png";
import img5 from "../Slider/img5.png";
import img6 from "../Slider/img6.png";
import 'swiper/css/effect-coverflow';
import './ShopCategory.css';
import 'swiper/css';

const ShopCategory = () => {

const [activeIndex, setActiveIndex] = useState(0);
const swiperRef = useRef(null);

const images = [
img1,
img2,
img3,
img4,
img5,
img6,
];

return (
 
<div className="slider-container">

<h1>NEW AND POPULAR</h1>

<Swiper
ref={swiperRef}
modules={[EffectCoverflow, Autoplay]}
effect="coverflow"
loop={true}
slidesPerView={3}
centeredSlides={true}
spaceBetween={0}
coverflowEffect={{
rotate: 0,
stretch: 0,
depth: 100,
modifier: 2,
slideShadows: false,
}}
autoplay={{
delay: 3000,
disableOnInteraction: false,
}}
onSlideChange={(swiper) => {
setActiveIndex(swiper.realIndex);
}}
breakpoints={{
320: {
slidesPerView: 1.5,
},
768: {
slidesPerView: 2.5,
},
1024: {
slidesPerView: 3,
}
}}

className="swiper-custom">
{images.map((image, index) => {

const isCenter = index === activeIndex;

return (

<SwiperSlide key={index}>

<div className={`slide-content ${isCenter ? 'center-slide' : ''}`}>

<img
src={image} 
alt={`Slide ${index}`}
className={`slide-image ${isCenter ? 'center-image' : ''}`}
/>
</div>
</SwiperSlide>
);
})}
</Swiper>

</div>

);

};

export default ShopCategory;