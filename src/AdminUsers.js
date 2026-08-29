import { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSlider from "./DashboardSlider";
import { useNavigate } from "react-router";
import "./AdminUsers.css";

function AdminUsers() {

const [storeDB, setstoreDB] = useState([]);
const [totalProducts, setTotalProducts] = useState(0);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
const DbFetch = async () => {
try {
const response = await fetch("https://namasya.onrender.com/adminusersDeatils");
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

const filteredUsers = storeDB.filter((user) =>
user.adminuser?.toLowerCase().includes(searchTerm.toLowerCase())
);

const getInitials = (name) => {
if (!name) return "A";
return name.charAt(0).toUpperCase();
};

const colors = ["#eef2ff", "#d1fae5", "#fce7f3", "#fef3c7", "#e0e7ff", "#f3e8ff"];

return (

<div>
<DashboardNav
toggleSidebar={toggleSidebar}
sidebarOpen={sidebarOpen}
navContainer={navContainer}
/>

<DashboardSlider sidebarOpen={sidebarOpen} />

<div
className={`AU_RelativeDB_product ${
RelativeDB_PRQuery ? "AU_RelativeDB_PRQuery-inside" : ""
}`}
>

<div
className={`AU_DB_products_ ${
DB_products_PRQuery ? "AU_DB_products_PRQuery-inside" : ""
}`}
>

<div className="AU_stats-row">
<div className="AU_stat-card">
<div className="AU_stat-label">Total Admins</div>
<div className="AU_stat-value">{totalProducts}</div>
<div className="AU_stat-change">
<i className="fas fa-users"></i> Registered users
</div>
</div>
<div className="AU_stat-card">
<div className="AU_stat-label">Active (Filtered)</div>
<div className="AU_stat-value">{filteredUsers.length}</div>
<div
className="AU_stat-change"
style={{ color: "#4f46e5", background: "rgba(79,70,229,0.06)" }}
>
<i className="fas fa-search"></i> Search results
</div>
</div>
<div className="AU_stat-card">
<div className="AU_stat-label">Security Level</div>
<div className="AU_stat-value" style={{ color: "#22c55e" }}>
<i className="fas fa-shield-alt"></i> High
</div>
<div
className="AU_stat-change"
style={{ color: "#22c55e", background: "rgba(34,197,94,0.08)" }}
>
<i className="fas fa-lock"></i> All encrypted
</div>
</div>
<div className="AU_stat-card">
<div className="AU_stat-label">Total Sessions</div>
<div className="AU_stat-value">
{Math.floor(totalProducts * 12.5).toLocaleString()}
</div>
<div
className="AU_stat-change"
style={{ color: "#f59e0b", background: "rgba(245,158,11,0.08)" }}
>
<i className="fas fa-chart-line"></i> Avg. sessions
</div>
</div>
</div>

<div className="AU_table-header-actions">
<div className="AU_search-wrap">
<i className="fas fa-search"></i>
<input
type="text"
placeholder="Search admin by name..."
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
/>
</div>
<div className="AU_action-buttons">
<button className="AU_btn-outline">
<i className="fas fa-file-export"></i> Export
</button>
<button className="AU_btn-primary">
<i className="fas fa-user-plus"></i> Add Admin
</button>
</div>
</div>

<div className="AU_table-wrapper">
<table className="AU_product-table">
<thead>
<tr>
<th>Admin</th>
<th>Password</th>
</tr>
</thead>
<tbody>
{filteredUsers.map((DisDb, index) => {
const bgColor = colors[index % colors.length];
const initials = getInitials(DisDb.adminuser);

return (

<tr key={index}>
<td data-label="Admin">
<div className="AU_user-cell">
<div
className="AU_avatar"
style={{ background: bgColor, color: "#4f46e5" }}
>
{initials}
</div>
<div className="AU_info">
<div className="AU_name">{DisDb.adminuser}</div>
<div className="AU_sub">ID-{String(index + 1).padStart(3, "0")}</div>
</div>
</div>
</td>
<td data-label="Password">
<span className="AU_password-badge" style={{ background: bgColor }}>
{DisDb.adminpass}
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

export default AdminUsers;