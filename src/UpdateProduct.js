import { useState } from "react";
import "./UpdateProduct.css";

function UpdateProduct({ Update_relativeCon, update_containerCon }) {

const [oldName, setOldName] = useState("");
const [newName, setNewName] = useState("");
const [productPrice, setProductPrice] = useState("");
const [productImage, setProductImage] = useState(null);
const [imagePreview, setImagePreview] = useState(null);

const handleImageChange = (event) => {

const file = event.target.files[0];
if (file) {
setProductImage(file);
const reader = new FileReader();
reader.onloadend = () => {
setImagePreview(reader.result);
};
reader.readAsDataURL(file);
}
};

const handleUpdateProduct = async (e) => {
e.preventDefault();

const formData = new FormData();
formData.append("oldName", oldName);
formData.append("newName", newName);
formData.append("price", productPrice);

if (productImage) {
formData.append("image", productImage);
}

try {
const response = await fetch(
"https://namasya.onrender.com/api/update-product",
{
method: "POST",
body: formData,
}
);

if (response.ok) {
alert("Product updated successfully!");
setOldName("");
setNewName("");
setProductPrice("");
setProductImage(null);
setImagePreview(null);
document.getElementById("file-upload-update").value = "";
} else {
alert("Error updating product!");
}
} catch (error) {
console.error("Error updating product:", error);
alert("Error updating product!");
}
};

const clearImage = () => {
setProductImage(null);
setImagePreview(null);
document.getElementById("file-upload-update").value = "";
};

return (

<div>

<div
className={`UP_Update_relative ${
Update_relativeCon ? "UP_Update_relativeConinside" : ""
}`}
>
<div
className={`UP_update-product-container ${
update_containerCon ? "UP_update_containerConinside" : ""
}`}
>

<div className="UP_header">
<div className="UP_header-left">
<div className="UP_header-icon">
<i className="fas fa-edit"></i>
</div>
<div>
<h2>Update Product</h2>
<p>Update existing product details in your store</p>
</div>
</div>
</div>

<form onSubmit={handleUpdateProduct} className="UP_form">
<div className="UP_form-grid">

<div className="UP_form-left">

<div className="UP_form-group">
<label>
<i className="fas fa-tag"></i> Old Product Name
</label>
<input
type="text"
value={oldName}
onChange={(e) => setOldName(e.target.value)}
required
placeholder="Enter current product name"
maxLength={30}
/>
</div>

<div className="UP_form-group">
<label>
<i className="fas fa-pen"></i> New Product Name
</label>
<input
type="text"
value={newName}
onChange={(e) => setNewName(e.target.value)}
required
placeholder="Enter new product name"
maxLength={30}
/>
</div>

<div className="UP_form-group">
<label>
<i className="fas fa-money-bill-wave"></i> Price
</label>
<input
type="number"
value={productPrice}
required
placeholder="₹ 0"
className="UP_price-input"
onChange={(e) => {
if (e.target.value.length <= 5) {
setProductPrice(e.target.value);
}
}}
/>
</div>
</div>

<div className="UP_form-right">
<div className="UP_upload-section">
<h4>
<i className="fas fa-image"></i> Product Image
</h4>
<p className="UP_upload-sub">
Upload a new product image (optional)
</p>

<div
className={`UP_upload-box ${imagePreview ? "UP_upload-filled" : ""}`}
onClick={() => document.getElementById("file-upload-update").click()}
>
<input
type="file"
onChange={handleImageChange}
id="file-upload-update"
style={{ display: "none" }}
/>
{imagePreview ? (
<div className="UP_upload-preview">
<img
src={imagePreview}
alt="Product Preview"
className="UP_preview-img"
/>
<div className="UP_preview-actions">
<span className="UP_file-name">{productImage?.name}</span>
<button
type="button"
className="UP_clear-btn"
onClick={(e) => {
e.stopPropagation();
clearImage();
}}
>
<i className="fas fa-times"></i> Remove
</button>
</div>
</div>
) : (
<>
<div className="UP_upload-icon">
<i className="fas fa-cloud-upload-alt"></i>
</div>
<h4>Upload New Image</h4>
<p>Click to browse or drag & drop</p>
<span className="UP_upload-format">
PNG, JPG, GIF (Max 5MB)
</span>
</>
)}
</div>

<p className="UP_upload-note">
<i className="fas fa-info-circle"></i>
Recommended: 1600 x 1200 (4:3). Leave empty to keep current image.
</p>
</div>

<button className="UP_submit-btn" type="submit">
<i className="fas fa-sync-alt"></i> Update Product
</button>
</div>
</div>
</form>
</div>
</div>
</div>

);
}

export default UpdateProduct;