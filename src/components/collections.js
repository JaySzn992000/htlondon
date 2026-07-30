import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../headers_footer/navbar";
import FAqQuestions from "./FAqQuestions";
import Filters from "./Filters";
import { connect } from "react-redux";
import { addToCart } from "../action/action";
import axios from "axios";
import "./ProductListmodule.css";
import Header from "../headers_footer/header";

const Collections = ({ addToCart }) => {

const [filteredProducts, setFilteredProducts] = useState([]);
const [allProducts, setAllProducts] = useState([]);
const [wishlistCount, setWishlistCount] = useState(0);
const [wishlistStatus, setWishlistStatus] = useState({});
const [cartCount, setCartCount] = useState(0);
const [hoveredProduct, setHoveredProduct] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [isLoading, setIsLoading] = useState(true);
const [quickViewProduct, setQuickViewProduct] = useState(null);
const [preventNavigation, setPreventNavigation] = useState(false);
const productsPerPage = 10;
const quickViewTimeoutRef = useRef(null);

const location = useLocation();
const query = new URLSearchParams(location.search).get("search");
useEffect(() => {
const syncWishlistStatus = () => {
const updatedWishlistStatus = JSON.parse(localStorage.getItem("wishlistStatus")) || {};
setWishlistStatus(updatedWishlistStatus);
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
setWishlistCount(wishlist.length);
};

window.addEventListener("storage", syncWishlistStatus);
syncWishlistStatus();
return () => window.removeEventListener("storage", syncWishlistStatus);
}, []);

useEffect(() => {
const cart = JSON.parse(localStorage.getItem("cart")) || [];
setCartCount(cart.length);
}, []);

useEffect(() => {
setIsLoading(true);
axios
.get("https://namasya.onrender.com/fetchProductslist")
.then((res) => {
setAllProducts(res.data);
setFilteredProducts(res.data);
setIsLoading(false);
})
.catch((err) => {
console.error(err);
setIsLoading(false);
});
}, []);

useEffect(() => {
if (query) {
axios
.get("https://namasya.onrender.com/fetchProductslist", { params: { search: query } })
.then((response) => {
setAllProducts(response.data);
setFilteredProducts(response.data);
})
.catch((error) => console.error(error));
} else {
axios
.get("https://namasya.onrender.com/fetchProductslist")
.then((response) => {
setAllProducts(response.data);
setFilteredProducts(response.data);
})
.catch((error) => console.error(error));
}
}, [query]);

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

const showNotification = (message, type = "success") => {
const notification = document.createElement("div");
notification.className = `premium-notification ${type}`;
notification.textContent = message;
document.body.appendChild(notification);
setTimeout(() => {
notification.classList.add("fade-out");
setTimeout(() => notification.remove(), 300);
}, 2500);
};

const toggleWishlist = (product, e) => {
if (e) e.stopPropagation();
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const index = wishlist.findIndex((item) => item.id === product.id);

if (index === -1) {
wishlist.push(product);
showNotification("Added to wishlist ♡", "success");
} else {
wishlist.splice(index, 1);
showNotification("Removed from wishlist", "info");
}

localStorage.setItem("wishlist", JSON.stringify(wishlist));
window.dispatchEvent(new Event("storage"));

const updatedStatus = {
...wishlistStatus,
[product.id]: !wishlistStatus[product.id],
};
localStorage.setItem("wishlistStatus", JSON.stringify(updatedStatus));
setWishlistStatus(updatedStatus);
setWishlistCount(wishlist.length);
};

const handleFilterUpdate = (filtered) => {
setFilteredProducts(filtered);
setCurrentPage(1);
};

const slugify = (text) => {
return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

const openQuickView = (product, e) => {
if (e) {
e.preventDefault();
e.stopPropagation();
e.nativeEvent.stopImmediatePropagation();
}

setPreventNavigation(true);

if (quickViewTimeoutRef.current) {
clearTimeout(quickViewTimeoutRef.current);
}

setQuickViewProduct(product);
document.body.style.overflow = "hidden";

quickViewTimeoutRef.current = setTimeout(() => {
setPreventNavigation(false);
}, 500);
};

const closeQuickView = () => {
setQuickViewProduct(null);
document.body.style.overflow = "auto";
setPreventNavigation(false);
if (quickViewTimeoutRef.current) {
clearTimeout(quickViewTimeoutRef.current);
}
};

const handleLinkClick = (e, productId) => {
if (preventNavigation) {
e.preventDefault();
e.stopPropagation();
return false;
}
return true;
};

const indexOfLast = currentPage * productsPerPage;
const indexOfFirst = indexOfLast - productsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

const paginate = (page) => {
setCurrentPage(page);
window.scrollTo({ top: 0, behavior: "smooth" });
};

const SkeletonCard = () => (
<div className="skeleton-card">
<div className="skeleton-image"></div>
<div className="skeleton-text"></div>
<div className="skeleton-text short"></div>
</div>
);

return (

<div className="collections-premium">

<Navbar wishlistCount={wishlistCount} cartCount={cartCount} />

<div className="ultra-hero">
<div className="hero-backdrop"></div>

{/* <img
className="hero-banner-ultra"
src="https://cdn.shopify.com/s/files/1/0420/7073/7058/files/shop_your_size2_1.jpg?v=1773041954"
alt="Collection"/> */}

<div className="hero-content-ultra">
<span className="hero-badge">✦ 2026 COLLECTION</span>
<h1 className="hero-title-ultra">
<span className="title-line">ELEVATE</span>
<span className="title-line gradient-text">YOUR STYLE</span>
</h1>
<p className="hero-subtitle-ultra">Discover the essence of luxury fashion</p>
<div className="hero-cta">
<button className="hero-btn-primary">Explore Now</button>
<button className="hero-btn-secondary">View Lookbook</button>
</div>
</div>
</div>

<div className="category-strip">
<div className="category-scroll">
{['All', 'New Arrivals', 'Best Sellers', 'Premium', 'Limited', 'Sale'].map((cat, i) => (
<button key={i} className={`category-pill ${i === 0 ? 'active' : ''}`}>
{cat}
</button>
))}
</div>
</div>

<Filters allProducts={allProducts} onFilterUpdate={handleFilterUpdate} />

<div className="results-bar">
<span className="results-count">{filteredProducts.length} Products</span>
</div>

<div className="product-grid-container">
{isLoading ? (
<div className="flex_productlist">
{[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
</div>
) : (
<>
<div className="flex_productlist">
{currentProducts.map((product, index) => (
<div
key={product.id}
className="product-card"
style={{ '--delay': `${index * 0.05}s` }}
onMouseEnter={() => setHoveredProduct(product.id)}
onMouseLeave={() => setHoveredProduct(null)} >
<div className="card-badges">
{product.discount && <span className="badge-sale">SALE</span>}
{product.isNew && <span className="badge-new">NEW</span>}
</div>

<button
className={`wishlist-btn-premium ${wishlistStatus[product.id] ? 'active' : ''}`}
onClick={(e) => toggleWishlist(product, e)}>
<i className={`fa ${wishlistStatus[product.id] ? 'fa-heart' : 'fa-heart-o'}`}></i>
<span className="wishlist-tooltip">
{wishlistStatus[product.id] ? 'Remove from Wishlist' : 'Add to Wishlist'}
</span>
</button>

<Link
to={`/products/${slugify(product.name)}/${product.id}`}
onClick={(e) => handleLinkClick(e, product.id)}
style={{ display: 'block', textDecoration: 'none' }} >
<div className="product-image-wrapper">
<img
src={product.file_path}
alt={product.name}
loading="lazy"
className="product-image"/>
</div>
</Link>

{hoveredProduct === product.id && (
<div 
className="image-overlay"
onClick={(e) => e.stopPropagation()}>
<div className="overlay-buttons">
<button
className="overlay-btn quick-view-btn"
onClick={(e) => {
e.preventDefault();
e.stopPropagation();
openQuickView(product, e);
}}>
<i className="fa fa-eye"></i> Quick View
</button>
<button
className="overlay-btn add-cart-btn"
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

<div className="product-info">
<Link 
to={`/products/${slugify(product.name)}/${product.id}`} 
className="product-link"
onClick={(e) => handleLinkClick(e, product.id)}>
<h3 className="product-name">{product.name}</h3>
</Link>
<div className="price-row">
<span className="price-current">₹{product.price}</span>
{product.originalPrice && (
<span className="price-original">₹{product.originalPrice}</span>
)}
</div>
{product.colors && product.colors.length > 0 && (
<div className="color-row">
<span className="color-label">Colors</span>
<div className="color-dots">
{product.colors.slice(0, 3).map((color, i) => (
<span key={i} className="color-dot" style={{ backgroundColor: color }} />
))}
{product.colors.length > 3 && (
<span className="color-more">+{product.colors.length - 3}</span>
)}
</div>
</div>
)}
</div>
</div>
))}
</div>

{totalPages > 1 && (
<div className="pagination">
<button
className="page-btn"
onClick={() => paginate(currentPage - 1)}
disabled={currentPage === 1}>
<i className="fa fa-chevron-left"></i>
</button>
{[...Array(totalPages)].map((_, i) => (
<button
key={i}
className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
onClick={() => paginate(i + 1)}
>
{String(i + 1).padStart(2, '0')}
</button>
))}
<button
className="page-btn"
onClick={() => paginate(currentPage + 1)}
disabled={currentPage === totalPages}>
<i className="fa fa-chevron-right"></i>
</button>
</div>
)}

</>
)}
</div>

{quickViewProduct && (
<div className="quick-view-modal" onClick={closeQuickView}>
<div className="quick-view-content" onClick={(e) => e.stopPropagation()}>
<button className="quick-view-close" onClick={closeQuickView}>
<i className="fa fa-times"></i>
</button>
<div className="quick-view-body">
<div className="quick-view-image">
<img src={quickViewProduct.file_path} alt={quickViewProduct.name} />
</div>
<div className="quick-view-details">
<span className="quick-view-brand">✦ PREMIUM COLLECTION</span>
<h2 className="quick-view-title">{quickViewProduct.name}</h2>
<div className="quick-view-price">
<span className="quick-view-current">₹{quickViewProduct.price}</span>
{quickViewProduct.originalPrice && (
<span className="quick-view-original">₹{quickViewProduct.originalPrice}</span>
)}
</div>
<div className="quick-view-rating">
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star-half-o"></i>
<span>(124 reviews)</span>
</div>
<p className="quick-view-desc">
{quickViewProduct.description || "Experience the perfect blend of style and comfort with this premium piece. Crafted with attention to every detail, this product embodies sophistication and modern elegance."}
</p>
{quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
<div className="quick-view-colors">
<span className="qv-color-label">Colors</span>
<div className="qv-color-dots">
{quickViewProduct.colors.map((color, i) => (
<span key={i} className="qv-color-dot" style={{ backgroundColor: color }} />
))}
</div>
</div>
)}
<div className="quick-view-actions">
<button
className="qv-add-cart"
onClick={(e) => {
handleAddToCart(quickViewProduct, e);
closeQuickView();
}}>
<i className="fa fa-shopping-bag"></i> Add to Cart
</button>
<button
className={`qv-wishlist ${wishlistStatus[quickViewProduct.id] ? 'active' : ''}`}
onClick={(e) => {
toggleWishlist(quickViewProduct, e);
}}>
<i className={`fa ${wishlistStatus[quickViewProduct.id] ? 'fa-heart' : 'fa-heart-o'}`}></i>
</button>
</div>
<Link
to={`/products/${slugify(quickViewProduct.name)}/${quickViewProduct.id}`}
className="qv-view-details"
onClick={closeQuickView}>
View Full Details →
</Link>
</div>
</div>
</div>
</div>
)}
<FAqQuestions />
<Header />
</div>
);
};

export default connect(null, { addToCart })(Collections);