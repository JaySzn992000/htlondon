// src/components/ProductDetails.js
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart } from "../action/action";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import Zoom from "react-medium-image-zoom";
import Slider from "react-slick";
import { connect } from "react-redux";
import { FiShoppingBag, FiMinus, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "./ProductDetails.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-medium-image-zoom/dist/styles.css";
import axios from "axios";

const ProductDetails = ({ addToCart, cart }) => {
  const { slug, id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const API_BASE = process.env.REACT_APP_API_URL || "https://namasya.onrender.com";

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE}/fetchProductslist`);
        const data = response.data;
        const foundProduct = data.find((p) => String(p.id) === String(id));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const getImages = () => {
    if (!product) return [];
    return [
      product.file_path,
      product.file_path1,
      product.file_path2,
      product.file_path3,
    ].filter(Boolean);
  };

  const images = getImages();

  const handleSizeChange = (size) => setSelectedSize(size);

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  // 🔥 FIXED: Yeh function ab S, M, L sab ko alag-alag add karega
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    if (!product) return;

    // Check karo ki same product ki same size toh pehle se cart mein nahi hai?
    const isProductInCart = cart.some(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (isProductInCart) {
      alert("This product size is already in your cart.");
      return;
    }

    const productToAdd = {
      ...product,
      size: selectedSize, // 🔥 IMPORTANT: S, M, L bhej raha hai
      quantity: quantity,
    };

    addToCart(productToAdd);
    alert("Product added to cart!");
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
  };

  const sizes = product?.sizes
    ? product.sizes.split(",").map((size) => size.trim())
    : [];

  if (loading) {
    return (
      <div>
        <Navbar cartCount={cart.length} />
        <div className="product-loading">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
        <Header />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <Navbar cartCount={cart.length} />
        <div className="product-not-found">
          <div className="not-found-content">
            <h1>Product Not Found</h1>
            <p>We couldn't find the product you're looking for.</p>
            <button onClick={() => navigate("/collections")}>
              Back to Collections
            </button>
          </div>
        </div>
        <Header />
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <Navbar cartCount={cart.length} />

      <div className="product-detail-container">
        <div className="mobile-slider-wrapper">
          <Slider {...sliderSettings}>
            {images.map((img, idx) => (
              <div key={idx} className="mobile-slide">
                <img src={img} alt={`${product.name} - ${idx + 1}`} loading="lazy" />
              </div>
            ))}
          </Slider>
        </div>

        <div className="product-gallery">
          <div className="gallery-main">
            <Zoom>
              <img src={images[activeImage] || images[0]} alt={product.name} />
            </Zoom>
          </div>
          <div className="gallery-thumbnails">
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`thumbnail-btn ${activeImage === idx ? "active" : ""}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-info-section">
          <div className="product-breadcrumb">
            <span>Home</span> / <span>Clothing</span> / <span>{product.category || "Premium"}</span>
          </div>

          <h1 className="product-title">{product.name}</h1>

          <div className="product-rating">
            <div className="stars">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <span className="rating-count">({product.review || "124"} reviews)</span>
          </div>

          <div className="product-price-section">
            <span className="product-current-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="product-original-price">₹{product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="product-discount-badge">{product.discount}% OFF</span>
            )}
          </div>

          <div className="product-stock">
            <span className="stock-indicator-dot"></span>
            In Stock
          </div>

          <div className="product-description">
            <p>{product.description || "Premium quality product crafted with attention to every detail."}</p>
          </div>

          <div className="product-size-section">
            <div className="size-header">
              <span>Select Size</span>
              <button className="size-guide-btn">Size Guide</button>
            </div>
            <div className="size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-quantity-section">
            <span>Quantity</span>
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange(-1)}>
                <FiMinus />
              </button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="product-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <FiShoppingBag />
              Add to Cart
            </button>
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <span>Material</span>
              <span>{product.category || "Upper Material"}</span>
            </div>
            <div className="meta-item">
              <span>Fit</span>
              <span>{product.material || "Regular"}</span>
            </div>
          </div>
        </div>
      </div>
      <Header />
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { addToCart })(ProductDetails);