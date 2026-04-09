import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import "./Profile.css";
// import ProfileBG from "../Logo/ProfileBG.jpg";

const Profile = () => {

const [loggedInUser, setLoggedInUser] = useState(null);

useEffect(() => {
const storedUser = localStorage.getItem("loggedInUser");
if (storedUser) {
setLoggedInUser(JSON.parse(storedUser));
}
}, [] );

const naviGateEdit = useNavigate();

const EditProfile = () => {
naviGateEdit("/EditProfile");
};

const logout = () => {
setLoggedInUser(null);
localStorage.removeItem("loggedInUser");
navigate("/collections");
};

const navigate = useNavigate();

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
