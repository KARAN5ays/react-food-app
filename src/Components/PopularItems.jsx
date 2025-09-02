import { useRef } from "react";
import mydata from "../Food.json";
import { useCart } from "../Context/CartContext.jsx"; // Importing the Cart context
import { Link } from "react-router-dom";

const PopularItem = () => {
  const scrollRef = useRef(null);
  const { cart, addToCart, removeFromCart } = useCart(); // Get cart, add & remove functions

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  // ✅ Check if item is already in cart
  const isInCart = (item) => {
    return cart.some((cartItem) => cartItem.id === item.id);
  };

  return (
    <div className="container mt-4 position-relative">
      <h3 className="mb-4 fw-bold">🍴 Popular Items</h3>

      {/* Left Button */}
      <button
        className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
        onClick={scrollLeft}
        style={{ zIndex: 10 }}
      >
        &#8249;
      </button>

      {/* Horizontal Scroll Wrapper */}
      <div
        ref={scrollRef}
        className="d-flex popular-scroll"
        style={{ gap: "15px", paddingBottom: "10px", scrollBehavior: "smooth" }}
      >
        {mydata.map((item, index) => (
          <div
            key={index}
            className="card shadow-sm"
            style={{ minWidth: "200px", maxWidth: "200px", flex: "0 0 auto" }}
          >
              <Link to={`/description/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            {item.Image && (
              <img
                src={item.Image}
                className="card-img-top"
                alt={item.Name}
                style={{ height: "150px", objectFit: "cover" }}
              />
            )}
            </Link>
            <div className="card-body">
              <h5 className="card-title">{item.Name}</h5>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">${item.Price}</span>
                
                

                {/* ✅ Toggle Button */}
                {isInCart(item) ? (
                  <button
                    className="btn btn-sm btn-secondary fw-bold"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-danger fw-bold"
                    onClick={() => addToCart(item)}
                  >
                    Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
        onClick={scrollRight}
        style={{ zIndex: 10 }}
      >
        &#8250;
      </button>
    </div>
  );
};

export default PopularItem;
