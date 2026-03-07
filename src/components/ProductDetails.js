import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart } from "../action/action";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import Zoom from "react-medium-image-zoom";
import Slider from "react-slick";
import { connect } from "react-redux";
import "./ProductDetails.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-medium-image-zoom/dist/styles.css";
import winsomeproductdetails from "../Slider/winsomeproductdetails.png"
import axios from "axios";


const ProductDetails = ({ addToCart, cart }) => {

const { category, id } = useParams();
const navigate = useNavigate();
const [arrayStore, setArrayStore] = useState(null);
const [cartCount, setCartCount] = useState(cart.length);
const [mainImage, setMainImage] = useState("");
const [message, setMessage] = useState("");
const [selectedThumb, setSelectedThumb] = useState(null);


useEffect(() => {
fetch(`https://omega-zg6z.onrender.com/products/${id}`)
.then(res => res.json())
.then(data => {
});
}, [id] );

useEffect(() => {
const fetchProduct = async () => {
try {
const response = await axios.get(
"https://omega-zg6z.onrender.com/fetchProductslist"
);
const data = response.data;
const product = data.find((product) => product.id === parseInt(id));
setArrayStore(product);
setMainImage(product.file_path);
} catch (error) {
console.log("Error fetching product:", error);
}
};

fetchProduct();
}, [id] );

const handleAddToCart = () => {
if (arrayStore) {
const isProductInCart = cart.some(
(item) => item.id === arrayStore.id 
);

if (isProductInCart) {
alert("This product already in your cart.");
} else {
const productToAdd = {
...arrayStore,
price: arrayStore.price,
originalPrice: arrayStore.price,
};

addToCart(productToAdd);
setCartCount(cartCount + 1);
localStorage.setItem(`cart-added-${id}`, JSON.stringify(true));
alert("Product added to cart!");
}
} 
};

const handleGoToCart = () => {
navigate("/ECart");
};

const handleThumbnailClick = (imagePath) => {
setMainImage(imagePath);
};

if (!arrayStore) {
return <div>Product not found</div>;
}

const sliderSettings = {
dots: true,
infinite: true,
speed: 500,
slidesToShow: 1,
slidesToScroll: 1,
arrows: false,
};


return (

<div>

<Navbar cartCount={cartCount} />

<div className="product-details">

<div className="mobile-slider">

<Slider {...sliderSettings}>
<div>
<img
className="product_img mobile-slider-img"
src={arrayStore.file_path}
alt={`${arrayStore.name} - Image 1`}
loading="lazy" />
</div>

<div>
<img
className="product_img mobile-slider-img"
src={arrayStore.file_path1}
alt={`${arrayStore.name} - Image 2`}
loading="lazy" />
</div>

<div>
<img
className="product_img mobile-slider-img"
src={arrayStore.file_path2}
alt={`${arrayStore.name} - Image 3`}
loading="lazy" />
</div>

<div>
<img
className="product_img mobile-slider-img"
src={arrayStore.file_path3}
alt={`${arrayStore.name} - Image 4`}
loading="lazy"/>
</div>

</Slider>

</div>

<div className="thumbnails-container">

<img
className={`thumbnail ${
selectedThumb === arrayStore.file_path1 ? "thumb-active" : ""
}`}
src={arrayStore.file_path1}
loading="lazy"
onClick={() => {
handleThumbnailClick(arrayStore.file_path1);
setSelectedThumb(arrayStore.file_path1);
}} />

<img
className={`thumbnail ${
selectedThumb === arrayStore.file_path2 ? "thumb-active" : ""
}`}
src={arrayStore.file_path2}
loading="lazy"
onClick={() => {
handleThumbnailClick(arrayStore.file_path2);
setSelectedThumb(arrayStore.file_path2);
}} />

<img
className={`thumbnail ${
selectedThumb === arrayStore.file_path3 ? "thumb-active" : ""
}`}
src={arrayStore.file_path3}
loading="lazy"
onClick={() => {
handleThumbnailClick(arrayStore.file_path3);
setSelectedThumb(arrayStore.file_path3);
}} />

</div>

<div className="product-img-container">

<Zoom>
<img
className="product_img"
src={mainImage}
alt={arrayStore.name}
loading="lazy"
/>
</Zoom>
</div>

<div className="second_div">

<section>
<h1>{arrayStore.name}</h1>

<h2 className="Scnd_hTg">
<span>
{ } ₹{ }
{arrayStore.price}
</span>
</h2>

</section>

<div className="review_Cntnr">

<img
id="Review_Img"
src="https://cdn-icons-png.flaticon.com/128/15853/15853959.png"
/>

<li className="fa_Review">{arrayStore.review}</li>

</div>

<div className="flex_btnADD_CART">
<button onClick={handleAddToCart} id="btn" className="add_crt">
<img
className="iconDetails"
src="https://www.flavoursguru.com/catalog/view/theme/default/image/cart-icon.svg"
alt=""
loading="lazy"
></img>
<span>ADD TO CART</span>
</button>

<button className="go-toCart" id="btn" onClick={handleGoToCart}>
<img
className="iconDetails"
src="https://www.flavoursguru.com/catalog/view/theme/default/image/order-now.svg"
loading="lazy"
alt=""
></img>
GO TO CART
</button>
</div>

<br/>

<img className="flex_shippedImg" src={winsomeproductdetails}></img>

</div>

</div>

<div className="descproduct">

<h2>Description</h2>

<p style={{marginTop : '-1.5em'}} className="prdctDetails">

<br></br>

{arrayStore.description}

</p>

</div>

<Header />

</div>

);
};

const mapStateToProps = (state) => ({
cart: state.cart,
});

export default connect(mapStateToProps, { addToCart })(ProductDetails);
