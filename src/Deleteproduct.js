import { useState } from "react";
import "./Deleteproduct.css";

function DeleteProduct({ Delete_relativeCon, Delete_formCon }) {

const [productName, setProductName] = useState("");
const [message, setMessage] = useState("");

const handleDelete = async (e) => {
e.preventDefault();

try {
const response = await fetch("https://namasya.onrender.com/deletebyname", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ name: productName }),
});

const data = await response.json();

if (response.ok) {
setMessage(data.message || "Product deleted successfully!");
alert("Product deleted successfully!");
setProductName("");
} else {
setMessage(data.error || "Failed to delete product.");
alert("Error: " + (data.error || "Failed to delete product."));
}
} catch (error) {
setMessage("An error occurred while deleting the product.");
alert("An error occurred while deleting the product.");
}
setProductName("");
};

return (

<div>
<div
className={`DP_Delete-relative ${
Delete_relativeCon ? "DP_Delete_relativeConinside" : ""
}`}
>
<div
className={`DP_Delete_form ${
Delete_formCon ? "DP_Delete_formConinside" : ""
}`}
>
<div className="DP_header">
<div className="DP_header-left">
<div className="DP_header-icon">
<i className="fas fa-trash-alt"></i>
</div>
<div>
<h2>Delete Product</h2>
<p>Permanently remove a product from your store</p>
</div>
</div>
</div>

<form onSubmit={handleDelete} className="DP_form">
<div className="DP_form-group">
<label>
<i className="fas fa-box"></i> Product Name
</label>
<input
type="text"
placeholder="Enter exact product name to delete"
value={productName}
onChange={(e) => setProductName(e.target.value)}
required
/>
</div>

{message && (
<div className={`DP_message ${message.includes("success") ? "DP_success" : "DP_error"}`}>
{message}
</div>
)}

<button type="submit" className="DP_submit-btn">
<i className="fas fa-trash"></i> Delete Product
</button>

<p className="DP_warning">
<i className="fas fa-exclamation-triangle"></i>
This action cannot be undone. Please double-check the product name.
</p>
</form>
</div>
</div>
</div>

);
}

export default DeleteProduct;