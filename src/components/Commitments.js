import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "./Commitments.css";
import "swiper/css";

const Commitments = () => {

const images = [
'https://d2d5n4ft74bagm.cloudfront.net/media/banners/8b9d28d0-eb80-404d-9d02-604e0ea6b529/1773059996.jpeg?w=90',
'https://d2d5n4ft74bagm.cloudfront.net/media/banners/07b336dd-ed17-4b62-84c9-c18dc84265b3/1772714397.jpeg?w=90',
'https://d2d5n4ft74bagm.cloudfront.net/media/banners/d344a7dc-7977-4463-935c-de212f93ea97/1772714499.jpeg?w=90',
'https://d2d5n4ft74bagm.cloudfront.net/media/banners/df2c0250-f5ef-4eec-af94-dc7692b05161/1771572365.jpeg?w=90',
];


return (

<div className="slider-container_Commitment">

<h1>MATCH THE MOOD</h1>

<Swiper
modules={[Autoplay]}
loop={true}
spaceBetween={5}
slidesPerView={4}
speed={2000}

autoplay={{
delay:0,
disableOnInteraction:false
}}

breakpoints={{
320:{slidesPerView:2, spaceBetween:5},
480:{slidesPerView:2, spaceBetween:5},
768:{slidesPerView:3, spaceBetween:5},
1024:{slidesPerView:4, spaceBetween:5}
}}>

{images.map((img,index)=>(
<SwiperSlide key={index}>
<div className="slide-content_Commite">
<img src={img} alt="" className="slide-image_Commite"/>
</div>
</SwiperSlide>
))}

</Swiper>

</div>

);

};

export default Commitments;