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
import Tops from "./Products/tops";
import WomenJeans from "./Products/women-jeans";
import ContactForm from "./components/contactform";
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
import Shorts from "./Products/shorts";
import Trousers from "./Products/trousers";
import CategoryLemon from "./Products/aroma";
import HairGrowth from "./Products/t-shirts";
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
import Women from "./components/women";
import Men from "./components/men";
import Shoes from "./components/shoes";
import Makeup from "./components/makeup";
import Perfume from "./components/perfume";
import Tshirts from "./Products/t-shirts";
import Shirts from "./Products/shirts";
import Jeans from "./Products/jeans";
import WomenAccessories from "./Products/women-accessories";
import WomenTshirts from "./Products/women-t-shirts";
import Accessories from "./Products/accessories";


function App () {

const [isLoggedIn, setIsLoggedIn] = useState(false);

return (

<div className="App">

<Provider store={store}>

<Router>
<Routes>
<Route path="/Login" element={<Login />} />
<Route path="/collections" element={<Collections />} />
<Route path="/shoes" element={<Shoes />} />
<Route path="/women" element={<Women />} />
<Route path="/men" element={<Men />} />
<Route path="/perfume" element={<Perfume />} />
<Route path="/makeup" element={<Makeup />} />
<Route path="/product/:id" element={<ProductDetails />} />
<Route path="/Ecart" element={<Ecart />} />
<Route path="/Registeration" element={<Registeration />} />
<Route path="/Header" element={<Header />} />
<Route path="/Adminlogin" element={<Adminlogin setIsLoggedIn={setIsLoggedIn} />} />
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
<Route path="/tops" element={<Tops />} />
<Route path="/women-jeans" element={<WomenJeans />} />
<Route path="/Fragrance" element={<Fragrance />}/>
<Route path="/shorts" element={<Shorts />} />
<Route path="/aroma" element={<Aroma />} />
<Route path="/streax" element={<Streax />} />
<Route path="/HairGrowth" element={<HairGrowth />} />
<Route path="/SandalwoodPowder" element={<SandalwoodPowder />} />
<Route path="/CategoryGhee" element={<CategoryGhee />} />
<Route path="/CategoryJackfruit" element={<CategoryJackfruit />} />
<Route path="/CategoryLemon" element={<CategoryLemon />} />
<Route path="/trousers" element={<Trousers />} />
<Route path="/shirts" element={<Shirts />} />
<Route path="/t-shirts" element={<Tshirts />} />
<Route path="/jeans" element={<Jeans />} />
<Route path="/women-accessories" element={<WomenAccessories />} />
<Route path="/women-t-shirts" element={<WomenTshirts />} />
<Route path="/accessories" element={<Accessories />} />
<Route path="/Pickles" element={<Pickles />} />
<Route path="/AdminForget" element={<AdminForget />} />
<Route path="/" element={<Home />} />
<Route path="/ForgetPass" element={<ForgetPass />} />
<Route path="/AdminRegisteration" element={<AdminRegisteration />} />
<Route path="/AdminUpdate" element={<AdminUpdate />} />
<Route path="/contactform" element={<ContactForm />} />
<Route path="/Message" element={<Message />} />
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
