import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import AboutPickle from "../Slider/AboutPickle.jpg";
import AboutCollectionOne from "../Slider/ourcollectionone.png";
import AboutCollectionTwo from "../Slider/ourcollectiontwo.png";
import "./about.css";

const Aboutus = () => {

return (

<div>

<Navbar></Navbar>

<img className="ListBanner" src="https://www.kimirica.shop/cdn/shop/files/About-Us-Page-BANNER-01_1.jpg?v=1708598103&width=1800"></img>

<section className="about_flex_tw">

<h3>OUR STORY</h3>
<h2>HT LONDON</h2>
<p className="about_para">
At HT London Clothing, we believe style is a reflection of 
confidence and individuality. Our store offers a curated 
collection of modern and comfortable clothing From timeless 
classics to contemporary fashion, we bring quality fabrics  
and stylish designs to help you look and feel your best 
every day. designed for everyday wear.
</p>
</section>

<div className="header-ad">
<Header></Header>
</div>

</div>

);

};

export default Aboutus;
