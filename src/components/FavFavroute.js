import Navbar from "../headers_footer/navbar";
import BiotiqueFavroute from "../Slider/biotique1.png";
import BiotiqueFavrouteTwo from "../Slider/biotique2.png";
import "./FavFavroute.css";

const FavFavroute = () => {

return (

<div>

<Navbar></Navbar>

<div className="Fav_Trending">

<h1>TREDNING CLOTHING</h1>
<div className="FavFavroute_flex_hm">
<section>

<img 
loading="lazy"
className="imgAbout" 
alt=""
src="https://images.riverisland.com/image/upload/t_plp_portraitLarge/f_auto/q_auto/054ECOM26_WK10_MW_CONTENT_BOXES-2-L.jpg?_a=BATAV5AA0"></img>

</section>

<section>

<img 
loading="lazy"
className="imgAbout" 
alt=""
src="https://images.riverisland.com/image/upload/t_ProductImagePortraitLarge/f_auto/q_auto/374850_main"></img>

</section>

<section>

<img 
loading="lazy"
className="imgAbout" 
alt=""
src="https://images.riverisland.com/image/upload/t_ProductImagePortraitSmall/f_auto/q_auto/373333_rollover?_a=BATAV5AA0"></img>

</section>

<section>

<img 
loading="lazy"
className="imgAbout" 
alt=""
src="https://images.riverisland.com/image/upload/t_ProductImagePortraitSmall/f_auto/q_auto/374893_main?cv&$retina$"></img>

</section>
</div>

</div>

</div>

);

};

export default FavFavroute;
