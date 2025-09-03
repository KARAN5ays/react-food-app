import { useParams } from "react-router-dom";
import mydata from "../Food.json";
import { useState } from "react";
import { useAppDispatch } from '../redux/hooks'; // Fixed import path
import { addToCart } from "../redux/slices/cartSlice";

const DescriptionFood = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Find the item with matching id
  const item = mydata.find((f) => String(f.id) === id);
  
  if (!item) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center py-5">
          <h2 className="fw-bold">Item Not Found</h2>
          <p className="mt-3">The requested food item could not be found.</p>
          <button 
            className="btn btn-outline-danger mt-3"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...item, quantity }));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg border-0 overflow-hidden">
        <div className="row g-0">
          {/* Image Section */}
          <div className="col-md-5 position-relative">
            <img 
              src={item.Image} 
              alt={item.Name} 
              className="img-fluid w-100 h-100 object-fit-cover"
              style={{ minHeight: '400px' }}
            />
            {item.Category && (
              <span className="position-absolute top-0 end-0 badge bg-danger m-3 p-2">
                {item.Category}
              </span>
            )}
          </div>
          
          {/* Details Section */}
          <div className="col-md-7 p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h1 className="fw-bold">{item.Name}</h1>
                <div className="d-flex align-items-center mt-2">
                  <div className="text-warning me-2">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <span className="text-muted">(4.8)</span>
                </div>
              </div>
              <div className="text-end">
                <h2 className="text-danger fw-bold">${item.Price}</h2>
                <p className="text-muted small mb-0">per serving</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="fw-bold mb-3">Description</h5>
              <p className="text-secondary">
                {item.Description || "Delicious food made with fresh ingredients and cooked to perfection. Our chefs prepare each dish with care to ensure the best dining experience."}
              </p>
            </div>
            
            {item.Ingredients && (
              <div className="mb-4">
                <h5 className="fw-bold mb-3">Ingredients</h5>
                <div className="d-flex flex-wrap gap-2">
                  {item.Ingredients.map((ingredient, index) => (
                    <span key={index} className="badge bg-light text-dark border">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mb-4">
              <h5 className="fw-bold mb-3">Quantity</h5>
              <div className="d-flex align-items-center">
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="mx-3 fs-5">{quantity}</span>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            
            <div className="d-flex gap-3 mt-5">
              <button 
                className={`btn ${addedToCart ? 'btn-success' : 'btn-primary'} btn-lg px-4 rounded-pill flex-grow-1`}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <i className="fas fa-check-circle me-2"></i> Added to Cart
                  </>
                ) : (
                  <>
                    <i className="fas fa-shopping-cart me-2"></i> Add to Cart
                  </>
                )}
              </button>
              
              <button className="btn btn-outline-danger btn-lg rounded-circle" style={{ width: '60px', height: '60px' }}>
                <i className="far fa-heart"></i>
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-top">
              <div className="row text-center">
                <div className="col-4">
                  <i className="fas fa-truck text-primary fs-3"></i>
                  <p className="mt-2 mb-0 fw-bold">Free Delivery</p>
                  <p className="small text-muted">On orders over $50</p>
                </div>
                <div className="col-4">
                  <i className="fas fa-shield-alt text-success fs-3"></i>
                  <p className="mt-2 mb-0 fw-bold">Secure Payment</p>
                  <p className="small text-muted">100% secure payments</p>
                </div>
                <div className="col-4">
                  <i className="fas fa-undo text-warning fs-3"></i>
                  <p className="mt-2 mb-0 fw-bold">Easy Returns</p>
                  <p className="small text-muted">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Info Section */}
      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Nutritional Information</h5>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Calories</td>
                    <td className="text-end fw-bold">{item.Calories || "320 kcal"}</td>
                  </tr>
                  <tr>
                    <td>Protein</td>
                    <td className="text-end fw-bold">{item.Protein || "18g"}</td>
                  </tr>
                  <tr>
                    <td>Carbs</td>
                    <td className="text-end fw-bold">{item.Carbs || "42g"}</td>
                  </tr>
                  <tr>
                    <td>Fat</td>
                    <td className="text-end fw-bold">{item.Fat || "12g"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Customer Reviews</h5>
              <div className="d-flex align-items-center mb-3">
                <div className="me-3">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <span className="fw-bold">JD</span>
                  </div>
                </div>
                <div>
                  <h6 className="mb-0">John Doe</h6>
                  <div className="text-warning small">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-secondary">"Absolutely delicious! The flavors were amazing and the portion size was perfect. Will definitely order again."</p>
              <button className="btn btn-sm btn-outline-primary">Read More Reviews</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionFood;