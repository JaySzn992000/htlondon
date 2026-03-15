import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import NavigationClose from "../Logo/CloseTag.png";
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

useEffect(() => {
let filtered = allProducts;

if (selectedNames.length > 0) {
filtered = filtered.filter((product) =>
selectedNames.includes(product.img)
);
}

if (isPriceChanged) {
filtered = filtered.filter(
(product) => product.price >= minPrice && product.price <= maxPrice
);
}

onFilterUpdate(filtered);
}, [
minPrice,
maxPrice,
isPriceChanged,
selectedNames,
allProducts,
]);


const handlePriceChange = () => setIsPriceChanged(true);

const handleNameChange = (name) => {
setSelectedNames((prevNames) => {
let newNames;
if (prevNames.includes(name)) {
newNames = prevNames.filter((n) => n !== name);
} else {
newNames = [...prevNames, name];
}

const newQuery =
newNames.length > 0
? `?search=${encodeURIComponent(newNames.join(","))}`
: "";
navigate(`${newQuery}`);

return newNames;
});
};

const ClickFilter = () => setfilters_div(true);
const FilterClose = () => setfilters_div(false);


return (

<div>

<div className="content_sticky">

<div id="div_filter">

<img
loading="lazy"
onClick={ClickFilter}
className="filter_"
src="https://cdn-icons-png.flaticon.com/128/10609/10609382.png"
alt=""
></img>

</div>

<div className={`filters ${filters_div ? "filters_AfContainer" : ""}`}>

<img
loading="lazy"
alt=""
src={NavigationClose}
id="Product_CloseTag"
onClick={FilterClose}
></img>

<div>

<div className="priceContainer">

<h4 id="priceRange">SORT BY</h4>

<li className="maxMin">
{" "}
₹ {minPrice} - ₹{maxPrice}
</li>

<input
type="range"
min="0"
max="10000"
step="10"
value={minPrice}
onChange={(e) => {
setMinPrice(Number(e.target.value));
handlePriceChange();
}}
style={{ width: "90%" }} />

<input
type="range"
min="0"
max="10000"
step="10"
value={maxPrice}
onChange={(e) => {
setMaxPrice(Number(e.target.value));
handlePriceChange();
}}
style={{ width: "90%" }} />

</div>

<h4 id="priceRange">COLLECTIONS</h4>

<div>
{[
"T-Shirts",
"Shirts",
"Jeans",
"Trousers",
"Shorts",
].map((name) => (
<label className="lable-Fontsize" key={name}>
<input
id="chck_box"
type="checkbox"
value={name}
checked={selectedNames.includes(name)}
onChange={() => handleNameChange(name)}
/>

<div
style={{
display: "flex",
alignItems: "center",
justifyContent: "space-between",
width: "85%",
cursor: "pointer",
}} >

{name}
</div>
</label>
))}
</div>
</div>

<div>
<div></div>
</div>

<div>
<div></div>
</div>
</div>

</div>

</div>

);

};

export default Filters;