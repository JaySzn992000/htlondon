import Navbar from "../headers_footer/navbar";
import "./AboutHm.css";

const AboutHm = () => {

return (

<div>

<Navbar></Navbar>

<main className="about_flex_hm">

<img
loading="lazy"
className="imgAbout"
src="https://images.riverisland.com/image/upload/f_auto/q_auto/t_ProductImagePortraitSmall/f_auto/q_auto/935973_main?cc&$retina"
alt=""/>

<section>

<span className="subHeading">EST. LONDON</span>

<h2>HT LONDON</h2>

<p>
Discover premium fashion inspired by the timeless elegance of
London. Every collection reflects modern tailoring, refined
craftsmanship and everyday luxury, helping you build a wardrobe
that feels confident, versatile and effortlessly sophisticated.
</p>

<button>
<span>DISCOVER COLLECTION</span>
</button>

</section>

<img
loading="lazy"
className="imgAbout"
src="https://images.riverisland.com/image/upload/t_ProductImagePortraitSmall/f_auto/q_auto/932156_main?cf&$retina$"
alt=""/>

</main>

</div>

);

};

export default AboutHm;
