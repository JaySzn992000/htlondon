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
import winsomeproductdetails from "../Slider/winsomeproductdetails.png";
import axios from "axios";

const ProductDetails = ({ addToCart, cart }) => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [arrayStore, setArrayStore] = useState(null);
  const [cartCount, setCartCount] = useState(cart.length);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:3001/fetchProductslist");
        const data = response.data;
        const product = data.find((product) => product.id === parseInt(id));
        setArrayStore(product);
        setMainImage(product.file_path);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    if (arrayStore) {
      const isProductInCart = cart.some(
        (item) => item.id === arrayStore.id && item.size === selectedSize
      );

      if (isProductInCart) {
        alert("This product with the selected size is already in your cart.");
      } else {
        const productToAdd = {
          ...arrayStore,
          size: selectedSize,
          price: arrayStore.price, // ✅ Fixed: price now always original price
          originalPrice: arrayStore.price
        };

        addToCart(productToAdd);
        setCartCount(cartCount + 1);
        localStorage.setItem(`cart-added-${id}-${selectedSize}`, JSON.stringify(true));
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

  const sizes = arrayStore.sizes
    ? arrayStore.sizes.split(",").map((size) => size.trim())
    : [];

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
                loading="lazy"
              />
            </div>
            <div>
              <img
                className="product_img mobile-slider-img"
                src={arrayStore.file_path1}
                alt={`${arrayStore.name} - Image 2`}
                loading="lazy"
              />
            </div>
            <div>
              <img
                className="product_img mobile-slider-img"
                src={arrayStore.file_path2}
                alt={`${arrayStore.name} - Image 3`}
                loading="lazy"
              />
            </div>
            <div>
              <img
                className="product_img mobile-slider-img"
                src={arrayStore.file_path3}
                alt={`${arrayStore.name} - Image 4`}
                loading="lazy"
              />
            </div>
          </Slider>
        </div>

        <div className="product-gallery-box">
          <Zoom>
            <img className="gallery-img" src={arrayStore.file_path} alt="" loading="lazy" />
          </Zoom>
          <Zoom>
            <img className="gallery-img" src={arrayStore.file_path1} alt="" loading="lazy" />
          </Zoom>
          <Zoom>
            <img className="gallery-img" src={arrayStore.file_path2} alt="" loading="lazy" />
          </Zoom>
          <Zoom>
            <img className="gallery-img" src={arrayStore.file_path3} alt="" loading="lazy" />
          </Zoom>
        </div>

        <div className="second_div">
          <section>
            <h1>{arrayStore.name}</h1>
            <h2 className="Scnd_hTg">
              <span>₹ {arrayStore.price}</span>
            </h2>
          </section>

          {/* Size selector */}
          <p>SELECT A SIZE</p>
          <div className="size_chart">
            {sizes.map((size) => (
              <button
                key={size}
                id="btnsize"
                onClick={() => handleSizeChange(size)}
                className={selectedSize === size ? "selected" : ""}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="review_Cntnr">
            <img
              id="Review_Img"
              src="https://cdn-icons-png.flaticon.com/128/15853/15853959.png"
            />
            <li className="fa_Review">{arrayStore.review}</li>
          </div>

          <div className="flex_btnADD_CART">
            <button onClick={handleAddToCart} id="btn" className="add_crtK">
              <img
                className="iconDetails Cart_detail"
                src="https://cdn-icons-png.flaticon.com/128/6322/6322610.png"
                alt=""
                loading="lazy"
              />
              <span>ADD TO CART</span>
            </button>

            <button className="go-toCart" id="btn" onClick={handleGoToCart}>
              GO TO CART
            </button>
          </div>

          <br />
          <img className="flex_shippedImg" src={winsomeproductdetails} />
        </div>
      </div>

      <div className="descproduct">
        <h2>Description</h2>
        <p style={{ marginTop: "-1.5em" }} className="prdctDetails">
          <br />
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