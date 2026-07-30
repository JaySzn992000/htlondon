import { useState, useEffect } from "react";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import axios from "axios";
import { FiHeart, FiX, FiZoomIn, FiStar, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "./WishList.css";

const WishList = () => {

const [wishlist, setWishlist] = useState([]);
const [productData, setProductData] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);
const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

useEffect(() => {
const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
setWishlist(storedWishlist);
}, []);

const handleRemove = (index) => {

const removedItem = wishlist[index];
const newWishlist = wishlist.filter((_, i) => i !== index);
setWishlist(newWishlist);
localStorage.setItem("wishlist", JSON.stringify(newWishlist));

let storedWishlistStatus =
JSON.parse(localStorage.getItem("wishlistStatus")) || {};
storedWishlistStatus[removedItem.id] = false;
localStorage.setItem("wishlistStatus", JSON.stringify(storedWishlistStatus));
window.dispatchEvent(new Event("storage"));
};

useEffect(() => {
const fetchProductData = async () => {
try {
const response = await axios.get(
"https://namasya.onrender.com/fetchProductslist"
);
setProductData(response.data);
} catch (error) {
console.log("Error fetching products:", error);
}
};
fetchProductData();
}, []);

const getProductImagePath = (productId) => {
const product = productData.find((p) => p.id === productId);
return product ? product.file_path : "";
};

const openQuickView = (item) => {
setSelectedProduct(item);
setIsQuickViewOpen(true);
document.body.style.overflow = "hidden";
};

const closeQuickView = () => {
setIsQuickViewOpen(false);
setSelectedProduct(null);
document.body.style.overflow = "auto";
};

useEffect(() => {
const handleEscape = (e) => {
if (e.key === "Escape") closeQuickView();
};
window.addEventListener("keydown", handleEscape);
return () => window.removeEventListener("keydown", handleEscape);
}, []);

const containerVariants = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: {
staggerChildren: 0.08,
},
},
};

const itemVariants = {
hidden: { opacity: 0, y: 30 },
visible: {
opacity: 1,
y: 0,
transition: {
duration: 0.6,
ease: [0.22, 1, 0.36, 1],
},
},
exit: {
opacity: 0,
scale: 0.95,
transition: {
duration: 0.3,
ease: [0.22, 1, 0.36, 1],
},
},
};

return (

<div className="wishlist-container">

<Navbar />

<div className="wishlist-wrapper">
{wishlist.length > 0 && (
<div className="wishlist-header">
<div className="wishlist-title-section">
<h2 className="wishlist-title">Saved Items</h2>
{/* <span className="wishlist-count">{wishlist.length}</span> */}
</div>
<p className="wishlist-subtitle">Your curated collection of favorites</p>
</div>
)}

<AnimatePresence>
{wishlist && wishlist.length > 0 ? (
<motion.div
className="wishlist-grid"
variants={containerVariants}
initial="hidden"
animate="visible">

{wishlist.map((item, index) => (
<motion.div
key={index}
variants={itemVariants}
exit="exit"
className="wishlist-item"
layout>

<div className="wishlist-item-inner">
<button
className="remove-item-btn"
onClick={() => handleRemove(index)}
aria-label="Remove from wishlist">
<FiX />
</button>

<div className="product-image-container">
<img
src={getProductImagePath(item.id)}
alt={item.name}
className="product-image"
loading="lazy"/>

<div className="product-overlay">
<button 
className="quick-view-btn"
onClick={() => openQuickView(item)}>

<FiZoomIn/>
<span>Quick View</span>
</button>
</div>
</div>

<div className="product-info">
<div className="product-name-brand">
<h3 className="product-name">{item.name}</h3>
<span className="product-brand">Exclusive</span>
</div>

<div className="product-pricing">
<span className="product-price">₹{item.price}</span>
</div>

<div className="product-status">
<span className="in-stock">
<span className="stock-indicator"></span>
In Stock
</span>
</div>
</div>
</div>
</motion.div>
))}
</motion.div>
) : (
<motion.div
className="empty-wishlist"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>

<div className="empty-wishlist-content">
<div className="empty-icon-wrapper">
<FiHeart className="empty-icon" />
</div>
<h1>Your wishlist is empty</h1>
<p>
Discover pieces that speak to you.<br />
Start building your collection.
</p>
<button className="explore-btn">Explore Collection</button>
</div>
</motion.div>
)}
</AnimatePresence>
</div>

<AnimatePresence>
{isQuickViewOpen && selectedProduct && (
<motion.div
className="quickview-overlay"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.3 }}
onClick={closeQuickView}>

<motion.div
className="quickview-modal"
initial={{ scale: 0.92, opacity: 0, y: 30 }}
animate={{ scale: 1, opacity: 1, y: 0 }}
exit={{ scale: 0.92, opacity: 0, y: 30 }}
transition={{ 
duration: 0.5,
ease: [0.22, 1, 0.36, 1]
}}
onClick={(e) => e.stopPropagation()}>

<button className="quickview-close" onClick={closeQuickView}>
<FiX />
</button>

<div className="quickview-content">
<div className="quickview-image-section">
<img
src={getProductImagePath(selectedProduct.id)}
alt={selectedProduct.name}
className="quickview-image"/>

<div className="quickview-badge">Exclusive</div>
</div>

<div className="quickview-details">
<div className="quickview-category">Clothing</div>

<h2 className="quickview-name">
{selectedProduct.name || "Navy Oversized Fit Stripe Rugby Polo Shirt"}
</h2>

<div className="quickview-price-section">
<span className="quickview-price">₹{selectedProduct.price || "1,499"}</span>
</div>

<div className="quickview-description">
<p>
{selectedProduct.description}
</p>
</div>

<button className="quickview-full-details">
View Full Details
<FiChevronRight />
</button>
</div>
</div>
</motion.div>
</motion.div>
)}
</AnimatePresence>

<div className="header-ad">
<Header />
</div>
</div>
);
};

export default WishList;