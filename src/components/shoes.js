import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../headers_footer/navbar";
import FAqQuestions from "./FAqQuestions";
import Filters from "./Filters";
import { connect } from "react-redux";
import { addToCart } from "../action/action";
import axios from "axios";
import "./ProductListmodule.css";
import Header from "../headers_footer/header";

const Shoes = ({ addToCart}) => {

const [filteredProducts, setFilteredProducts] = useState([]);
const [allProducts, setAllProducts] = useState([]);
const [wishlistCount, setWishlistCount] = useState(0);
const [wishlistStatus, setWishlistStatus] = useState({});
const [cartCount, setCartCount] = useState(0);
const [arrayStore, setArrayStore] = useState([]);
const [products, setProducts] = useState([]);


useEffect(() => {

axios
.get("http://localhost:3001/fetchProductslist")
.then((res) => setProducts(res.data))
.catch((err) => console.error(err));
}, [] );


const handleAddToCart = (product) => {
if (!product) return;
const isProductInCart = JSON.parse(localStorage.getItem("cart"))?.some(
(item) => item.id === product.id
);
if (isProductInCart) {
alert("This product is already in your cart.");
} else {
addToCart(product);
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.push(product);
localStorage.setItem("cart", JSON.stringify(cart));
localStorage.setItem(`cart-added-${product.id}`, JSON.stringify(true));
alert("Product added to cart!");
}
};

useEffect(() => {
const storedWishlistStatus =
JSON.parse(localStorage.getItem("wishlistStatus")) || {};
setWishlistStatus(storedWishlistStatus);

axios
.get("http://localhost:3001/fetchProductslist")
.then((response) => {
setArrayStore(response.data);
setFilteredProducts(response.data);
})

.catch((error) => {
console.error("Error fetching data:", error);
});
}, [] );


const location = useLocation();
const query = new URLSearchParams(location.search).get("search");
useEffect(() => {
if (query) {
axios
.get("http://localhost:3001/fetchProductslist", {
params: { search: query },
})
.then((response) => {
setAllProducts(response.data);
setFilteredProducts(response.data);
})
.catch((error) => {
console.error("Error fetching products:", error);
});
} else {
axios
.get("http://localhost:3001/fetchProductslist")
.then((response) => {
setAllProducts(response.data);
setFilteredProducts(response.data);
})
.catch((error) => {
console.error("Error fetching all products:", error);
});
}
}, [query] );


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
} );

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

const handleFilterUpdate = (filtered) => {
setFilteredProducts(filtered);
};

const slugify = (text) => {
return text
.toLowerCase()
.replace(/[^a-z0-9]+/g, '-')   
.replace(/(^-|-$)/g, '');      
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
loading="lazy" />
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
src="https://cdn-icons-png.flaticon.com/128/15853/15853959.png"/>

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

export default connect(null, { addToCart })(Shoes);
