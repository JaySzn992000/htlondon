import { useNavigate, useLocation } from "react-router-dom";
import Search from "../Images_ToolsSymbols/search_icon.png";
import LogoNitiArya from "../Logo/LogoNitiArya.png";
import Heart from "../Images_ToolsSymbols/Heart.jpg";
import User from "../Images_ToolsSymbols/user.jpg";
import Cart from "../Images_ToolsSymbols/Cart.jpg";
import Bars from "../Images_ToolsSymbols/Bars.png";
import eyeliner from "../Slider/eyeliner.png";
import compact from "../Slider/compact.png";
import facilnav from "../Slider/facilnav.png";
import lipstick from "../Slider/lipstick.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
}, []);

useEffect(() => {
if (location.state && location.state.loggedInUser) {
const user = location.state.loggedInUser;
setLoggedInUser(user);
localStorage.setItem("loggedInUser", JSON.stringify(user));
}
}, [location.state]);

useEffect(() => {
const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
setWishlistCount(storedWishlist.length);
}, [location]);

const navigateEcart = () => {
navigate("/Ecart");
};

const logout = () => {
setLoggedInUser(null);
localStorage.removeItem("loggedInUser");
navigate("/collections");
};

const navi = useNavigate();
const naviProductPage = () => navi("/collections");
const naviToStoreBrand = () => navi("/collections");
const naviProductFashWash = () => navi("/t-shirts");
const profileNavi = useNavigate();
const naviReg = useNavigate();

const naviRegist = () => {
if (!loggedInUser) {
naviReg("/Registeration");
} else if (loggedInUser) {
profileNavi("/Profile");
}
};

const navigateHome = () => navi("/");
const orderhistory = () => navi("/ItemHistory");
const heartNavi = () => navi("/WishList");
const naviGateTshirt = () => navi("/shirts");
const naviToTops = () => navi("/tops");
const naviGateShirt = () => navi("/jeans");
const naviGateJeans = () => navi("/trousers");
const naviToWomenJeans = () => navi("/women-jeans");
const naviToWomenTshirts = () => navi("/women-t-shirts");
const naviGatePants = () => navi("/shorts");
const naviToWomenAccessories = () => navi("/women-accessories");
const naviGateSweaters = () => navi("/accessories");
const naviGateSugar = () => navi("/streax");
const naviToBathBody = () => navi('/men');
const naviToShoes = () => navi('/shoes');
const naviToSkinCare = () => navi('/women');
const naviToMakeup = () => navi('/makeup');
const naviToPerfume = () => navi('/perfume');
const naviToLogin = () => navi('/Registeration');

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
setScrolled(window.scrollY > 0);
};
window.addEventListener("scroll", handleScroll);
return () => window.removeEventListener("scroll", handleScroll);
}, []);

const [afterSearch_prodct, setafterSearch_prodct] = useState(false);
const searchProducts = () => setafterSearch_prodct((prevState) => !prevState);

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
window.addEventListener("wishlistUpdated", updateWishlistCount);
return () => {
window.removeEventListener("storage", updateWishlistCount);
window.removeEventListener("wishlistUpdated", updateWishlistCount);
};
}, []);

const cart = useSelector((state) => state.cart);
const cartCount = cart.length;

const naviGateProductsAll = useNavigate();
const seeAllProducts = () => naviGateProductsAll('/collections');

return (

<div>

<nav className={`Product_navbar ${scrolled ? "scrolled" : ""}`}>
<ul className="nav_ul">
<img
onClick={clickOpen}
src={Bars}
className="fa fa-bars fa_bars_nav"
loading="lazy"
alt="Menu"/>

<img
onClick={navigateHome}
className="logo_img"
src={LogoNitiArya}
loading="lazy"
alt="NitiArya"/>

</ul>

<div className="nav_links_container">
<div className="div_ul">
<li className="hover_products">
<a onClick={naviToBathBody} href="javascript:void(0)">MEN</a>
<div className="listing_Products">
<ul>
<li onClick={naviProductFashWash}><a href="javascript:void(0)">T-Shirts</a></li>
<li onClick={naviGateTshirt}><a href="javascript:void(0)">Shirts</a></li>
<li onClick={naviGateShirt}><a href="javascript:void(0)">Jeans</a></li>
<li onClick={naviGateJeans}><a href="javascript:void(0)">Trousers</a></li>
<li onClick={naviGatePants}><a href="javascript:void(0)">Shorts</a></li>
<li onClick={naviGateSweaters}><a href="javascript:void(0)">Accessories</a></li>
</ul>
<ul>
<li onClick={naviProductPage}><img src={compact} alt="compact" /></li>
</ul>
<ul>
<li onClick={naviProductPage}><img src={eyeliner} alt="eyeliner" /></li>
</ul>
</div>
</li>
</div>

<div className="div_ul">
<li className="hover_products">
<a onClick={naviToSkinCare} href="javascript:void(0)">WOMEN</a>
<div className="listing_Products">
<ul>
<li onClick={naviToTops}><a href="javascript:void(0)">Tops</a></li>
<li onClick={naviToWomenJeans}><a href="javascript:void(0)">Women Jeans</a></li>
<li onClick={naviToWomenTshirts}><a href="javascript:void(0)">Women T-shirts</a></li>
<li onClick={naviToWomenAccessories}><a href="javascript:void(0)">Women Accessories</a></li>
</ul>
<ul>
<li onClick={naviProductPage}><img src={facilnav} alt="facilnav" /></li>
</ul>
<ul>
<li onClick={naviProductPage}><img src={lipstick} alt="lipstick" /></li>
</ul>
</div>
</li>
</div>

<div className="div_ul">
<li className="hover_products">
<a onClick={naviToShoes} href="javascript:void(0)">SHOES</a>
</li>
</div>

<div className="div_ul">
<li className="hover_products">
<a onClick={naviToStoreBrand} href="javascript:void(0)">COLLECTIONS</a>
</li>
</div>
</div>

<div className="fa_barsLogo_Container">
<div className="flex_nav_ProfileSection">
<ul className="nav_profileSection">
<div className="icon-wrapper">
<img
src={Heart}
onClick={heartNavi}
className="navProfile_img fa fa-heart"
alt="Wishlist"/>
{wishlistCount > 0 && (
<span className="wishlist-count">{wishlistCount}</span>
)}
</div>

<div className="icon-wrapper">
<img
onClick={naviRegist}
className="navProfile_img user_right fa fa-user"
src={User}
alt="User"/>
</div>
</ul>

<div className="cart_bag">
<div className="icon-wrapper">
<img
src={Cart}
onClick={navigateEcart}
className="fa fa-shopping-cart navProfile_img"
alt="Cart"/>
{cartCount > 0 && <span className="cart-count">{cartCount}</span>}
</div>
</div>

<ul>
<li className="navProfile_"></li>
</ul>

<input
type="text"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
onKeyDown={handleKeyDown}
className={`search_products ${afterSearch_prodct ? "afterSearch_prodct" : ""}`}
placeholder="Search Our Product"/>

<img
src={Search}
onClick={searchProducts}
className="fa fa-search search-icon"
alt="Search"/>
</div>
</div>

<div>
<ul className="navProduct_Slider">
<div>
<div className="flex_div_prfle">
<img
src="https://cdn-icons-png.flaticon.com/128/2997/2997911.png"
onClick={CloseTag}
id="CloseTag"
alt="Close"
loading="lazy"/>
</div>

<div className="flex_div_prfle">
<div className="flex_icon_">
<li onClick={seeAllProducts}>
<a href="javascript:void(0)">COLLECTIONS</a>
</li>
</div>

<div className="flex_icon_ storeBrand">
<li onClick={() => toggleMenu("store")}>
<a href="javascript:void(0)">STORE BRAND</a>
</li>
<section className={`storeBrand_dropdown ${openMenu.store ? "open" : ""}`}>
<li onClick={naviToBathBody}><a href="javascript:void(0)">MEN</a></li>
<li onClick={naviProductFashWash}><a href="javascript:void(0)">T-SHIRTS</a></li>
<li onClick={naviGateTshirt}><a href="javascript:void(0)">SHIRTS</a></li>
<li onClick={naviGateShirt}><a href="javascript:void(0)">JEANS</a></li>
<li onClick={naviGateJeans}><a href="javascript:void(0)">TROUSERS</a></li>
<li onClick={naviGatePants}><a href="javascript:void(0)">SHORTS</a></li>
<li onClick={naviGateSweaters}><a href="javascript:void(0)">ACCESSORIES</a></li>
</section>
</div>

<div className="flex_icon_ storeBrand">
<li onClick={() => toggleMenu("bath")}>
<a href="javascript:void(0)">WOMEN COLLECTIONS</a>
</li>
<section className={`storeBrand_dropdown ${openMenu.bath ? "open" : ""}`}>
<li onClick={naviToSkinCare}><a href="javascript:void(0)">WOMEN</a></li>
<li onClick={naviToTops}><a href="javascript:void(0)">TOPS</a></li>
<li onClick={naviToWomenJeans}><a href="javascript:void(0)">WOMEN JEANS</a></li>
<li onClick={naviToWomenTshirts}><a href="javascript:void(0)">WOMEN T-SHIRTS</a></li>
<li onClick={naviToWomenAccessories}><a href="javascript:void(0)">WOMEN ACCESSORIES</a></li>
</section>
</div>

<div className="flex_icon_ storeBrand">
<li onClick={naviToShoes}>
<a href="javascript:void(0)">SHOES</a>
</li>
</div>

{loggedInUser && (
<div className="flex_icon_">
<li onClick={orderhistory}>
<a href="javascript:void(0)">ORDER HISTORY</a>
</li>
</div>
)}

{loggedInUser ? (
<div className="sign_out flex_icon_ div_log_signout">
<li onClick={logout}>
<a href="javascript:void(0)">LOG OUT</a>
</li>
</div>
) : (
<div className="flex_icon_ div_log_signout">
<li onClick={naviToLogin}>
<a href="javascript:void(0)">LOG IN</a>
</li>
</div>
)}
</div>
</div>
</ul>
</div>
</nav>
</div>

);
};

export default Navbar;