import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState } from 'react';
import 'swiper/css/effect-coverflow';
import './ShopCategory.css';
import img1 from "../Slider/img1.png";
import img2 from "../Slider/img2.png";
import img3 from "../Slider/img3.png";
import img4 from "../Slider/img4.png";
import img5 from "../Slider/img5.png";
import img6 from "../Slider/img6.png";

const ShopCategory = () => {

const [activeIndex, setActiveIndex] = useState(0);
const swiperRef = useRef(null);

const images = [
{ src: img1, alt: "" },
{ src: img2, alt: "" },
{ src: img3, alt: "" },
{ src: img4, alt: "" },
{ src: img5, alt: "" },
{ src: img6, alt: "" },
];

return (

<div className="slider-container">
<div className="section-header">
<span className="subtitle">EXCLUSIVE COLLECTION</span>
<h1>NEW & POPULAR</h1>
<p className="description">Discover our latest arrivals and trending styles</p>
</div>

<Swiper
modules={[EffectCoverflow, Autoplay]}
effect="coverflow"
grabCursor={true}
centeredSlides={true}
loop={true}
speed={800}
slidesPerView={3}
spaceBetween={30}
coverflowEffect={{
rotate: 0,
stretch: 0,
depth: 200,
modifier: 2.5,
scale: 0.85,
slideShadows: false,
}}
autoplay={{
delay: 3000,
disableOnInteraction: false,
pauseOnMouseEnter: true,
}}
breakpoints={{
320: {
slidesPerView: 1.1,
spaceBetween: 15,
},
480: {
slidesPerView: 1.5,
spaceBetween: 20,
},
768: {
slidesPerView: 2.2,
spaceBetween: 25,
},
1024: {
slidesPerView: 3,
spaceBetween: 30,
},
1280: {
slidesPerView: 3.2,
spaceBetween: 35,
},
}}
onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
className="swiper-custom"
>
{images.map((image, index) => {
const isCenter = index === activeIndex;

return (

<SwiperSlide key={index}>
<div className={`slide-content ${isCenter ? 'center-slide' : ''}`}>
<div className="image-wrapper">
<img
src={image.src}
alt={image.alt}
className={`slide-image ${isCenter ? 'center-image' : ''}`}
loading="lazy"
draggable="false"/>
{isCenter && (
<div className="slide-badge">Featured</div>
)}
<div className="slide-overlay">
<div className="slide-info">
</div>
</div>
</div>
</div>
</SwiperSlide>
);
})}
</Swiper>

<div className="slider-navigation">
<button className="nav-dot active"></button>
<button className="nav-dot"></button>
<button className="nav-dot"></button>
<button className="nav-dot"></button>
<button className="nav-dot"></button>
<button className="nav-dot"></button>
</div>
</div>
);

};

export default ShopCategory;