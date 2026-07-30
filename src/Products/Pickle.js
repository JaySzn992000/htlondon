import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";
import axios from "axios";
import { connect } from "react-redux";
import { addToCart } from "../action/action";
import "./Pickle.css";

const Pickle = ({ showFilters = true, limit, addToCart }) => {

const [allProducts, setAllProducts] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);
const [wishlistStatus, setWishlistStatus] = useState({});
const [wishlistCount, setWishlistCount] = useState(0);
const [cartCount, setCartCount] = useState(0);
const [loading, setLoading] = useState(true);
const [hoveredProduct, setHoveredProduct] = useState(null);
const [quickViewProduct, setQuickViewProduct] = useState(null);
const [showQuickView, setShowQuickView] = useState(false);

const location = useLocation();
const query = new URLSearchParams(location.search).get("search");

useEffect(() => {
setLoading(true);
axios
.get("https://namasya.onrender.com/fetchProductslist")
.then((response) => {
setAllProducts(response.data);
const products = limit ? response.data.slice(0, limit) : response.data;
setFilteredProducts(products);
setLoading(false);
})
.catch((error) => {
console.error("Error fetching products:", error);
setLoading(false);
});
}, [limit]);

useEffect(() => {
if (query) {
setLoading(true);
axios
.get("https://namasya.onrender.com/fetchProductslist", {
params: { search: query },
})
.then((response) => {
setAllProducts(response.data);
const products = limit ? response.data.slice(0, limit) : response.data;
setFilteredProducts(products);
setLoading(false);
})
.catch((error) => {
console.error("Error with search query:", error);
setLoading(false);
});
} else {
setFilteredProducts(allProducts);
}
}, [query, allProducts, limit]);

useEffect(() => {
const storedWishlistStatus = JSON.parse(localStorage.getItem("wishlistStatus")) || {};
setWishlistStatus(storedWishlistStatus);
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
setWishlistCount(wishlist.length);
}, []);

useEffect(() => {
const cart = JSON.parse(localStorage.getItem("cart")) || [];
setCartCount(cart.length);
}, []);

const handleFilterUpdate = (filteredData) => {
setFilteredProducts(filteredData);
};

const sendToWishlist = (product, e) => {
if (e) e.stopPropagation();
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const productIndex = wishlist.findIndex((item) => item.id === product.id);

if (productIndex === -1) {
wishlist.push(product);
showNotification("Added to wishlist ♡", "success");
} else {
wishlist.splice(productIndex, 1);
showNotification("Removed from wishlist", "info");
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

const handleAddToCart = (product, e) => {
if (e) e.stopPropagation();
if (!product) return;

const isProductInCart = JSON.parse(localStorage.getItem("cart"))?.some(
(item) => item.id === product.id
);

if (isProductInCart) {
showNotification("Already in cart", "info");
} else {
addToCart(product);
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.push(product);
localStorage.setItem("cart", JSON.stringify(cart));
setCartCount(cart.length);
showNotification("Added to cart ✨", "success");
}
};

const openQuickView = (product, e) => {
if (e) {
e.preventDefault();
e.stopPropagation();
}
setQuickViewProduct(product);
setShowQuickView(true);
document.body.style.overflow = "hidden";
};

const closeQuickView = () => {
setShowQuickView(false);
setQuickViewProduct(null);
document.body.style.overflow = "auto";
};

const showNotification = (message, type = "success") => {
const notification = document.createElement("div");
notification.className = `pickle-notification ${type}`;
notification.textContent = message;
document.body.appendChild(notification);
setTimeout(() => {
notification.classList.add("pickle-fade-out");
setTimeout(() => notification.remove(), 300);
}, 2500);
};

const displayProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

const PickleSkeleton = () => (
<div className="pickle-skeleton-card">
<div className="pickle-skeleton-image"></div>
<div className="pickle-skeleton-text"></div>
<div className="pickle-skeleton-text short"></div>
</div>
);

return (

<div className="pickle-wrapper">

<div className="pickle-category-strip">
<div className="pickle-category-scroll">
{['All', 'New Arrivals', 'Best Sellers', 'Premium', 'Limited', 'Sale'].map((cat, i) => (
<button key={i} className={`pickle-category-pill ${i === 0 ? 'active' : ''}`}>
{cat}
</button>
))}
</div>
</div>

{showFilters && <Filters allProducts={allProducts} onFilterUpdate={handleFilterUpdate} />}

<div className="pickle-results-bar">
<span className="pickle-results-count">{displayProducts.length} Products</span>
</div>

<div className="pickle-grid-container">
{loading ? (
<div className="pickle-product-grid">
{[...Array(8)].map((_, i) => <PickleSkeleton key={i} />)}
</div>
) : (
<div className="pickle-product-grid">
{displayProducts.map((product, index) => (
<div
key={product.id}
className="pickle-product-card"
style={{ '--delay': `${index * 0.05}s` }}
onMouseEnter={() => setHoveredProduct(product.id)}
onMouseLeave={() => setHoveredProduct(null)} >
  
<div className="pickle-card-badges">
{product.discount && <span className="pickle-badge-sale">SALE</span>}
{product.isNew && <span className="pickle-badge-new">NEW</span>}
</div>

<button
className={`pickle-wishlist-btn ${wishlistStatus[product.id] ? 'active' : ''}`}
onClick={(e) => sendToWishlist(product, e)}>
<i className={`fa ${wishlistStatus[product.id] ? 'fa-heart' : 'fa-heart-o'}`}></i>
<span className="pickle-wishlist-tooltip">
{wishlistStatus[product.id] ? 'Remove from Wishlist' : 'Add to Wishlist'}
</span>
</button>

<Link to={`/product/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
<div className="pickle-image-wrapper">
<img
src={product.file_path}
alt={product.name}
loading="lazy"
className="pickle-product-image"/>
</div>
</Link>

{hoveredProduct === product.id && (
<div className="pickle-image-overlay" onClick={(e) => e.stopPropagation()}>
<div className="pickle-overlay-buttons">
<button
className="pickle-overlay-btn pickle-quick-view-btn"
onClick={(e) => {
e.preventDefault();
e.stopPropagation();
openQuickView(product, e);
}}>
<i className="fa fa-eye"></i> Quick View
</button>
<button
className="pickle-overlay-btn pickle-add-cart-btn"
onClick={(e) => {
e.preventDefault();
e.stopPropagation();
handleAddToCart(product, e);
}}>
<i className="fa fa-shopping-bag"></i> Add to Cart
</button>
</div>
</div>
)}

<div className="pickle-product-info">
<Link to={`/product/${product.id}`} className="pickle-product-link">
<h3 className="pickle-product-name">{product.name}</h3>
</Link>
<div className="pickle-price-row">
<span className="pickle-price-current">₹{product.price}</span>
{product.originalPrice && (
<span className="pickle-price-original">₹{product.originalPrice}</span>
)}
</div>
{product.colors && product.colors.length > 0 && (
<div className="pickle-color-row">
<span className="pickle-color-label">Colors</span>
<div className="pickle-color-dots">
{product.colors.slice(0, 3).map((color, i) => (
<span key={i} className="pickle-color-dot" style={{ backgroundColor: color }} />
))}
{product.colors.length > 3 && (
<span className="pickle-color-more">+{product.colors.length - 3}</span>
)}
</div>
</div>
)}
</div>
</div>
))}
</div>
)}
</div>

{showQuickView && quickViewProduct && (
<div className="pickle-quick-view-modal" onClick={closeQuickView}>
<div className="pickle-quick-view-content" onClick={(e) => e.stopPropagation()}>
<button className="pickle-quick-view-close" onClick={closeQuickView}>
<i className="fa fa-times"></i>
</button>

<div className="pickle-quick-view-body">
<div className="pickle-quick-view-image">
<img src={quickViewProduct.file_path} alt={quickViewProduct.name} />
</div>
<div className="pickle-quick-view-details">
<span className="pickle-quick-view-brand">✦ PREMIUM COLLECTION</span>
<h2 className="pickle-quick-view-title">{quickViewProduct.name}</h2>
<div className="pickle-quick-view-price">
<span className="pickle-quick-view-current">₹{quickViewProduct.price}</span>
{quickViewProduct.originalPrice && (
<span className="pickle-quick-view-original">₹{quickViewProduct.originalPrice}</span>
)}
</div>
<div className="pickle-quick-view-rating">
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star-half-o"></i>
<span>(124 reviews)</span>
</div>
<p className="pickle-quick-view-desc">
{quickViewProduct.description || "Experience the perfect blend of style and comfort with this premium piece. Crafted with attention to every detail, this product embodies sophistication and modern elegance."}
</p>
{quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
<div className="pickle-quick-view-colors">
<span className="pickle-qv-color-label">Colors</span>
<div className="pickle-qv-color-dots">
{quickViewProduct.colors.map((color, i) => (
<span key={i} className="pickle-qv-color-dot" style={{ backgroundColor: color }} />
))}
</div>
</div>
)}
<div className="pickle-quick-view-actions">
<button
className="pickle-qv-add-cart"
onClick={(e) => {
handleAddToCart(quickViewProduct, e);
closeQuickView();
}}>
<i className="fa fa-shopping-bag"></i> Add to Cart
</button>
<button
className={`pickle-qv-wishlist ${wishlistStatus[quickViewProduct.id] ? 'active' : ''}`}
onClick={(e) => {
sendToWishlist(quickViewProduct, e);
}}>
<i className={`fa ${wishlistStatus[quickViewProduct.id] ? 'fa-heart' : 'fa-heart-o'}`}></i>
</button>
</div>
<Link
to={`/product/${quickViewProduct.id}`}
className="pickle-qv-view-details"
onClick={closeQuickView}>
View Full Details →
</Link>
</div>
</div>
</div>
</div>
)}

</div>
);
};

export default connect(null, { addToCart })(Pickle);