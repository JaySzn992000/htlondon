import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";  
import Filters from "../components/Filters";
import Navbar from "../headers_footer/navbar";
import axios from "axios";
import "./Categoriesfruits.css";
import Header from "../headers_footer/header";
import { addToCart } from "../action/action";
import FAqQuestions from "../components/FAqQuestions";


const Shorts = ({ showFilters = true, limit, addToCart }) => {

const [allProducts, setAllProducts] = useState([]); 
const [filteredProducts, setFilteredProducts] = useState([]);
const location = useLocation();
const query = new URLSearchParams(location.search).get("search"); 


useEffect(() => {
axios
.get("http://localhost:3001/fetchProductslistChilli")
.then((response) => {
console.log("Fetched Mangoes Pickles products:", response.data); 
setAllProducts(response.data); 
setFilteredProducts(
limit ? response.data.slice(0, limit) : response.data
);
})
.catch((error) => {
console.error("Error fetching Mangoes Pickles products:", error);
});
}, [] ); 

useEffect(() => {

if (query) {
axios
.get("http://localhost:3001/fetchProductslist", {
params: { search: query },
})
.then((response) => {
console.log("Fetched search results:", response.data); 
setAllProducts(response.data); 
setFilteredProducts(
limit ? response.data.slice(0, limit) : response.data
);
})
.catch((error) => {
console.error("Error fetching products with search query:", error);
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

setWishlistStatus({
...wishlistStatus,
[product.id]: !wishlistStatus[product.id],
});

setWishlistCount(wishlist.length);

const updatedWishlistStatus = {
...wishlistStatus,
[product.id]: !wishlistStatus[product.id],
};
localStorage.setItem(
"wishlistStatus",
JSON.stringify(updatedWishlistStatus)
);
setWishlistStatus(updatedWishlistStatus);
};

const slugify = (text) => {
return text
.toLowerCase()
.replace(/[^a-z0-9]+/g, '-')   
.replace(/(^-|-$)/g, '');      
};

useEffect(() => {
const cart = JSON.parse(localStorage.getItem("cart")) || [];
setCartCount(cart.length);
}, []);


const handleAddToCart = (product) => {

if (!product) return;

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const isProductInCart = cart.some(
(item) => String(item.id) === String(product.id)
);
if (isProductInCart) {
alert("This product is already in your cart.");
} else {
addToCart(product);
const updatedCart = [...cart, product];
localStorage.setItem("cart", JSON.stringify(updatedCart));
setCartCount(updatedCart.length);
alert("Product added to cart !");
}

};


return (

<div>

<Navbar wishlistCount={wishlistCount} cartCount={cartCount} />

<img className="ListBanner" src="https://www.kimirica.shop/cdn/shop/files/Valentine-Store-2025-Inner-Pages-BANNER-01.jpg?v=1768802129&width=1920"></img>

<Filters allProducts={allProducts} onFilterUpdate={handleFilterUpdate} />

<div id="sticky_products_height">

<div className="sticky-wrapper">

<section>
<div>

<div className="flex_productlist">
{filteredProducts.map((productlist) => (
<div key={productlist.id} className="produclist_divContainer">

<i
onClick={() => sendToWishlist(productlist)}
className={`fa fa-heart fa-heart_products ${
wishlistStatus[productlist.id] ? "wishlist-active" : ""
}`}
>
{" "}
</i>

<Link to={`/products/${slugify(productlist.name)}/${productlist.id}`}>
<img
src={productlist.file_path}
alt={productlist.name}
loading="lazy"
/>
</Link>

<div className="padding_contain">
<div className="flex_inr">

<Link to={`/products/${slugify(productlist.name)}/${productlist.id}`}>
<li>{productlist.name}</li>
</Link>

<div className="price_div">
<li className="fa fa-inr"></li>
<li className="fa_Price">{productlist.price}</li>
</div>

<div className="review_Cntnr">

<img
id="Review_Img"
src="https://cdn-icons-png.flaticon.com/128/15853/15853959.png"
/>

<li style={{ marginTop: ".5em", marginLeft: "-.2em" }}></li>
<li className="fa_Review">{productlist.review}</li>
</div>
</div>

<button
className="add_crt"
onClick={() => handleAddToCart(productlist)}
>
<span>ADD TO CART</span>
</button>

</div>

</div>
))}
</div>

</div>
</section>

</div>

</div>

<FAqQuestions></FAqQuestions>

<Header></Header>

</div>

);

};

export default connect(null, { addToCart })(Shorts);