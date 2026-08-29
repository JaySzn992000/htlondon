import { useNavigate } from "react-router-dom";
import DashboarUserIcon from "./Images_ToolsSymbols/dashboarduser.png";
import "./DashboardNav.css";

function DashboardNav({ toggleSidebar, navContainer }) {

const naviDashboard = useNavigate();
const Dashboardnav = () => {
naviDashboard("/DashboardcomXKPbcadafcddcfadacbPKXproductlistsearchdashboard");
};

const AdminProfileNavi = useNavigate();
const AdminProfile = () => {
AdminProfileNavi("/AdminProfile");
};

return (

<nav className="DN_dashboard-nav">

<div className={`DN_nav-inside ${navContainer ? "DN_navContainer-inside" : ""}`}>

<div className="DN_left-section">
<button className="DN_menu-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
<i className="fas fa-bars"></i>
</button>
<div className="DN_logo-wrapper" onClick={Dashboardnav}>
<div className="DN_logo-icon">
<i className="fas fa-cube"></i>
</div>
<span className="DN_logo-text">Dashboard</span>
</div>
</div>

<div className="DN_right-section">
<div className="DN_user-profile" onClick={AdminProfile}>

<img
src={DashboarUserIcon}
alt="User Avatar"
loading="lazy"/>

<div className="DN_user-info">
<span className="DN_user-name">Admin</span>
<span className="DN_user-role">Super Admin</span>
</div>
<i className="fas fa-chevron-down DN_user-arrow"></i>
</div>
</div>
</div>
</nav>

);

}

export default DashboardNav;