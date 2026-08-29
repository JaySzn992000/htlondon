import { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSlider from "./DashboardSlider";
import { useNavigate } from "react-router";
import "./UsersDetails.css";

function UsersDetails() {
const [storeDB, setstoreDB] = useState([]);
const [totalProducts, setTotalProducts] = useState(0);
const [searchTerm, setSearchTerm] = useState("");


useEffect(() => {
const DbFetch = async () => {
try {
const response = await fetch("https://namasya.onrender.com/usersDetails");
const data = await response.json();
setstoreDB(data.products || []);
setTotalProducts(data.total || 0);
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
setSidebarOpen((prevState) => !prevState);
setnavContainer((prevState) => !prevState);
setRelativeDB_PRQuery((prevState) => !prevState);
setDB_products_PRQuery((prevState) => !prevState);
};

const filteredUsers = storeDB.filter(
(user) =>
user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
String(user.id).includes(searchTerm)
);

const getInitials = (name) => {
if (!name) return "U";
return name.charAt(0).toUpperCase();
};

const colors = ["#eef2ff", "#d1fae5", "#fce7f3", "#fef3c7", "#e0e7ff", "#f3e8ff", "#ffe4e6"];

return (

<div>
<DashboardNav
toggleSidebar={toggleSidebar}
sidebarOpen={sidebarOpen}
navContainer={navContainer}
/>

<DashboardSlider sidebarOpen={sidebarOpen} />

<div
className={`UD_RelativeDB_product ${
RelativeDB_PRQuery ? "UD_RelativeDB_PRQuery-inside" : ""
}`}
>
<div
className={`UD_DB_products_ ${
DB_products_PRQuery ? "UD_DB_products_PRQuery-inside" : ""
}`}
>

<div className="UD_stats-row">
<div className="UD_stat-card">
<div className="UD_stat-label">Total Users</div>
<div className="UD_stat-value">{totalProducts}</div>
<div className="UD_stat-change">
<i className="fas fa-users"></i> Registered
</div>
</div>
<div className="UD_stat-card">
<div className="UD_stat-label">Filtered Results</div>
<div className="UD_stat-value">{filteredUsers.length}</div>
<div
className="UD_stat-change"
style={{ color: "#4f46e5", background: "rgba(79,70,229,0.06)" }}
>
<i className="fas fa-search"></i> Search results
</div>
</div>
<div className="UD_stat-card">
<div className="UD_stat-label">Security Level</div>
<div className="UD_stat-value" style={{ color: "#22c55e" }}>
<i className="fas fa-shield-alt"></i> High
</div>
<div
className="UD_stat-change"
style={{ color: "#22c55e", background: "rgba(34,197,94,0.08)" }}
>
<i className="fas fa-lock"></i> All encrypted
</div>
</div>
<div className="UD_stat-card">
<div className="UD_stat-label">Total Sessions</div>
<div className="UD_stat-value">
{Math.floor(totalProducts * 8.5).toLocaleString()}
</div>
<div
className="UD_stat-change"
style={{ color: "#f59e0b", background: "rgba(245,158,11,0.08)" }}
>
<i className="fas fa-chart-line"></i> Avg. sessions
</div>
</div>
</div>

<div className="UD_table-header-actions">
<div className="UD_search-wrap">
<i className="fas fa-search"></i>
<input
type="text"
placeholder="Search by name, email or ID..."
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
/>
</div>
<div className="UD_action-buttons">
<button className="UD_btn-outline">
<i className="fas fa-file-export"></i> Export
</button>
<button className="UD_btn-primary">
<i className="fas fa-user-plus"></i> Add User
</button>
</div>
</div>

<div className="UD_table-wrapper">
<table className="UD_product-table">
<thead>
<tr>
<th>User</th>
<th>Email</th>
<th>Password</th>
<th>Mobile</th>
</tr>
</thead>
<tbody>
{filteredUsers.map((DisDb, index) => {
const bgColor = colors[index % colors.length];
const initials = getInitials(DisDb.name);

return (

<tr key={index}>
<td data-label="User">
<div className="UD_user-cell">
<div
className="UD_avatar"
style={{ background: bgColor, color: "#4f46e5" }}
>
{initials}
</div>
<div className="UD_info">
<div className="UD_name">{DisDb.name}</div>
<div className="UD_sub">ID-{String(DisDb.id || index + 1).padStart(3, "0")}</div>
</div>
</div>
</td>
<td data-label="Email">
<span className="UD_email">{DisDb.email}</span>
</td>
<td data-label="Password">
<span className="UD_password-badge" style={{ background: bgColor }}>
{DisDb.password}
</span>
</td>
<td data-label="Mobile">
<span className="UD_mobile">
<i className="fas fa-phone"></i> {DisDb.mobileno}
</span>
</td>
</tr>
);
})}
</tbody>
</table>
</div>
</div>
</div>
</div>

);
}

export default UsersDetails;