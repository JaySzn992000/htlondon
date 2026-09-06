import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { removeFromCart } from "../action/action";
import { connect } from "react-redux";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import axios from "axios";
import { FiX, FiMinus, FiPlus, FiShoppingBag, FiHeart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "./Cart.css";

const Cart = ({ cart, removeFromCart }) => {

  const [quantities, setQuantities] = useState([]);
  const [productData, setProductData] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // Load quantities from localStorage
  useEffect(() => {
    const storedQuantities = JSON.parse(localStorage.getItem("quantities")) || [];
    const initialQuantities = cart.map((_, index) => storedQuantities[index] || 1);
    setQuantities(initialQuantities);
  }, [cart]);

  // Fetch product data for images
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          "https://namasya.onrender.com/fetchProductslist"
        );
        setProductData(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProductData();
  }, []);

  // Total amount calculate
  const totalAmount = cart.reduce(
    (sum, item, index) => sum + item.price * quantities[index],
    0
  );

  // Total products count
  const totalProducts = cart.length === 0 ? 0 : quantities.reduce((sum, qty) => sum + qty, 0);

  // Remove item
  const handleRemove = (index) => {
    removeFromCart(index);
    const newQuantities = quantities.filter((_, i) => i !== index);
    setQuantities(newQuantities);
    localStorage.setItem("quantities", JSON.stringify(newQuantities));
  };

  // Change quantity
  const handleQuantityChange = (index, change) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(1, newQuantities[index] + change);
    setQuantities(newQuantities);
    localStorage.setItem("quantities", JSON.stringify(newQuantities));
  };

  // Proceed to address
  const asyncProceed = () => {
    navigate("/Address", {
      state: {
        loggedInUser: location.state?.loggedInUser,
        totalAmount,
        quantities,
      },
    });
  };

  // Get product image path – id ko string compare karo
  const getProductImagePath = (productId) => {
    const product = productData.find((p) => String(p.id) === String(productId));
    return product ? product.file_path : "";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="cart-container">
      <Navbar />

      <main className="cart-wrapper">
        {cart && cart.length > 0 ? (
          <>
            <div className="cart-header">
              <div className="cart-title-section">
                <h2 className="cart-title">My Cart'S</h2>
              </div>
              <p className="cart-subtitle">Review your selections</p>
            </div>

            <div className="cart-grid-header">
              <span>Product</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Subtotal</span>
              <span></span>
            </div>

            <motion.div
              className="cart-items"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    exit="exit"
                    className="cart-item"
                    layout
                  >
                    <div className="cart-item-card">
                      <button
                        className="cart-remove-btn"
                        onClick={() => handleRemove(index)}
                      >
                        <FiX />
                      </button>

                      <div className="cart-item-content">
                        <div className="cart-product-image-wrapper">
                          <img
                            src={getProductImagePath(item.id)}
                            alt={item.name}
                            className="cart-product-image"
                            loading="lazy"
                          />
                        </div>

                        <div className="cart-product-info">
                          <div className="cart-product-name">{item.name}</div>
                          {/* ✅ SIZE SHOW KARO */}
                          <div className="cart-product-size">
                            Size: <strong>{item.size || "OS"}</strong>
                          </div>
                          <div className="cart-product-stock">
                            <span className="stock-dot"></span>
                            In Stock
                          </div>
                        </div>

                        <div className="cart-product-price">₹{item.price}</div>

                        <div className="cart-product-qty">
                          <button
                            className="qty-btn"
                            onClick={() => handleQuantityChange(index, -1)}
                          >
                            <FiMinus />
                          </button>
                          <span>{quantities[index]}</span>
                          <button
                            className="qty-btn"
                            onClick={() => handleQuantityChange(index, 1)}
                          >
                            <FiPlus />
                          </button>
                        </div>

                        <div className="cart-product-total">
                          ₹{item.price * quantities[index]}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <div className="cart-summary">
              <div className="cart-summary-details">
                <div className="cart-summary-row">
                  <span>Total Products</span>
                  <span>{totalProducts}</span>
                </div>

                <div className="cart-summary-row total">
                  <span>Total Amount</span>
                  <span>₹ {totalAmount}</span>
                </div>
              </div>
              <button className="cart-checkout-btn" onClick={asyncProceed}>
                <FiShoppingBag />
                Place Order
              </button>
            </div>
          </>
        ) : (
          <motion.div
            className="cart-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="cart-empty-content">
              <div className="empty-icon-wrapper">
                <FiShoppingBag className="cart-empty-icon" />
              </div>
              <h1>Your cart is empty</h1>
              <p>Looks like you haven't added anything yet.</p>
              <button className="cart-explore-btn">Start Shopping</button>
            </div>
          </motion.div>
        )}
      </main>

      <div className="header-ad">
        <Header />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (index) => dispatch(removeFromCart(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);