import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from '../redux/slices/cartSlice';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  
  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.Price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = subtotal > 30 ? 0 : 4.99; // Free delivery for orders over $30
  const serviceFee = 2.99;
  const total = subtotal + tax + deliveryFee + serviceFee;
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-danger text-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Your Cart</h2>
            <button 
              className="btn btn-outline-light btn-sm"
              onClick={handleClearCart}
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        <div className="card-body">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-cart-x text-muted" style={{ fontSize: "3rem" }}></i>
              <h3 className="mt-3">Your cart is empty</h3>
              <p className="text-muted">Add some delicious food to your cart!</p>
              <button className="btn btn-primary mt-3">
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.Image}
                              alt={item.Name}
                              className="img-thumbnail me-3"
                              style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            />
                            <div>
                              <h6 className="mb-0">{item.Name}</h6>
                              <small className="text-muted">{item.Category || "Food"}</small>
                            </div>
                          </div>
                        </td>
                        <td>${item.Price.toFixed(2)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleDecreaseQuantity(item.id)}
                              disabled={item.quantity <= 1}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <span className="mx-2 fw-bold">{item.quantity}</span>
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleIncreaseQuantity(item.id)}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td>${(item.Price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Order Summary</h5>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Subtotal ({totalItems} items)</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Delivery Fee</span>
                        <span>
                          {deliveryFee === 0 ? (
                            <span className="text-success">FREE</span>
                          ) : (
                            `$${deliveryFee.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Service Fee</span>
                        <span>${serviceFee.toFixed(2)}</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <h5>Total</h5>
                        <h5>${total.toFixed(2)}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Promo Code</h5>
                      <div className="input-group mb-3">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Enter promo code"
                        />
                        <button className="btn btn-outline-secondary">Apply</button>
                      </div>
                      <button className="btn btn-danger w-100">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;