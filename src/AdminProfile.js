import { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSlider from "./DashboardSlider";
import {
FaEye,
FaEyeSlash,
FaEdit,
FaKey,
FaSignOutAlt,
FaBox,
FaShoppingCart,
FaDollarSign,
} from "react-icons/fa";
import "./AdminProfile.css";
import { useNavigate } from "react-router-dom";

function AdminProfile() {

const [loggedInAdmin, setLoggedInAdmin] = useState(null);
const [showPassword, setShowPassword] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(true);
const [navContainer, setNavContainer] = useState(false);
const [relativeClass, setRelativeClass] = useState(false);
const [productClass, setProductClass] = useState(false);
const navigate = useNavigate();

useEffect(() => {
try {
const storedAdmin = localStorage.getItem("loggedInAdmin");
if (storedAdmin && storedAdmin !== "undefined") {
setLoggedInAdmin(JSON.parse(storedAdmin));
}
} catch (error) {
console.error("Error parsing admin data:", error);
setLoggedInAdmin(null);
}
}, []);

const logoutHandler = () => {
localStorage.removeItem("loggedInAdmin");
localStorage.removeItem("isLoggedIn");
setLoggedInAdmin(null);
navigate("/Adminlogin");
};

const toggleSidebar = () => {
setSidebarOpen(!sidebarOpen);
setNavContainer(!navContainer);
setRelativeClass(!relativeClass);
setProductClass(!productClass);
};

const updateProfile = () => {
navigate("/Adminupdate");
};

const changePassword = () => {
alert("Redirect to Change Password page.");
};

useEffect(() => {
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
if (!isLoggedIn) {
navigate("/adminlogin");
}
}, [navigate]);

const stats = {
products: 156,
orders: 342,
revenue: "₹ 2,45,890",
};

const adminName = loggedInAdmin?.adminuser || "Jay@123990";
const adminEmail = loggedInAdmin?.adminemail || "admin@store.com";
const adminPass = loggedInAdmin?.adminpass || "SecurePass123";
const initial = adminName.charAt(0).toUpperCase();

return (

<div>
<DashboardNav
toggleSidebar={toggleSidebar}
sidebarOpen={sidebarOpen}
navContainer={navContainer}
/>
<DashboardSlider sidebarOpen={sidebarOpen} />

<div
className={`AP_RelativeDB_product ${relativeClass ? "AP_RelativeDB_PRQuery-inside" : ""}`}
>
<div
className={`AP_DB_products_ ${productClass ? "AP_DB_products_PRQuery-inside" : ""}`}
>
<div className="AP_admin-profile-wrapper">
<div className="AP_profile-card">

<div className="AP_profile-header">
<div className="AP_avatar-wrapper">
<div className="AP_avatar-circle">
<h1>{initial}</h1>
</div>
<span className="AP_status-dot"></span>
</div>
<h2 className="AP_admin-name">{adminName}</h2>
<span className="AP_admin-role">Store Manager</span>
<div className="AP_status-badge">
<span className="AP_dot-sm"></span> Active
</div>
</div>

<div className="AP_divider"></div>

<div className="AP_contact-row">
<i className="fas fa-envelope"></i>
<span>{adminEmail}</span>
</div>
<div className="AP_contact-row">
<i className="fas fa-lock"></i>
<span className="AP_password-dots">
{showPassword ? adminPass : "•".repeat(adminPass.length || 8)}
</span>
<button
className="AP_toggle-btn"
onClick={() => setShowPassword(!showPassword)}
aria-label="Toggle password"
>
{showPassword ? <FaEyeSlash /> : <FaEye />}
</button>
</div>

<div className="AP_stats-grid">
<div className="AP_stat-block">
<FaBox className="AP_stat-icon" />
<span className="AP_stat-number">{stats.products}</span>
<span className="AP_stat-label">Products</span>
</div>
<div className="AP_stat-block">
<FaShoppingCart className="AP_stat-icon" />
<span className="AP_stat-number">{stats.orders}</span>
<span className="AP_stat-label">Orders</span>
</div>
<div className="AP_stat-block">
<FaDollarSign className="AP_stat-icon" />
<span className="AP_stat-number">{stats.revenue}</span>
<span className="AP_stat-label">Revenue</span>
</div>
</div>

<div className="AP_action-grid">
<button className="AP_action-btn AP_primary" onClick={updateProfile}>
<FaEdit /> Edit Profile
</button>
<button className="AP_action-btn AP_outline" onClick={changePassword}>
<FaKey /> Change Password
</button>
<button className="AP_action-btn AP_danger-outline" onClick={logoutHandler}>
<FaSignOutAlt /> Sign Out
</button>
</div>
</div>
</div>
</div>
</div>
</div>

);
}

export default AdminProfile;