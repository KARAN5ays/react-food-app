import { useCart } from "../Context/CartContext";
import { useState } from "react";

const OrderSummary = () => {
  const { cart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  
  // Calculate order details
  const subtotal = cart.reduce((acc, item) => acc + item.Price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = subtotal > 30 ? 0 : 4.99; // Free delivery for orders over $30
  const serviceFee = 2.99;
  
  // Apply discount if promo code is valid
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1); // 10% discount
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };
  
  const totalBeforeDiscount = subtotal + tax + deliveryFee + serviceFee;
  const grandTotal = (totalBeforeDiscount - discount).toFixed(2);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="container mt-5 mb-4">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-success text-white py-3">
          <h2 className="mb-0 fw-bold">
            <i className="bi bi-receipt me-2"></i>Order Summary
          </h2>
        </div>
        
        <div className="card-body p-4">
          {/* Order Items Table */}
          <div className="table-responsive mb-4">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Food Item</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-end">Unit Price</th>
                  <th className="text-end">Item Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded p-2 me-3">
                          <i className="bi bi-basket-fill text-primary"></i>
                        </div>
                        <span className="fw-medium">{item.Name}</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-light text-dark fw-normal">
                        {item.quantity}
                      </span>
                    </td>
                    <td className="text-end">${item.Price.toFixed(2)}</td>
                    <td className="text-end fw-bold">${(item.Price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Promo Code Section */}
          <div className="mb-4 p-3 bg-light rounded">
            <div className="row g-2 align-items-center">
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-tag-fill text-success"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <button 
                  className="btn btn-outline-success w-100"
                  onClick={applyPromoCode}
                >
                  Apply
                </button>
              </div>
            </div>
            {discount > 0 && (
              <div className="mt-2 text-success">
                <i className="bi bi-check-circle-fill me-1"></i>
                Promo code applied! You saved ${discount.toFixed(2)}
              </div>
            )}
          </div>
          
          {/* Price Breakdown */}
          <div className="border-top pt-3">
            <div className="row mb-2">
              <div className="col">
                <span className="text-muted">Subtotal</span>
              </div>
              <div className="col text-end">
                ${subtotal.toFixed(2)}
              </div>
            </div>
            
            <div className="row mb-2">
              <div className="col">
                <span className="text-muted">Tax (8%)</span>
              </div>
              <div className="col text-end">
                ${tax.toFixed(2)}
              </div>
            </div>
            
            <div className="row mb-2">
              <div className="col">
                <span className="text-muted">Delivery Fee</span>
              </div>
              <div className="col text-end">
                {deliveryFee === 0 ? (
                  <span className="text-success">FREE</span>
                ) : (
                  `$${deliveryFee.toFixed(2)}`
                )}
              </div>
            </div>
            
            <div className="row mb-2">
              <div className="col">
                <span className="text-muted">Service Fee</span>
              </div>
              <div className="col text-end">
                ${serviceFee.toFixed(2)}
              </div>
            </div>
            
            {discount > 0 && (
              <div className="row mb-2 text-success">
                <div className="col">
                  <span>Discount</span>
                </div>
                <div className="col text-end">
                  -${discount.toFixed(2)}
                </div>
              </div>
            )}
            
            <div className="row mt-3 pt-3 border-top">
              <div className="col">
                <h5 className="mb-0">Total ({totalQuantity} items)</h5>
              </div>
              <div className="col text-end">
                <h4 className="text-primary mb-0">${grandTotal}</h4>
              </div>
            </div>
          </div>
          
          {/* Payment Button */}
          <div className="d-grid gap-2 mt-4">
            <button className="btn btn-primary btn-lg py-3">
              <i className="bi bi-lock-fill me-2"></i>
              Proceed to Secure Payment
            </button>
            <div className="text-center text-muted small mt-2">
              <i className="bi bi-shield-check me-1"></i>
              Your payment information is encrypted and secure
            </div>
          </div>
        </div>
        
        <div className="card-footer bg-light py-3 text-center">
          <div className="d-flex justify-content-center align-items-center">
            <i className="bi bi-truck text-primary me-2"></i>
            <span className="me-3">Estimated delivery: 25-35 min</span>
            <i className="bi bi-clock text-primary me-2"></i>
            <span>Order by 9 PM for same-day delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;