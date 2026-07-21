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
'https://d2d5n4ft74bagm.cloudfront.net/media/banners/07b336dd-ed17-4b62-84c9-c18dc84265b3/1775472686.jpeg?w=90',
'https://d2d5n4ft74bagm.cloudfront.net/media/banners/d344a7dc-7977-4463-935c-de212f93ea97/1775472623.jpeg?w=90',
'https://d2d5n4ft74bagm.cloudfront.net/media/banners/1704323f-be05-49d1-abdf-2b9d4b380892/1774010458.jpeg?w=90',
'https://d2d5n4ft74bagm.cloudfront.net/media/banners/f60a0f10-ed69-47cb-b82d-6604c344666f/1775472640.jpeg?w=90',
];

return (

<div className="commitments_container">

<div className="commitments_header">
<span className="commitments_badge">✦ Curated Selection</span>
<h1>MATCH THE MOOD</h1>
<div className="commitments_line"></div>
<p className="commitments_desc">Find your perfect aesthetic</p>
</div>

<div className="slider-wrapper_commitment">
<Swiper
modules={[Autoplay]}
loop={true}
spaceBetween={20}
slidesPerView={4}
speed={3000}
autoplay={{
delay: 0,
disableOnInteraction: false,
}}
breakpoints={{
320: { slidesPerView: 2, spaceBetween: 12 },
480: { slidesPerView: 2.5, spaceBetween: 15 },
768: { slidesPerView: 3.5, spaceBetween: 18 },
1024: { slidesPerView: 4.5, spaceBetween: 20 },
1280: { slidesPerView: 5, spaceBetween: 24 },
}}>
{images.map((img, index) => (
<SwiperSlide key={index}>
<div className="slide-card_commitment">
<div className="slide-image-wrapper">
<img src={img} alt={`Mood ${index + 1}`} className="slide-image_commitment" />
<div className="slide-overlay">
<span className="slide-number">0{index + 1}</span>
<div className="slide-hover-line"></div>
</div>
</div>
</div>
</SwiperSlide>
))}
</Swiper>
</div>
</div>

);
};

export default Commitments;