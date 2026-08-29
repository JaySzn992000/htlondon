import React, { useEffect, useState } from "react";
import OrdersDashImg from "../Images_ToolsSymbols/OrdersDash.png";
import OrdersDashEarn from "../Images_ToolsSymbols/wallet.png";
import OrdersDashOrdr from "../Images_ToolsSymbols/orders.png";
import OrdersDashUsr from "../Images_ToolsSymbols/user.jpg";
import DashboardNav from "../DashboardNav";
import DashboardSlider from "../DashboardSlider";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import "./TlPrdctOrdrearn.css";

function TlPrdctOrdrearn () {

const [totalcustProducts, setTotalcustProducts] = useState(0);
const [totalAmount, setTotalAmount] = useState(0);
const [totalProducts, setTotalProducts] = useState(0);
const [totalUsers, setTotalUsers] = useState(0);
const [storeDB, setStoreDB] = useState([]);
const [customerOrder, setCustomerOrder] = useState([]);

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

useEffect(() => {
const customerFetch = async () => {
try {
const response = await fetch("https://namasya.onrender.com/fetchCutomerOrder");
const data = await response.json();
setCustomerOrder(data.products);
setTotalcustProducts(data.total);
const amount = data.products.reduce(
(acc, item) => acc + Number(item.amount || 0),
0
);
setTotalAmount(amount);
} catch (error) {
console.error("Error message:", error);
}
};
customerFetch();
}, []);

useEffect(() => {
const fetchTotalUsers = async () => {
try {
const response = await fetch("https://namasya.onrender.com/usertotalnofo");
const data = await response.json();
setTotalUsers(data.total);
} catch (error) {
console.error("Error message:", error);
}
};
fetchTotalUsers();
}, []);

const [sidebarOpen, setSidebarOpen] = useState(true);
const [navContainer, setnavContainer] = useState(false);
const [DashParentContainer, setDashParentContainer] = useState(false);
const [Dashcontainer, setDashcontainer] = useState(false);
const [ChartParentContainer, setChartParentContainer] = useState(false);
const [ChartContainer, setChartContainer] = useState(false);

const toggleSidebar = () => {
setSidebarOpen((prevState) => !prevState);
setnavContainer((prevState) => !prevState);
setDashParentContainer((prevState) => !prevState);
setDashcontainer((prevState) => !prevState);
setChartParentContainer((prevState) => !prevState);
setChartContainer((prevState) => !prevState);
};

const [selectedDate, setSelectedDate] = useState("");

const handleFilterSubmit = async () => {
try {
const response = await fetch("https://namasya.onrender.com/fetchCutomerOrder", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ date: selectedDate }),
});
const data = await response.json();
setCustomerOrder(data.products);
setTotalcustProducts(data.total);
const amount = data.products.reduce(
(acc, item) => acc + (item.amount || 0),
0
);
setTotalAmount(amount);
} catch (error) {
console.error("Error fetching filtered data:", error);
}
};

const clearFilter = () => {
setSelectedDate("");
const customerFetch = async () => {
try {
const response = await fetch("https://namasya.onrender.com/fetchCutomerOrder");
const data = await response.json();
setCustomerOrder(data.products);
setTotalcustProducts(data.total);
const amount = data.products.reduce(
(acc, item) => acc + Number(item.amount || 0),
0
);
setTotalAmount(amount);
} catch (error) {
console.error("Error message:", error);
}
};
customerFetch();
};

const formatCurrency = (amount) => {
return new Intl.NumberFormat("en-IN", {
style: "currency",
currency: "INR",
minimumFractionDigits: 0,
maximumFractionDigits: 0,
}).format(amount);
};

return (

<div>

<DashboardNav
toggleSidebar={toggleSidebar}
sidebarOpen={sidebarOpen}
navContainer={navContainer}/>

<DashboardSlider sidebarOpen={sidebarOpen} />

<div
className={`DH_Parent_relativeChart ${
ChartParentContainer ? "DH_ChartParentContainer-inside" : ""
}`}
>

<div
className={`DH_div_total_customerChart DH_all_divChart ${
ChartContainer ? "DH_ChartContainer-inside" : ""
}`}
>

<section className="DH_Dashboard_continer">
<div className="DH_header-section">
<div className="DH_title-area">
<h2>Dashboard</h2>
<p className="DH_subtitle">Welcome back! Here's what's happening with your store today.</p>
</div>
<div className="DH_filter-container">
<label>
<i className="fas fa-calendar-alt"></i> Date Filter
</label>

<input
type="date"
value={selectedDate}
onChange={(e) => setSelectedDate(e.target.value)}
/>
<button className="DH_btn-filter" onClick={handleFilterSubmit}>
Apply
</button>
{selectedDate && (
<button className="DH_btn-clear" onClick={clearFilter}>
<i className="fas fa-times"></i>
</button>
)}
</div>
</div>
</section>
</div>
</div>

<div
className={`DH_Parent_relative ${
DashParentContainer ? "DH_DashParentContainer-inside" : ""
}`}
>
<div
className={`DH_div_total_customer DH_all_div ${
Dashcontainer ? "DH_DashContainer-inside" : ""
}`}
>
<div className="DH_card-icon DH_icon-orders">
<img src={OrdersDashImg} loading="lazy" alt="Orders" />
</div>
<div className="DH_card-info">
<h4>Total Orders</h4>
<h2>{totalcustProducts}</h2>
<span className="DH_card-trend DH_trend-up">
<i className="fas fa-arrow-up"></i> 12.5%
</span>
</div>
</div>

<div
className={`DH_div_earning DH_all_div ${
Dashcontainer ? "DH_DashContainer-inside" : ""
}`}
>
<div className="DH_card-icon DH_icon-earning">
<img src={OrdersDashEarn} loading="lazy" alt="Earnings" />
</div>
<div className="DH_card-info">
<h4>Total Earnings</h4>
<h2>{formatCurrency(totalAmount)}</h2>
<span className="DH_card-trend DH_trend-up">
<i className="fas fa-arrow-up"></i> 8.2%
</span>
</div>
</div>

<div
className={`DH_div_amounts DH_all_div ${
Dashcontainer ? "DH_DashContainer-inside" : ""
}`}
>
<div className="DH_card-icon DH_icon-products">
<img src={OrdersDashOrdr} loading="lazy" alt="Products" />
</div>
<div className="DH_card-info">
<h4>Total Products</h4>
<h2>{totalProducts}</h2>
<span className="DH_card-trend DH_trend-up">
<i className="fas fa-arrow-up"></i> 3.1%
</span>
</div>
</div>

<div
className={`DH_div_users DH_all_div ${
Dashcontainer ? "DH_DashContainer-inside" : ""
}`}
>
<div className="DH_card-icon DH_icon-users">
<img src={OrdersDashUsr} loading="lazy" alt="Users" />
</div>
<div className="DH_card-info">
<h4>Total Users</h4>
<h2>{totalUsers}</h2>
<span className="DH_card-trend DH_trend-up">
<i className="fas fa-arrow-up"></i> 18.7%
</span>
</div>
</div>
</div>

<div
className={`DH_Parent_relativeChart DH_charts_wrapper ${
ChartParentContainer ? "DH_ChartParentContainer-inside" : ""
}`}
>
<div
className={`DH_div_total_customerChart DH_all_divChart ${
ChartContainer ? "DH_ChartContainer-inside" : ""
}`}
>
<div className="DH_charts-grid">

<div className="DH_chart-card DH_chart-line">
<div className="DH_chart-header">
<h3>Monthly Revenue</h3>
<span className="DH_chart-badge">This Year</span>
</div>
<div className="DH_chart-body">
<LineChart />
</div>
</div>

<div className="DH_chart-card DH_chart-bar">
<div className="DH_chart-header">
<h3>Sales Overview</h3>
<span className="DH_chart-badge">Weekly</span>
</div>
<div className="DH_chart-body">
<BarChart />
</div>
</div>

<div className="DH_chart-card DH_chart-pie">
<div className="DH_chart-header">
<h3>Category Distribution</h3>
<span className="DH_chart-badge">Top Products</span>
</div>
<div className="DH_chart-body DH_pie-body">
<PieChart />
</div>
</div>
</div>
</div>
</div>
</div>
);
}

export default TlPrdctOrdrearn;