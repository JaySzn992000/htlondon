import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "../Images_ToolsSymbols/search_icon.png";
import LogoNitiArya from "../Logo/LogoNitiArya.png";
import Heart from "../Images_ToolsSymbols/Heart.jpg";
import User from "../Images_ToolsSymbols/user.jpg";
import Cart from "../Images_ToolsSymbols/Cart.jpg";
import Bars from "../Images_ToolsSymbols/Bars.png";
import eyeliner from "../Slider/eyeliner.png"
import compact from "../Slider/compact.png"
import facilnav from "../Slider/facilnav.png"
import lipstick from "../Slider/lipstick.png"
import { useState, useEffect } from "react";
import "./navbar.css";

const Navbar = () => {

const [loggedInUser, setLoggedInUser] = useState(null);
const navigate = useNavigate();
const location = useLocation();

const isDarkNavbarPage = location.pathname !== "/";

const [openMenu, setOpenMenu] = useState({
store: false,
bath: false,
skincare: false,
collections: false,
});

const toggleMenu = (key) => {
setOpenMenu(prev => ({
...prev,
[key]: !prev[key]
}));
};

useEffect(() => {
const storedUser = localStorage.getItem("loggedInUser");
if (storedUser) {
setLoggedInUser(JSON.parse(storedUser));
}
}, [] );

useEffect(() => {
if (location.state && location.state.loggedInUser) {
const user = location.state.loggedInUser;
setLoggedInUser(user);
localStorage.setItem("loggedInUser", JSON.stringify(user));
}
}, [location.state] );

useEffect(() => {
const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
setWishlistCount(storedWishlist.length);
}, [location] );

const navigateEcart = () => {
navigate("/Ecart");
};

const logout = () => {
setLoggedInUser(null);
localStorage.removeItem("loggedInUser");
navigate("/collections");
};

const navi = useNavigate();

const naviProductPage = () => {
navi("/collections");
};


const naviToStoreBrand = () => {
navi("/collections");
};

const naviProductFashWash = () => {
navi("/t-shirts")
}

const profileNavi = useNavigate();

const naviReg = useNavigate();
const naviRegist = () => {
if (!loggedInUser) {
naviReg("/Registeration");
} else if (loggedInUser) {
profileNavi("/Profile");
}

};


const navigateHome = () => {
navi("/");
};

const orderhistory = () => {
navi("/ItemHistory");
};

const heartNavi = () => {
navi("/WishList");
};

const naviGateTshirt = () => {
navi("/shirts");
};

const naviToTops = () => {
navi("/tops");
};


const naviGateShirt = () => {
navi("/jeans");
};

const naviGateJeans = () => {
navi("/trousers");
};

const naviToWomenJeans = () => {
navi("/women-jeans");
};

const naviToWomenTshirts = () => {
navi("/women-t-shirts");
};

const naviGatePants = () => {
navi("/shorts");
};

const naviToWomenAccessories = () => {
navi("/women-accessories");
};

const naviGateSweaters = () => {
navi("/accessories");
};

const naviGateSugar = () => {
navi("/streax");
};

const naviToBathBody = () => {
navi('/men')
}

const naviToShoes = () => {
navi('/shoes')
}

const naviToSkinCare = () => {
navi('/women')
}

const naviToMakeup = () => {
navi('/makeup')
}

const naviToPerfume = () => {
navi('/perfume')
}

const naviToLogin = () => {
navi('/Registeration')
}

const clickOpen = () => {
const slider = document.querySelector(".navProduct_Slider");

if (slider.classList.contains("close")) {
slider.classList.remove("close");
}
slider.classList.add("active");
};

const CloseTag = () => {
const slider = document.querySelector(".navProduct_Slider");

if (slider.classList.contains("active")) {
slider.classList.remove("active");
}

slider.classList.add("close");

};

const [scrolled, setScrolled] = useState(false);

useEffect(() => {
const handleScroll = () => {
if (window.scrollY > 0) {
setScrolled(true);
} else {
setScrolled(false);
}
};

window.addEventListener("scroll", handleScroll);
return () => {
window.removeEventListener("scroll", handleScroll);
};
}, [] );

const [afterSearch_prodct, setafterSearch_prodct] = useState(false);
const searchProducts = () => {
setafterSearch_prodct((prevState) => !prevState);
};

const [searchQuery, setSearchQuery] = useState("");

const handleKeyDown = (e) => {
if (e.key === "Enter") {
navigate(`/collections?search=${encodeURIComponent(searchQuery)}`);
}
};

const [wishlistCount, setWishlistCount] = useState(0);
useEffect(() => {

const updateWishlistCount = () => {
const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
setWishlistCount(storedWishlist.length);
};

updateWishlistCount();

window.addEventListener("storage", updateWishlistCount);

return () => {
window.removeEventListener("storage", updateWishlistCount);
window.addEventListener("wishlistUpdated", updateWishlistCount);
};
}, [] );

const cart = useSelector((state) => state.cart);
const cartCount = cart.length;

const naviGateProductsAll = useNavigate()
const seeAllProducts = () => {
naviGateProductsAll('/collections')
}


return (

<div>

<nav className={`Product_navbar ${scrolled ? "scrolled" : ""}`}>

{/* 1ND NAV */}

<ul className="nav_ul">

<img
onClick={clickOpen}
src={Bars}
className="fa fa-bars fa_bars_nav"
loading="lazy"
alt=""
></img>

<img onClick={navigateHome}
className="logo_img" src={LogoNitiArya}
loading="lazy"
alt=""
></img>

{/* 2ND HOVER */}

<div className="div_ul">

<li className="hover_products">
<a onClick={naviToBathBody}  href="">MEN</a>

<div className="listing_Products">

<ul>
<li onClick={naviProductFashWash}>
<a href="">T-Shirts</a>
</li>
<li onClick={naviGateTshirt}>
<a href="">Shirts</a>
</li>
<li onClick={naviGateShirt}>
<a href="">Jeans</a>
</li>
<li onClick={naviGateJeans}>
<a href="">Trousers</a>
</li>
<li onClick={naviGatePants}>
<a href="">Shorts</a>
</li>
<li onClick={naviGateSweaters}>
<a href="">Accessories</a>
</li>
</ul>

<ul>
<li onClick={naviProductPage}>
<img src={compact}></img>
</li>
</ul>

<ul>
<li onClick={naviProductPage}>
<img src={eyeliner}></img>
</li>
</ul>

</div>

</li>

</div>

{/* 3RD HOVER */}

<div className="div_ul">

<li className="hover_products">
<a onClick={naviToSkinCare}  href="">WOMEN</a>
<div className="listing_Products">
<ul>

<li onClick={naviToTops}>
<a href="">Tops</a>
</li>

<li onClick={naviToWomenJeans}>
<a href="">Women Jeans</a>
</li>
<li onClick={naviToWomenTshirts}>
<a href="">Women T-shirts</a>
</li>
<li onClick={naviToWomenAccessories}>
<a href="">Women Accessories</a>
</li>
</ul>

<ul>
<li onClick={naviProductPage}>
<img src={facilnav}></img>
</li>
</ul>

<ul>
<li onClick={naviProductPage}>
<img src={lipstick}></img>
</li>
</ul>

</div>

</li>
</div>

{/* 4TH HOVER */}

<div className="div_ul">

<li className="hover_products">
<a onClick={naviToShoes}  href="">SHOES</a>
</li>
</div>

{/* 1ST HOVER */}

<div className="div_ul">

<li className="hover_products">
<a onClick={naviToStoreBrand}  href="">COLLECTIONS</a>
</li>

</div>

</ul>

<div className="fa_barsLogo_Container">

<div className="flex_nav_ProfileSection">

<ul className="nav_profileSection">

<img
src={Heart}
onClick={heartNavi}
className="navProfile_img fa fa-heart"
></img>

{wishlistCount > 0 && (
<span className="wishlist-count">{wishlistCount}</span>
)}

<img
onClick={naviRegist}
className="navProfile_img user_right fa fa-user"
src={User}
></img>

<ul>
<li onClick={naviRegist}>
</li>
</ul>

</ul>

<div className="cart_bag">

<img
src={Cart}
onClick={navigateEcart}
className="fa fa-shopping-cart navProfile_img"
></img>
{cartCount > 0 && <span className="cart-count">{cartCount}</span>}

<h5>Bag</h5>
</div>

<ul>
<li className="navProfile_">
</li>
</ul>


<input
type="text"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
onKeyDown={handleKeyDown}
className={`search_products ${
afterSearch_prodct ? "afterSearch_prodct" : ""
}`}
placeholder="Search Our Product"
/>

<img
src={Search}
onClick={searchProducts}
className="fa fa-search"
/>

<div>

<ul className="navProduct_Slider">

<div>

<div className="flex_div_prfle">

<img
src="https://cdn-icons-png.flaticon.com/128/2997/2997911.png"
onClick={CloseTag}
id="CloseTag"
alt=""
loading="lazy" />

</div>

<div className="flex_div_prfle">

<div className="flex_icon_">
<li onClick={seeAllProducts}>
<a href="">COLLECTIONS</a>
</li>
</div>

<div className="flex_icon_ storeBrand">

<li onClick={() => toggleMenu("store")}>
<a href="javascript:void(0)">STORE BRAND</a>
</li>

<section className={`storeBrand_dropdown ${openMenu.store ? "open" : ""}`}>
<li><a>M.A.C</a></li>
<li><a>Maybelline</a></li>
<li><a>L'Oréal Paris</a></li>
<li><a>Lakmé</a></li>
<li><a>Aroma</a></li>
<li><a>Sugar</a></li>
</section>

</div>

<div className="flex_icon_ storeBrand">

<li onClick={() => toggleMenu("bath")}>
<a href="javascript:void(0)">
BATH & BODY
</a>
</li>

<section className={`storeBrand_dropdown ${openMenu.bath ? "open" : ""}`}>
<li><a>Aloe Vera Gel</a></li>
<li><a>Banana Powder</a></li>
<li><a>Beetroot Powder</a></li>
<li><a>Kasturi Haldi</a></li>
</section>

</div>

<div className="flex_icon_ storeBrand">

<li onClick={() => toggleMenu("skincare")}>
<a href="javascript:void(0)">
SKINCARE
</a>
</li>

</div>

{loggedInUser && (
<div className="flex_icon_">
<li onClick={orderhistory}>
<a href="">ORDER HISTORY</a>
</li>
</div>
)}

{loggedInUser ? (

<div className="sign_out flex_icon_ div_log_signout">
<li onClick={logout}>
<a href="">Log Out</a>
</li>
</div>

) : (

<div className="flex_icon_ div_log_signout">
<li onClick={naviToLogin}>
<a href="">Log ln</a>
</li>
</div>

)}

</div>
</div>

</ul>
</div>
</div>

</div>

{/* 3nd NAV */}

</nav>

</div>

);

};

export default Navbar; 