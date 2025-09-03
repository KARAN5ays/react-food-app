import mydata from '../Restaurant.json';
import myfood from '../Food.json';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.items);
  
  const restaurant = mydata.find((item) => item.id === parseInt(id));
  
  const isInCart = (item) => {
    return cart.some((cartItem) => cartItem.id === item.id);
  };
  
  if (!restaurant) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          <h2 className="alert-heading">Restaurant Not Found</h2>
          <p>We couldn't find the restaurant you're looking for.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-4">
      {/* Restaurant Header Section */}
      <div className="card shadow-lg mb-5 border-0 overflow-hidden">
        <div className="row g-0">
          {/* Restaurant Image */}
          <div className="col-lg-4 col-md-5">
            <div className="h-100 rounded-5 overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="img-fluid w-100 h-100 object-fit-cover"
                style={{ minHeight: "250px" }}
              />
            </div>
          </div>
          
          {/* Restaurant Details */}
          <div className="col-lg-8 col-md-7">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1 className="card-title fw-bold text-danger">{restaurant.name}</h1>
                <span className="badge bg-success fs-6 px-3 py-2">
                  ⭐ {restaurant.rating}/5
                </span>
              </div>
              
              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="badge bg-light text-dark border">
                  <i className="bi bi-geo-alt me-1"></i> Restaurant
                </span>
                <span className="badge bg-light text-dark border">
                  <i className="bi bi-clock me-1"></i> Open Now
                </span>
                <span className="badge bg-light text-dark border">
                  <i className="bi bi-truck me-1"></i> Delivery
                </span>
              </div>
              
              <p className="card-text text-muted">
                Discover our signature dishes crafted with the finest ingredients. 
                Experience culinary excellence that will delight your taste buds.
              </p>
              
              <div className="d-flex gap-2">
                <button className="btn btn-danger">
                  <i className="bi bi-telephone me-2"></i> Contact
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-share me-2"></i> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular Dishes Section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="fw-bold text-dark">Popular Dishes</h2>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-secondary">
              <i className="bi bi-funnel me-1"></i> Filter
            </button>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="bi bi-sort-down me-1"></i> Sort
            </button>
          </div>
        </div>
        
        <div className="row g-4">
          {Array.isArray(restaurant.foods) && restaurant.foods.map((food, index) => (
            <div key={index} className="col-xl-3 col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm border-0 overflow-hidden transition-all hover-shadow">
                <div className="position-relative">
                  <img
                    src={food.image}
                    className="card-img-top"
                    alt={food.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="position-absolute top-0 end-0 p-2">
                    <span className="badge bg-danger">Popular</span>
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold text-dark">{food.name}</h5>
                    <span className="fw-bold text-danger">${food.price}</span>
                  </div>
                  <p className="card-text text-muted small flex-grow-1">
                    Delicious {food.name.toLowerCase()} prepared with our special recipe
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </div>
                    {isInCart(food) ? (
                      <button className="btn btn-sm btn-secondary fw-bold" onClick={() => dispatch(removeFromCart(food.id))}>
                        Remove
                      </button>
                    ) : (
                      <button className="btn btn-sm btn-danger fw-bold" onClick={() => dispatch(addToCart(food))}>
                        Order Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional Info Section */}
      <div className="card border-0 shadow-sm mt-5">
        <div className="card-body p-4">
          <h3 className="card-title fw-bold mb-3">About This Restaurant</h3>
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Cuisine</h5>
              <p>International, Fusion, Local Specialties</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Hours</h5>
              <p>Mon-Fri: 10AM-10PM<br />Sat-Sun: 9AM-11PM</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Payment</h5>
              <p>Cash, Credit Card, Mobile Payment</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Facilities</h5>
              <p>Outdoor Seating, Parking, Wi-Fi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;