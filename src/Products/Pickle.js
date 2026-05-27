import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";
import Navbar from "../headers_footer/navbar";
import axios from "axios";
import { connect } from "react-redux";
import { addToCart } from "../action/action";
import "./Pickle.css";

const Pickle = ({ showFilters = true, limit, addToCart}) => {

const [allProducts, setAllProducts] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);
const location = useLocation();
const query = new URLSearchParams(location.search).get("search");

useEffect(() => {
axios
.get("https://namasya.onrender.com/fetchProductslist")
.then((response) => {
setAllProducts(response.data);
setFilteredProducts(limit ? response.data.slice(0, limit) : response.data);
})
.catch((error) => {
console.error("Error fetching products:", error);
});
}, []);

useEffect(() => {
if (query) {
axios
.get("https://namasya.onrender.com/fetchProductslist", {
params: { search: query },
})
.then((response) => {
setAllProducts(response.data);
setFilteredProducts(limit ? response.data.slice(0, limit) : response.data);
})
.catch((error) => {
console.error("Error with search query:", error);
});
} else {
setFilteredProducts(allProducts);
}
}, [query, allProducts]);

const handleFilterUpdate = (filteredData) => {
setFilteredProducts(filteredData);
};

const limitedProducts = filteredProducts.slice(0, limit);

const [wishlistStatus, setWishlistStatus] = useState({});
const [wishlistCount, setWishlistCount] = useState(0);
const [cartCount, setCartCount] = useState(0);
const [cartItems, setCartItems] = useState([]);

useEffect(() => {
const cart = JSON.parse(localStorage.getItem("cart")) || [];
setCartCount(cart.length);
}, []);

const sendToWishlist = (product) => {
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const productIndex = wishlist.findIndex((item) => item.id === product.id);

if (productIndex === -1) {
wishlist.push(product);
} else {
wishlist.splice(productIndex, 1);
}

localStorage.setItem("wishlist", JSON.stringify(wishlist));
window.dispatchEvent(new Event("storage"));

const updatedWishlistStatus = {
...wishlistStatus,
[product.id]: !wishlistStatus[product.id],
};
setWishlistStatus(updatedWishlistStatus);
localStorage.setItem("wishlistStatus", JSON.stringify(updatedWishlistStatus));
setWishlistCount(wishlist.length);
};

useEffect(() => {
const storedWishlistStatus =
JSON.parse(localStorage.getItem("wishlistStatus")) || {};

setWishlistStatus(storedWishlistStatus);

const wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

setWishlistCount(wishlist.length);
}, []);

return (

<div>

{showFilters && <Navbar />}
{showFilters && (
<Filters allProducts={allProducts} onFilterUpdate={handleFilterUpdate} />
)}

<div id="products_grid_wrapper">
<section>
<div className="product_grid_container">
<div className="filter_spacing_div"></div>
<div className="product_cards_wrapper">
{limitedProducts.map((product, index) => (
<div key={index} className="single_product_card">

<i
onClick={() => sendToWishlist(product)}
className={`fa fa-heart fa-heart_Pickle wishlist_icon ${
wishlistStatus[product.id] ? "active_wishlist" : ""
}`}
/>

<Link to={`/product/${product.id}`}>
<img
src={product.file_path}
alt={product.name}
className="product_image"
/>
</Link>

<div className="product_info_container">
<div className="info_inner">
<Link to={`/product/${product.id}`}>
<li className="product_title">{product.name}</li>
</Link>

<div className="price_section">
<li className="fa fa-inr price_icon"></li>
<li className="product_price">{product.price}</li>
</div>

</div>
</div>
</div>
))}
</div>
</div>
</section>
</div>

</div>

);
};

export default connect(null, { addToCart })(Pickle);
