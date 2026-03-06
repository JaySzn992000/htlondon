import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ecart from "./Pages/Ecart";
import Registeration from "./RegisterationsLogin/Registeration";
import Login from "./Login/Login";
import Header from "./headers_footer/header";
import ProductDetails from "./components/ProductDetails";
import OwnerDashboard from "./ownerDashboard";
import ItemHistory from "./itemhistory";
import Profile from "./RegisterationsLogin/Profile";
import WishList from "./components/WishList";
import Address from "./Login/Address";
import EditProfile from "./EditProfile";
import Adminlogin from "./Adminlogin";
import DBProducts from "./DBProducts";
import Custorders from "./DashboardADmin/Custorders";
import Productmanagment from "./Productmanagment";
import NavSliderDash from "./NavSliderDash";
import TlPrdctOrdrearn from "./DashboardADmin/TlPrdctOrdrearn";
import Navbar from "./headers_footer/navbar";
import Home from "./components/Home";
import Lotus from "./Products/lotus";
import O3plus from "./Products/o3plus";
import ContactForm from "./components/contactform";
import VideoSliderComponent from "./videoslider";
import Aroma from "./Products/aroma";
import Aboutus from "./components/aboutus";
import Contactus from "./components/contactus";
import PrivacyPolicy from "./Pages/privacy-policy";
import Shipping from "./Pages/Shipping";
import AdminProfile from "./AdminProfile";
import { useState } from "react";
import ForgetPass from "./Login/forgetPass";
import AdminForget from "./AdminForget";
import AdminRegisteration from "./AdminRegisteration";
import AdminUpdate from "./AdminUpdate";
import DashboardcomXKPbcadafcddcfadacbPKXproductlistsearchdashboard from "./Dashboard";
import Message from "./components/Message";
import CategoryJackfruit from "./Products/CategoryJackfruit";
import Biotique from "./Products/biotique";
import Lorealparis from "./Products/lorealparis";
import CategoryLemon from "./Products/aroma";
import HairGrowth from "./Products/fash-wash";
import SandalwoodPowder from "./Products/SandalwoodPowder";
import CategoryGhee from "./Products/CategoryGhee";
import Pickles from "./Products/Pickle";
import TermsCondition from "./Pages/terms-conditions";
import ReturnPolicy from "./Pages/return-policy";
import AdminUsers from "./AdminUsers";
import UsersDetails from "./UsersDetails";
import LineChart from "./DashboardADmin/LineChart";
import { BarChart, PieChart } from "recharts";
import TestimonialSlider from "./components/Testimonial";
import Fragrance from "./components/Fragrance";
import FAQs from "./Pages/FAQs";
import Streax from "./Products/streax";
import Collections from "./components/collections";
import Skincare from "./components/skincare";
import BathBody from "./components/bath-body";
import Haircare from "./components/haircare";
import Makeup from "./components/makeup";
import Perfume from "./components/perfume";
import Fashwash from "./Products/fash-wash";
import Fashcream from "./Products/fash-cream";
import Sunscreen from "./Products/sunscreen";
import Shampoo from "./Products/shampoo";
import HairSerum from "./Products/hair-serum";
import Haircolor from "./Products/hair-color";


function App () {


return (

<div className="App">

<Provider store={store}>

<Router>
<Routes>
<Route path="/Login" element={<Login />} />
<Route path="/collections" element={<Collections />} />
<Route path="/haircare" element={<Haircare />} />
<Route path="/skincare" element={<Skincare />} />
<Route path="/bath-body" element={<BathBody />} />
<Route path="/perfume" element={<Perfume />} />
<Route path="/makeup" element={<Makeup />} />
<Route path="/product/:id" element={<ProductDetails />} />
<Route path="/Ecart" element={<Ecart />} />
<Route path="/Registeration" element={<Registeration />} />
<Route path="/Header" element={<Header />} />
<Route path="/DashboardcomXKPbcadafcddcfadacbPKXproductlistsearchdashboard" element={<DashboardcomXKPbcadafcddcfadacbPKXproductlistsearchdashboard />} />
<Route path="/OwnerDashboard" element={<OwnerDashboard />} />
<Route path="/ItemHistory" element={<ItemHistory />} />
<Route path="/WishList" element={<WishList />} />
<Route path="/Profile" element={<Profile />} />
<Route path="/Address" element={<Address />} />
<Route path="/EditProfile" element={<EditProfile />} />
<Route path="/Adminlogin" element={<Adminlogin />} />
<Route path="/DBProducts" element={ <DBProducts/>}/>
<Route path="/Custorders" element={<Custorders />} />
<Route path="/Productmanagment" element={<Productmanagment />} />
<Route path="/NavSliderDash" element={<NavSliderDash />} />
<Route path="/TlPrdctOrdrearn" element={<TlPrdctOrdrearn />} />
<Route path="/Navbar" element={<Navbar />} />
<Route path="/lotus" element={<Lotus />} />
<Route path="/o3plus" element={<O3plus />} />
<Route path="/Fragrance" element={<Fragrance />}/>
<Route path="/biotique" element={<Biotique />} />
<Route path="/aroma" element={<Aroma />} />
<Route path="/streax" element={<Streax />} />
<Route path="/HairGrowth" element={<HairGrowth />} />
<Route path="/SandalwoodPowder" element={<SandalwoodPowder />} />
<Route path="/CategoryGhee" element={<CategoryGhee />} />
<Route path="/CategoryJackfruit" element={<CategoryJackfruit />} />
<Route path="/CategoryLemon" element={<CategoryLemon />} />
<Route path="/lorealparis" element={<Lorealparis />} />
<Route path="/fash-cream" element={<Fashcream />} />
<Route path="/fash-wash" element={<Fashwash />} />
<Route path="/sunscreen" element={<Sunscreen />} />
<Route path="/shampoo" element={<Shampoo />} />
<Route path="/hair-serum" element={<HairSerum />} />
<Route path="/hair-color" element={<Haircolor />} />
<Route path="/Pickles" element={<Pickles />} />
<Route path="/AdminForget" element={<AdminForget />} />
<Route path="/" element={<Home />} />
<Route path="/ForgetPass" element={<ForgetPass />} />
<Route path="/AdminRegisteration" element={<AdminRegisteration />} />
<Route path="/AdminUpdate" element={<AdminUpdate />} />
<Route path="/contactform" element={<ContactForm />} />
<Route path="/Message" element={<Message />} />
<Route path="/VideoSliderComponent" element={<VideoSliderComponent />} />
<Route path="/aboutus" element={<Aboutus />} />
<Route path="/contactus" element={<Contactus />} />
<Route path="/Shipping" element={<Shipping />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-conditions" element={<TermsCondition />} />
<Route path="/return-policy" element={<ReturnPolicy />} />
<Route path="/FAQs" element={<FAQs />} />
<Route path="/AdminProfile" element={<AdminProfile />} />
<Route path="/products/:category/:id" element={<ProductDetails />} />
<Route path="/AdminUsers" element={<AdminUsers />} />
<Route path="/UsersDetails" element={<UsersDetails />} />
<Route path="/LineChart" element={<LineChart />} />
<Route path="/BarChart" element={<BarChart />} />
<Route path="/PieChart" element={<PieChart />} />
<Route path="/TestimonialSlider" element={<TestimonialSlider />} />

</Routes>

</Router>

</Provider>

</div>

);

}

export default App;
