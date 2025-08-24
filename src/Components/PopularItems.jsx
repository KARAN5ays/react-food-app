import { useRef } from "react";
import mydata from "../Food.json";
import { useCart } from "../Context/CartContext.jsx"; // Importing the Cart context

const PopularItem = () => {
  const scrollRef = useRef(null);
  const { addToCart } = useCart(); // Importing the addToCart function from CartContext

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

  return (
    <div className="container mt-4 position-relative" >
      <h3 className="mb-4">🍴 Popular Items</h3>

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
        className="d-flex overflow-auto"
        style={{ gap: "15px", paddingBottom: "10px", scrollBehavior: "smooth" }}
      >
        {mydata.map((item, index) => (
          <div
            key={index}
            className="card shadow-sm"
            style={{ minWidth: "200px", maxWidth: "200px", flex: "0 0 auto" }}
          >
            {item.Image && (
              <img
                src={item.Image}
                className="card-img-top"
                alt={item.Name}
                style={{ height: "150px", objectFit: "cover" }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{item.Name}</h5>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">{item.Price}</span>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => addToCart(item)}
                >
                  Order
                </button>
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
