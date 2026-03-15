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
alt=""
src="https://images.riverisland.com/image/upload/f_auto/q_auto/t_ProductImagePortraitSmall/f_auto/q_auto/935973_main?cc&$retina"></img>

<section>

<h2>HT LONDON</h2>
<p>
{" "}
Discover premium fashion and clothing inspired by the 
timeless style of London. From classic streetwear to modern 
wardrobe essentials, our collection blends elegance, comfort, 
and contemporary design. At our store, we bring you carefully 
selected outfits, everyday fashion pieces, and seasonal styles 
crafted to elevate your look and express your individuality with 
confidence and effortless style every day.{" "}
</p>

<button><span>DISCOVER NOW</span></button>

</section>

<img 
loading="lazy"
className="imgAbout" 
alt=""
src="https://images.riverisland.com/image/upload/t_ProductImagePortraitSmall/f_auto/q_auto/932156_main?cf&$retina$"></img>

</main>

</div>

);

};

export default AboutHm;
