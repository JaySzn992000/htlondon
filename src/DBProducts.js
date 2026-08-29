import { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSlider from "./DashboardSlider";
import { useNavigate } from "react-router-dom";
import "./DBProducts.css";

function DBProducts() {

const [storeDB, setStoreDB] = useState([]);
const [totalProducts, setTotalProducts] = useState(0);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
const DbFetch = async () => {
try {
const response = await fetch("https://namasya.onrender.com/fetchDB");
const data = await response.json();
setStoreDB(data.products);
setTotalProducts(data.total);
} catch (error) {
console.error("Error message:", error);
}
};
DbFetch();
}, []);

const navigate = useNavigate();
useEffect(() => {
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
if (!isLoggedIn) {
navigate("/adminlogin");
}
}, [navigate]);

const [sidebarOpen, setSidebarOpen] = useState(true);
const [navContainer, setnavContainer] = useState(false);
const [RelativeDB_PRQuery, setRelativeDB_PRQuery] = useState(false);
const [DB_products_PRQuery, setDB_products_PRQuery] = useState(false);

const toggleSidebar = () => {
setSidebarOpen((prev) => !prev);
setnavContainer((prev) => !prev);
setRelativeDB_PRQuery((prev) => !prev);
setDB_products_PRQuery((prev) => !prev);
};

const filteredProducts = storeDB.filter(
(p) =>
p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
p.img?.toLowerCase().includes(searchTerm.toLowerCase()) ||
String(p.id).includes(searchTerm)
);

const totalValue = storeDB.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);

return (

<div>
<DashboardNav
toggleSidebar={toggleSidebar}
sidebarOpen={sidebarOpen}
navContainer={navContainer}
/>

<DashboardSlider sidebarOpen={sidebarOpen} />

<div
className={`RelativeDB_product ${
RelativeDB_PRQuery ? "RelativeDB_PRQuery-inside" : ""
}`}
>

<div
className={`DB_products_ ${
DB_products_PRQuery ? "DB_products_PRQuery-inside" : ""
}`}
>

<div className="stats-row">
<div className="stat-card">
<div className="stat-icon purple"><i className="fas fa-box"></i></div>
<div className="stat-info">
<div className="stat-label">Total Products</div>
<div className="stat-value">{totalProducts}</div>
</div>
<div className="stat-change up">
<i className="fas fa-arrow-up"></i> 12%
</div>
</div>
<div className="stat-card">
<div className="stat-icon blue"><i className="fas fa-check-circle"></i></div>
<div className="stat-info">
<div className="stat-label">Active Items</div>
<div className="stat-value">{filteredProducts.length}</div>
</div>
<div className="stat-change" style={{ color: "#4f46e5", background: "rgba(79,70,229,0.08)" }}>
<i className="fas fa-circle" style={{ fontSize: "0.4rem" }}></i> In stock
</div>
</div>
<div className="stat-card">
<div className="stat-icon orange"><i className="fas fa-tags"></i></div>
<div className="stat-info">
<div className="stat-label">Categories</div>
<div className="stat-value">12</div>
</div>
<div className="stat-change" style={{ color: "#f59e0b", background: "rgba(245,158,11,0.08)" }}>
<i className="fas fa-plus"></i> 4 new
</div>
</div>
<div className="stat-card">
<div className="stat-icon green"><i className="fas fa-wallet"></i></div>
<div className="stat-info">
<div className="stat-label">Total Value</div>
<div className="stat-value">
<span className="currency">₹</span>
{totalValue.toLocaleString()}
</div>
</div>
<div className="stat-change up">
<i className="fas fa-arrow-up"></i> 8.2%
</div>
</div>
</div>

<div className="table-header-actions">
<div className="search-wrap">
<i className="fas fa-search"></i>
<input
type="text"
placeholder="Search products..."
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
/>
{searchTerm && (
<button className="clear-search" onClick={() => setSearchTerm("")}>
<i className="fas fa-times"></i>
</button>
)}
</div>
<div className="action-buttons">
<button className="btn-outline">
<i className="fas fa-file-export"></i> Export
</button>
<button className="btn-primary">
<i className="fas fa-plus"></i> Add Product
</button>
</div>
</div>

<div className="table-wrapper">
<table className="product-table">
<thead>
<tr>
<th># ID</th>
<th>Product</th>
<th>Category</th>
<th>Name</th>
<th>Sizes</th>
<th>Price</th>
</tr>
</thead>
<tbody>
{filteredProducts.length === 0 ? (
<tr>
<td colSpan="6" className="empty-row">
<div className="empty-state">
<i className="fas fa-box-open"></i>
<p>No products found</p>
<span>Try adjusting your search</span>
</div>
</td>
</tr>
) : (
filteredProducts.map((product, index) => (
<tr key={index}>
<td data-label="# ID">
<span className="id-tag">#{product.id}</span>
</td>
<td data-label="Product">
{product.file_path ? (
<img
src={`https://namasya.onrender.com${product.file_path}`}
alt={product.name}
className="product-img"
/>
) : (
<div className="product-img-placeholder">
<i className="fas fa-image"></i>
</div>
)}
</td>
<td data-label="Category">
<span className="category-badge">{product.img || "N/A"}</span>
</td>
<td data-label="Name">
<span className="product-name-cell">{product.name}</span>
</td>
<td data-label="Sizes">
{product.sizes &&
product.sizes.split(",").map((size, i) => {
const colors = ["#eef2ff", "#fce7f3", "#d1fae5", "#fef3c7", "#e0e7ff"];
const textColors = ["#4f46e5", "#db2777", "#059669", "#d97706", "#4338ca"];

return (

<span
key={i}
className="size-badge"
style={{
backgroundColor: colors[i % colors.length],
color: textColors[i % textColors.length],
}}
>
{size.trim()}
</span>
);
})}
</td>
<td data-label="Price">
<span className="price-cell">₹ {product.price}</span>
</td>
</tr>
))
)}
</tbody>
</table>
</div>
</div>
</div>
</div>

);
}

export default DBProducts;