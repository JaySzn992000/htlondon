import { useNavigate } from "react-router";
import LogoNitiArya from "../Logo/LogoNitiArya.png";
import "./header.css";

const Header = () => {

const naviHome = useNavigate();

const navigateHome = () => {
naviHome("/");
};

const NavitoProductlist = useNavigate();

const naviToCollection = () => {
NavitoProductlist('/collections')
}

const naviAbout = useNavigate()
const naviToAboutus = () => {
naviAbout('/aboutus')
}

const naviContact = useNavigate();
const naviToContactus = () => {
naviContact('/contactus')
}

const privacyNavi = useNavigate();
const privacyNavigate = () => {
privacyNavi('/privacy-policy')
}

const returnPolicy = useNavigate();
const returnPolicyNavi = () => {
returnPolicy('/return-policy')
}

const termsAndCOndition = useNavigate();
const termsAndCOnditionNavi = () => {
termsAndCOndition('/terms-conditions')
}

const MyFaqs = useNavigate()
const Faqs = () => {
MyFaqs('/FAQs')
}


return (

<div>

<header className="normal_header">


<div className="div_header">

<div className="header_dv">

<img className="nMheader_dvLogo"
onClick={navigateHome}
loading="lazy"
src={LogoNitiArya} alt="logo"></img>

<h3>NEWSLETTER</h3>
<p>Sign up to our newsletter to receive <br></br>
exclusive offers.</p>

<button><span>SUBSCRIBE</span></button>

</div>

<ul>
<h4>How can we help ?</h4>
<li onClick={naviToCollection}><a>Shop our Products</a></li>
<li onClick={naviToAboutus}><a>About us</a></li>
<li onClick={naviToContactus}><a>Contact us</a></li>
<li onClick={Faqs}><a>FAQs</a></li>
</ul>

<ul>
<h4>Useful Info</h4>
<li onClick={privacyNavigate}><a>Privacy Policy</a></li>
<li onClick={returnPolicyNavi}><a>Return Policy</a></li>
<li onClick={termsAndCOnditionNavi}><a>Terms & Conditions</a></li>
</ul>

<ul>
<h4>Contact Us</h4>
<li><a>Email: WINSOMEBLOOM.SHOP</a></li>
<li><a>Phone: +91 9111574281</a></li>
</ul>

</div>
</header>
</div>

);

};

export default Header;