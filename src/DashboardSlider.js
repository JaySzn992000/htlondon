// DashboardSlider.js – Premium Sidebar Navigation
import { useNavigate } from "react-router";
import "./DashboardSlider.css";

function DashboardSlider({ sidebarOpen }) {
const navigate = useNavigate();

// Navigation handlers
const Productshandler = () => {
sessionStorage.setItem("uiClick", "true");
navigate("/DBProducts");
};

const navigateSlider = () => {
navigate("/DashboardcomXKPbcadafcddcfadacbPKXproductlistsearchdashboard");
};

const orderNavi = () => {
navigate("/Custorders");
};

const pdmanagmenthandler = () => {
navigate("/Productmanagment");
};

const adminNavi = () => {
navigate("/AdminUsers");
};

const userNavi = () => {
navigate("/UsersDetails");
};

const adminProfile = () => {
navigate("/AdminProfile");
};

return (
<div className={`DS_slider ${sidebarOpen ? "DS_slider-in" : "DS_slider-out"}`}>
{/* ===== LOGO ===== */}
<div className="DS_logo-section">
<img
className="DS_logo"
alt="Logo"
loading="lazy"
src="https://cdn-icons-png.flaticon.com/128/1828/1828673.png"
/>
<span className="DS_logo-text">Admin</span>
</div>

{/* ===== APPS ===== */}
<div className="DS_apps-label">
<span>APPS</span>
</div>

{/* ===== NAVIGATION ===== */}
<nav className="DS_nav">
{/* Dashboard */}
<div className="DS_nav-item" onClick={navigateSlider}>
<span className="DS_icon">
<i className="fas fa-th-large"></i>
</span>
<span className="DS_label">Dashboard</span>
<span className="DS_arrow">
<i className="fas fa-chevron-right"></i>
</span>
</div>

{/* Products */}
<div className="DS_nav-item" onClick={Productshandler}>
<span className="DS_icon">
<i className="fas fa-box"></i>
</span>
<span className="DS_label">Products</span>
<span className="DS_arrow">
<i className="fas fa-chevron-right"></i>
</span>
</div>

{/* Product Management */}
<div className="DS_nav-item" onClick={pdmanagmenthandler}>
<span className="DS_icon">
<i className="fas fa-list-alt"></i>
</span>
<span className="DS_label">Product Management</span>
<span className="DS_arrow">
<i className="fas fa-chevron-right"></i>
</span>
</div>

{/* Orders */}
<div className="DS_nav-item" onClick={orderNavi}>
<span className="DS_icon">
<i className="fas fa-shopping-bag"></i>
</span>
<span className="DS_label">Orders</span>
<span className="DS_arrow">
<i className="fas fa-chevron-right"></i>
</span>
</div>

{/* Profile & Data Protection */}
<div className="DS_nav-item DS_nav-item-special">
{/* onClick={adminProfile} */}
<span className="DS_icon">
{/* <i className="fas fa-shield-alt"></i> */}
</span>
<span className="DS_label">Profile & Data Protection</span>
<span className="DS_arrow">
{/* <i className="fas fa-chevron-right"></i> */}
</span>
</div>

{/* My Profile */}
<div className="DS_nav-item" onClick={adminProfile}>
<span className="DS_icon">
<i className="fas fa-user"></i>
</span>
<span className="DS_label">My Profile</span>
<span className="DS_arrow">
<i className="fas fa-chevron-right"></i>
</span>
</div>

{/* Admin Data */}
<div className="DS_nav-item" onClick={adminNavi}>
<span className="DS_icon">
<i className="fas fa-database"></i>
</span>
<span className="DS_label">Admin Data</span>
<span className="DS_arrow">
<i className="fas fa-chevron-right"></i>
</span>
</div>

{/* User Data */}
<div className="DS_nav-item" onClick={userNavi}>
<span className="DS_icon">
<i className="fas fa-users"></i>
</span>
<span className="DS_label">User Data</span>
<span className="DS_arrow">
<i className="fas fa-chevron-right"></i>
</span>
</div>
</nav>

{/* ===== BOTTOM SECTION ===== */}
<div className="DS_footer">
<div className="DS_user-info">
<div className="DS_avatar">A</div>
<div className="DS_user-details">
<span className="DS_user-name">Admin</span>
<span className="DS_user-role">Super Admin</span>
</div>
</div>
</div>
</div>
);
}

export default DashboardSlider;