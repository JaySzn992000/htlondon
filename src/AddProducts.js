import { useState } from "react";
import "./AddProducts.css";

function AddProducts({ Product_relativeCon, dashboard_containerCon }) {

const [productCategory, setProductCategory] = useState("");
const [productName, setProductName] = useState("");
const [productPrice, setProductPrice] = useState("");
const [productStock, setProductStock] = useState("");
const [productDescription, setProductDescription] = useState("");
const [RateProducts, setRateProducts] = useState("");
const [productImage, setProductImage] = useState(null);
const [productImageOne, setProductImageOne] = useState(null);
const [productImageTwo, setProductImageTwo] = useState(null);
const [productImageThree, setProductImageThree] = useState(null);
const [productSizes, setProductSizes] = useState("");

const handleImageChange = (event) => setProductImage(event.target.files[0]);
const handleImageChangeOne = (event) =>
setProductImageOne(event.target.files[0]);
const handleImageChangeTwo = (event) =>
setProductImageTwo(event.target.files[0]);
const handleImageChangeThree = (event) =>
setProductImageThree(event.target.files[0]);

const handleAddProduct = async (e) => {
e.preventDefault();

const formData = new FormData();

formData.append("category", productCategory);
formData.append("name", productName);
formData.append("price", productPrice);
formData.append("sizes", productSizes);
formData.append("stock", productStock);
formData.append("description", productDescription);
formData.append("review", RateProducts);

formData.append("image", productImage);
formData.append("imageone", productImageOne);
formData.append("imagetwo", productImageTwo);
formData.append("imagethree", productImageThree);

try {
const response = await fetch(
"https://namasya.onrender.com/api/add-product",
{
method: "POST",
body: formData,
}
);

if (response.ok) {
alert("Product added successfully!");

setProductCategory("");
setProductName("");
setProductPrice("");
setProductStock("");
setProductDescription("");
setRateProducts("");
setProductImage(null);
setProductImageOne(null);
setProductImageTwo(null);
setProductImageThree(null);
setProductSizes("");

document.getElementById("file-upload").value = "";
document.getElementById("file-upload-one").value = "";
document.getElementById("file-upload-two").value = "";
document.getElementById("file-upload-three").value = "";
} else {
alert("Error adding product!");
}
} catch (error) {
console.error("Error uploading product:", error);
alert("Error uploading product!");
}
};

const hasImage = !!productImage;
const hasImageOne = !!productImageOne;
const hasImageTwo = !!productImageTwo;
const hasImageThree = !!productImageThree;

return (

<div>

<div
className={`AP_Product_relative ${
Product_relativeCon ? "AP_Product_relativeConinside" : ""
}`}
>

<div
className={`AP_dashboard-container ${
dashboard_containerCon ? "AP_dashboard-containerConinside" : ""
}`}
>

<div className="AP_header">
<div className="AP_header-left">
<div className="AP_header-icon">
<i className="fas fa-plus-circle"></i>
</div>

<div>
<h2>Add New Product</h2>
<p>Fill in the details below to add a new product to your store</p>
</div>
</div>
</div>

<form onSubmit={handleAddProduct} className="AP_form">
<div className="AP_form-grid">

<div className="AP_form-left">

<div className="AP_form-group">
<label>
<i className="fas fa-tag"></i> Category
</label>
<input
type="text"
value={productCategory}
onChange={(e) => setProductCategory(e.target.value)}
required
placeholder="e.g. Electronics, Clothing, etc."
maxLength={30}
/>
</div>

<div className="AP_form-group">
<label>
<i className="fas fa-box"></i> Product Name
</label>

<input
type="text"
value={productName}
onChange={(e) => setProductName(e.target.value)}
required
placeholder="Enter product name"
maxLength={50}
/>
</div>

<div className="AP_form-group">
<label>
<i className="fas fa-ruler-combined"></i> Sizes
</label>
<input
type="text"
value={productSizes}
onChange={(e) => setProductSizes(e.target.value)}
required
placeholder="e.g. S,M,L or 7,8,9,10"
/>
</div>

<div className="AP_form-row">
<div className="AP_form-group AP_form-group-half">
<label>
<i className="fas fa-money-bill-wave"></i> Price
</label>
<input
type="number"
value={productPrice}
onChange={(e) => {
if (e.target.value.length <= 5) {
setProductPrice(e.target.value);
}
}}
required
placeholder="₹ 0"
/>
</div>

<div className="AP_form-group AP_form-group-half">
<label>
<i className="fas fa-warehouse"></i> Stock
</label>
<input
type="number"
value={productStock}
required
placeholder="Quantity"
onChange={(e) => {
if (e.target.value.length <= 4) {
setProductStock(e.target.value);
}
}}
/>
</div>
</div>

<div className="AP_form-group">
<label>
<i className="fas fa-star"></i> Rating
</label>
<input
type="text"
value={RateProducts}
onChange={(e) => setRateProducts(e.target.value)}
required
placeholder="e.g. 4.5, 4.8, 5.0"
maxLength={10}
/>
</div>

<div className="AP_form-group">
<label>
<i className="fas fa-align-left"></i> Description
</label>
<textarea
className="AP_textarea"
value={productDescription}
onChange={(e) => setProductDescription(e.target.value)}
required
placeholder="Enter detailed product description..."
maxLength={1500}
/>
</div>
</div>

<div className="AP_form-right">
<div className="AP_upload-section">
<h4>
<i className="fas fa-images"></i> Product Images
</h4>
<p className="AP_upload-sub">Upload up to 4 product images</p>

<div className="AP_upload-grid">

<div
className={`AP_upload-box ${hasImage ? "AP_upload-filled" : ""}`}
onClick={() => document.getElementById("file-upload").click()}
>
<input
type="file"
name="image"
onChange={handleImageChange}
id="file-upload"
style={{ display: "none" }}
required
/>
{hasImage ? (
<div className="AP_upload-preview">
<i className="fas fa-check-circle"></i>
<span>{productImage.name}</span>
</div>
) : (
<>
<div className="AP_upload-icon">
<i className="fas fa-cloud-upload-alt"></i>
</div>
<h4>Main Image</h4>
<p>Click to upload primary photo</p>
</>
)}
</div>

<div
className={`AP_upload-box ${hasImageOne ? "AP_upload-filled" : ""}`}
onClick={() => document.getElementById("file-upload-one").click()}
>
<input
type="file"
name="imageone"
onChange={handleImageChangeOne}
id="file-upload-one"
style={{ display: "none" }}
required
/>

{hasImageOne ? (
<div className="AP_upload-preview">
<i className="fas fa-check-circle"></i>
<span>{productImageOne.name}</span>
</div>
) : (
<>
<div className="AP_upload-icon">
<i className="fas fa-image"></i>
</div>
<h4>Image 2</h4>
<p>Click to upload</p>
</>
)}
</div>

<div
className={`AP_upload-box ${hasImageTwo ? "AP_upload-filled" : ""}`}
onClick={() => document.getElementById("file-upload-two").click()}
>
<input
type="file"
name="imagetwo"
onChange={handleImageChangeTwo}
id="file-upload-two"
style={{ display: "none" }}
required
/>
{hasImageTwo ? (
<div className="AP_upload-preview">
<i className="fas fa-check-circle"></i>
<span>{productImageTwo.name}</span>
</div>
) : (
<>
<div className="AP_upload-icon">
<i className="fas fa-image"></i>
</div>
<h4>Image 3</h4>
<p>Click to upload</p>
</>
)}
</div>

<div
className={`AP_upload-box ${hasImageThree ? "AP_upload-filled" : ""}`}
onClick={() => document.getElementById("file-upload-three").click()}
>
<input
type="file"
name="imagethree"
onChange={handleImageChangeThree}
id="file-upload-three"
style={{ display: "none" }}
required
/>
{hasImageThree ? (
<div className="AP_upload-preview">
<i className="fas fa-check-circle"></i>
<span>{productImageThree.name}</span>
</div>
) : (
<>
<div className="AP_upload-icon">
<i className="fas fa-image"></i>
</div>
<h4>Image 4</h4>
<p>Click to upload</p>
</>
)}
</div>
</div>

<p className="AP_upload-note">
<i className="fas fa-info-circle"></i>
Recommended: 1600 x 1200 (4:3). PNG, JPG, GIF allowed
</p>
</div>

<button className="AP_submit-btn" type="submit">
<i className="fas fa-plus"></i> Add Product
</button>
</div>
</div>
</form>
</div>
</div>
</div>

);
}

export default AddProducts;