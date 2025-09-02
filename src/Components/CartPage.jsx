import { useCart } from "../Context/CartContext";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { motion } from "framer-motion";

const CartPage = () => {
  const { cart, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  
  // Calculate cart totalscd
  const subtotal = cart.reduce((total, item) => total + (item.Price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = subtotal > 30 ? 0 : 4.99; // Free delivery for orders over $30
  const grandTotal = subtotal + tax + deliveryFee;
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checkout.");
      return;
    }
    navigate("/order-summary");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div className="row">
        {/* Cart Items Section */}
        <div className="col-lg-8 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">
              <i className="bi bi-cart3 me-2"></i>Your Cart
            </h2>
            <span className="badge bg-danger rounded-pill px-3 py-2">
              {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>

          {cart.length === 0 ? (
            <motion.div 
              className="text-center py-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
            
              <div className="mb-4">
                <i className="bi bi-cart-x text-muted" style={{ fontSize: "5rem" }}></i>
              </div>
              <h3 className="mb-3  text-center">Your cart is empty</h3>
              <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/restaurants")}
              >
                <i className="bi bi-arrow-left me-2"></i>Continue Shopping
              </button>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {cart.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="card mb-3 shadow-sm border-0 overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img 
                        src={item.Image} 
                        alt={item.Name} 
                        className="img-fluid w-100 h-100 object-fit-cover"
                        style={{ minHeight: "180px" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="card-title fw-bold">{item.Name}</h5>
                          <span className="badge bg-light text-dark fw-normal">
                            ${typeof item.Price === "number" ? item.Price.toFixed(2) : "0.00"} each
                          </span>
                        </div>
                        
                        <p className="card-text text-muted small mb-3">
                          {item.Description}
                        </p>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <button 
                              className="btn btn-sm btn-outline-secondary rounded-circle me-2"
                              onClick={() => removeFromCart(item)}
                              disabled={item.quantity <= 1}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            
                            <span className="mx-2 fw-bold">{item.quantity}</span>
                            
                            <button 
                              className="btn btn-sm btn-outline-secondary rounded-circle ms-2"
                              onClick={() => addToCart(item)}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                          
                          <div className="d-flex align-items-center">
                            <span className="fw-bold me-3">
                              ${(typeof item.Price === "number" ? item.Price * item.quantity : 0).toFixed(2)}
                            </span>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeFromCart(item)}
                            >
                              <i className="bi bi-trash me-1"></i> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
        
        {/* Cart Summary Section */}
        {cart.length > 0 && (
          <div className="col-lg-4">
            <motion.div 
              className="card shadow-lg border-0 sticky-top"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="card-header bg-success text-white py-3">
                <h4 className="mb-0 fw-bold">
                  <i className="bi bi-receipt me-2"></i>Order Summary
                </h4>
              </div>
              
              <div className="card-body p-4">
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Delivery Fee</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-success">FREE</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold fs-5">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="promoCode" className="form-label small text-muted">Promo Code</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="promoCode"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary" type="button">
                      Apply
                    </button>
                  </div>
                </div>
                
                <button 
                  className="btn btn-success w-100 py-3 fw-bold"
                  onClick={handleCheckout}
                >
                  <i className="bi bi-lock-fill me-2"></i>Proceed to Checkout
                </button>
                
                <div className="text-center mt-3">
                  <button 
                    className="btn btn-sm btn-link text-muted"
                    onClick={() => navigate("/restaurants")}
                  >
                    <i className="bi bi-arrow-left me-1"></i>Continue Shopping
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;