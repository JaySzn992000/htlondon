import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import "./Profile.css";

const Profile = () => {

const [loggedInUser, setLoggedInUser] = useState(null);
const navigate = useNavigate();

useEffect(() => {

const token = localStorage.getItem("token");

if (!token) {
navigate("/login"); 
return;
}

try {

const payload = JSON.parse(atob(token.split(".")[1]));
setLoggedInUser(payload);
} catch (error) {
console.error("Invalid token", error);
localStorage.removeItem("token");
navigate("/login");
}
}, [navigate]);

const EditProfile = () => {
navigate("/EditProfile");
};

const logout = () => {
setLoggedInUser(null);

localStorage.removeItem("token"); 

navigate("/login");
};

const navigateToItemHistory = () => {
navigate("/ItemHistory");
};

const navigateToWishlist = () => {
navigate("/WishList");
};

return (
<div>
<Navbar />

<section className="flex_Profile_">
<div>
<div className="flex_lfo">
<div className="n_profile">
{loggedInUser && loggedInUser.name && (
<>
<div className="edit_flex">
<div>
<h1 className="af_name_user">{loggedInUser.name}</h1>
<div className="flex_prf_">
<p className="fontsizeProfile">{loggedInUser.email}</p>
</div>
</div>
</div>
</>
)}
</div>
</div>

<div className="profile_navi">
<ul>
<li className="fontsizeProfile" onClick={navigateToItemHistory}>
Item History
</li>
<li className="fontsizeProfile" onClick={navigateToWishlist}>
Wish List
</li>
</ul>
</div>
</div>
</section>

<div className="Sign_out">
<div>
<p className="fontsizeProfile" onClick={EditProfile}>Edit</p>
</div>
<div>
<p className="fontsizeProfile" onClick={logout}>Sign out</p>
</div>
</div>

<div className="header-ad">
<Header></Header>
</div>
</div>
);
};

export default Profile;