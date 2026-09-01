import React, { useEffect, useState } from "react";
import DashboardNav from "../DashboardNav";
import DashboardSlider from "../DashboardSlider";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import "./Custorders.css";

function Custorders() {

const [customerOrder, setcustomerOrder] = useState([]);
const [totalcustProducts, settotalcustProducts] = useState(0);
const [selectedDate, setSelectedDate] = useState("");
const [allCustomerOrders, setAllCustomerOrders] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
const customerFetch = async () => {
try {
const response = await fetch("https://namasya.onrender.com/fetchCutomerOrder");
const data = await response.json();
setAllCustomerOrders(data.products || []);
setcustomerOrder(data.products || []);
settotalcustProducts(data.total || 0);
} catch (error) {
console.error("Error message:", error);
}
};
customerFetch();
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
const [relative_CustordersCon, setrelative_CustordersCon] = useState(false);

const toggleSidebar = () => {
setSidebarOpen((prev) => !prev);
setnavContainer((prev) => !prev);
setrelative_CustordersCon((prev) => !prev);
};

const customerFetch = async () => {
try {
const response = await fetch("https://namasya.onrender.com/fetchCutomerOrder");
const data = await response.json();
setcustomerOrder(data.products || []);
settotalcustProducts(data.total || 0);
} catch (error) {
console.error("Error message:", error);
}
};

const handleFilterSubmit = () => {
if (!selectedDate) {
customerFetch();
return;
}
const filteredOrders = allCustomerOrders.filter((order) => {
const orderDate = new Date(order.date);
const filterDate = new Date(selectedDate);
return (
orderDate.getFullYear() === filterDate.getFullYear() &&
orderDate.getMonth() === filterDate.getMonth() &&
orderDate.getDate() === filterDate.getDate()
);
});
setcustomerOrder(filteredOrders);
settotalcustProducts(filteredOrders.length);
};

const clearFilter = () => {
setSelectedDate("");
customerFetch();
};

const formatDate = (isoDate) => {
if (!isoDate) return "N/A";
const date = new Date(isoDate);
const month = date.getMonth() + 1;
const day = date.getDate();
const year = date.getFullYear();
return `${month}-${day}-${year}`;
};

const updateStatus = async (orderId) => {
try {
const response = await fetch("https://namasya.onrender.com/updateOrderStatus", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ razorpay_order_id: orderId }),
});
const result = await response.json();
if (result.success) {
setcustomerOrder((prevOrders) =>
prevOrders.map((order) =>
order.razorpay_order_id === orderId
? { ...order, status_order: "Delivered" }
: order
)
);
}
} catch (error) {
console.error("Update error:", error);
}
};

const totalOrders = totalcustProducts;
const deliveredOrders = customerOrder.filter(
(o) => o.status_order === "Delivered"
).length;
const pendingOrders = customerOrder.filter(
(o) => o.status_order !== "Delivered"
).length;
const today = new Date().toISOString().slice(0, 10);
const todayOrders = customerOrder.filter((o) => o.date?.slice(0, 10) === today)
.length;

const filteredBySearch = customerOrder.filter(
(order) =>
order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
order.productname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
String(order.id).includes(searchTerm)
);

const displayOrders = searchTerm ? filteredBySearch : customerOrder;

const statusColors = {
Delivered: "#22c55e",
Pending: "#f59e0b",
Processing: "#3b82f6",
Cancelled: "#ef4444",
};

const getStatusBadge = (status) => {
const color = statusColors[status] || "#64748b";
return (
<span
className="CO_status-badge"
style={{
background: `${color}15`,
color: color,
}}
>
<span className="CO_status-dot" style={{ background: color }}></span>
{status || "N/A"}
</span>
);
};

return (

<div>
<Helmet>
<title>Customer Orders Dashboard | Pickle Admin</title>
<meta
name="description"
content="View all customer orders placed on Pickle."
/>
<meta name="robots" content="noindex, nofollow" />
</Helmet>

<DashboardNav
toggleSidebar={toggleSidebar}
sidebarOpen={sidebarOpen}
navContainer={navContainer}
/>
<DashboardSlider sidebarOpen={sidebarOpen} />

<div
className={`CO_Parent_relativeCust ${
relative_CustordersCon ? "CO_relative_Custorders_inside" : ""
}`}
>

<div className="CO_stats-row">
<div className="CO_stat-card">
<div className="CO_stat-label">Total Orders</div>
<div className="CO_stat-value">{totalOrders}</div>
</div>
<div className="CO_stat-card">
<div className="CO_stat-label">Today</div>
<div className="CO_stat-value">{todayOrders}</div>
</div>
<div className="CO_stat-card">
<div className="CO_stat-label">Pending</div>
<div className="CO_stat-value" style={{ color: "#f59e0b" }}>
{pendingOrders}
</div>
</div>
<div className="CO_stat-card">
<div className="CO_stat-label">Delivered</div>
<div className="CO_stat-value" style={{ color: "#22c55e" }}>
{deliveredOrders}
</div>
</div>
</div>

<div className="CO_controls">
<div className="CO_search-wrap">
<i className="fas fa-search"></i>

<input
type="text"
placeholder="Search by name, product or email..."
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
/>
</div>
<div className="CO_filter-wrap">
<i className="fas fa-calendar-alt" style={{ color: "#94a3b8" }}></i>
<input
type="date"
value={selectedDate}
onChange={(e) => setSelectedDate(e.target.value)}
/>
<button className="CO_btn-filter" onClick={handleFilterSubmit}>
Apply
</button>
{selectedDate && (
<button className="CO_btn-clear" onClick={clearFilter}>
<i className="fas fa-times"></i>
</button>
)}
</div>
</div>

<div className="CO_table-wrapper">
<table className="CO_custorders-table">
<thead>
<tr>
<th>#ID</th>
<th>Product</th>
<th>Product Name</th>
<th>Customer</th>
<th>Mobile</th>
<th>Email</th>
<th>Payment</th>
<th>Date</th>
<th>Amount</th>
<th>Qty</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{displayOrders.length === 0 ? (
<tr>
<td colSpan="12" className="CO_no-data">
<i className="fas fa-inbox"></i> No orders found
</td>
</tr>
) : (
displayOrders.map((CusDB, index) => {
const isDelivered = CusDB.status_order === "Delivered";
const paymentColor =
CusDB.payment_status === "Success" ||
CusDB.payment_status === "Paid"
? "#22c55e"
: "#f59e0b";

return (
<tr key={index}>
<td data-label="#ID">
<span className="CO_id">#{CusDB.id}</span>
</td>
<td data-label="Product">
{CusDB.file_path ? (
<img
src={CusDB.file_path}
alt={CusDB.name}
className="CO_product-img"
/>
) : (
<span className="CO_no-img">—</span>
)}
</td>
<td data-label="Product Name">
<span className="CO_product-name">
{CusDB.productname || "N/A"}
</span>
</td>
<td data-label="Customer">
<span className="CO_customer-name">
{CusDB.name || "N/A"}
</span>
</td>
<td data-label="Mobile">{CusDB.mob || "N/A"}</td>
<td data-label="Email" className="CO_email-cell">
{CusDB.email || "N/A"}
</td>
<td data-label="Payment">
<span
className="CO_payment-badge"
style={{
background: `${paymentColor}15`,
color: paymentColor,
}}
>
{CusDB.payment_status || "N/A"}
</span>
</td>
<td data-label="Date">
<span className="CO_date">
{formatDate(CusDB.date)}
</span>
</td>
<td data-label="Amount">
<span className="CO_amount">₹ {CusDB.amount || 0}</span>
</td>
<td data-label="Qty">{CusDB.quantity || 0}</td>
<td data-label="Status">
{getStatusBadge(CusDB.status_order)}
</td>
<td data-label="Action">
<button
className={`CO_action-btn ${
isDelivered ? "CO_btn-disabled" : "CO_btn-primary"
}`}
onClick={() =>
updateStatus(CusDB.razorpay_order_id)
}
disabled={isDelivered}
>
{isDelivered ? (
<>
<i className="fas fa-check"></i> Done
</>
) : (
<>
<i className="fas fa-truck"></i> Deliver
</>
)}
</button>
</td>
</tr>
);
})
)}
</tbody>
</table>
</div>
</div>
</div>
);
}

export default Custorders;