import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Filters.css";

const Filters = ({ allProducts, onFilterUpdate }) => {

const [selectedNames, setSelectedNames] = useState([]);
const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(10000);
const [isPriceChanged, setIsPriceChanged] = useState(false);
const [filters_div, setfilters_div] = useState(false);

const navigate = useNavigate();
const location = useLocation();
const query = new URLSearchParams(location.search).get("search");

const categories = [

{ name: "All", icon: "✦" },
{ name: "T-Shirts", icon: "👕" },
{ name: "Shirts", icon: "👔" },
{ name: "Jeans", icon: "👖" },
{ name: "Trousers", icon: "👗" },
{ name: "Shorts", icon: "🩳" },

];

useEffect(() => {
if (query) {
const names = query.split(",").filter(n => n.trim());
setSelectedNames(names);
} else {
setSelectedNames([]); 
}
}, [query]);

useEffect(() => {
let filtered = [...allProducts];

if (selectedNames.length > 0) {
filtered = filtered.filter((product) => {
return selectedNames.some((name) => {
const productName = product.img?.toLowerCase() || "";
const categoryName = name.toLowerCase();
return productName.includes(categoryName);
});
});
}

if (isPriceChanged || minPrice > 0 || maxPrice < 10000) {
filtered = filtered.filter((product) => {
const price = Number(product.price) || 0;
return price >= minPrice && price <= maxPrice;
});
}

onFilterUpdate(filtered);
}, [minPrice, maxPrice, isPriceChanged, selectedNames, allProducts, onFilterUpdate]);

const handlePriceChange = () => setIsPriceChanged(true);

const handleCategoryClick = (categoryName) => {

if (categoryName === "All") {
setSelectedNames([]);
navigate(""); 
return;
}

setSelectedNames((prev) => {
let newNames;
if (prev.includes(categoryName)) {
newNames = prev.filter((n) => n !== categoryName);
} else {
newNames = [...prev, categoryName];
}

const newQuery = newNames.length > 0 
? `?search=${encodeURIComponent(newNames.join(","))}`
: "";
navigate(newQuery);
return newNames;
});
};

const ClickFilter = () => setfilters_div(true);
const FilterClose = () => setfilters_div(false);

const formatPrice = (price) => {
return new Intl.NumberFormat('en-IN', {
style: 'currency',
currency: 'INR',
minimumFractionDigits: 0,
maximumFractionDigits: 0,
}).format(price);
};

const clearAllFilters = () => {
setSelectedNames([]);
setMinPrice(0);
setMaxPrice(10000);
setIsPriceChanged(false);
navigate("");
};

return (

<div>

<div className="content_sticky">

<div id="div_filter">
<button onClick={ClickFilter} className="filter-trigger-btn">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<line x1="4" y1="6" x2="20" y2="6" />
<line x1="6" y1="12" x2="18" y2="12" />
<line x1="8" y1="18" x2="16" y2="18" />
<circle cx="10" cy="6" r="2" />
<circle cx="14" cy="12" r="2" />
<circle cx="12" cy="18" r="2" />
</svg>
<span>Filter</span>
<span className="filter-badge">
{selectedNames.length > 0 ? selectedNames.length : 0}
</span>
</button>
</div>

<div className={`filters ${filters_div ? "filters_AfContainer" : ""}`}>

<button className="filter-close-btn" onClick={FilterClose}>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<line x1="18" y1="6" x2="6" y2="18" />
<line x1="6" y1="6" x2="18" y2="18" />
</svg>
</button>

<div className="filter-header">
<h2 className="filter-title">Refine Your <span>Style</span></h2>
<p className="filter-subtitle">Find exactly what you're looking for</p>
</div>

<div className="filter-section">
<div className="section-header">
<span className="section-icon">💰</span>
<h4 className="section-title">Price Range</h4>
</div>

<div className="price-display">
<span className="price-min">{formatPrice(minPrice)}</span>
<span className="price-separator">—</span>
<span className="price-max">{formatPrice(maxPrice)}</span>
</div>

<div className="price-sliders">
<div className="slider-track">
<div 
className="slider-fill"
style={{
left: `${(minPrice / 10000) * 100}%`,
right: `${100 - (maxPrice / 10000) * 100}%`
}} />
</div>
<input
type="range"
min="0"
max="10000"
step="100"
value={minPrice}
onChange={(e) => {
const val = Number(e.target.value);
if (val <= maxPrice) {
setMinPrice(val);
handlePriceChange();
}
}}
className="price-slider price-slider-min"/>
<input
type="range"
min="0"
max="10000"
step="100"
value={maxPrice}
onChange={(e) => {
const val = Number(e.target.value);
if (val >= minPrice) {
setMaxPrice(val);
handlePriceChange();
}
}}
className="price-slider price-slider-max"/>
</div>
</div>

<div className="filter-section">
<div className="section-header">
<span className="section-icon">🏷️</span>
<h4 className="section-title">Collections</h4>
</div>

<div className="category-grid">
{categories.map((category) => {
const isActive = category.name === "All" 
? selectedNames.length === 0 
: selectedNames.includes(category.name);

return (

<button
key={category.name}
className={`category-chip ${isActive ? 'active' : ''}`}
onClick={() => handleCategoryClick(category.name)} >
<span className="chip-icon">{category.icon}</span>
<span className="chip-name">{category.name}</span>
{isActive && <span className="chip-check">✓</span>}
</button>
);
})}
</div>
</div>

{selectedNames.length > 0 && (
<div className="active-filters">
<span className="active-label">Active Filters</span>
<div className="active-tags">
{selectedNames.map((name) => (
<span key={name} className="active-tag">
{name}
<button 
className="tag-remove"
onClick={() => handleCategoryClick(name)}>
×
</button>
</span>
))}
<button className="clear-all" onClick={clearAllFilters}>
Clear All
</button>
</div>
</div>
)}

<button className="apply-filters-btn" onClick={FilterClose}>
Apply Filters
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M5 12h14M12 5l7 7-7 7" />
</svg>
</button>
</div>
</div>
</div>
);
};

export default Filters;