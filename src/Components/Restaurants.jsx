import { useRef } from "react";
import mydata from "../Restaurant.json";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const Restaurants = () => {
  const scrollRef = useRef(null);

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
    <div className="container mt-4 position-relative">
      <h3 className="mt-4 ms-4">Featured Restaurants</h3>

      {/* Left Button */}
      <button
        className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
        onClick={scrollLeft}
        style={{ zIndex: 10 }}
      >
        <CiCircleChevLeft size={28} />
      </button>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="d-flex overflow-auto"
        style={{ gap: "15px", paddingBottom: "10px", scrollBehavior: "smooth" }}
      >
        {mydata.map((item, index) => (
          <div
            key={index}
            className="card shadow-sm"
            style={{ minWidth: "220px", maxWidth: "220px", flex: "0 0 auto" }}
          >
            <img
              src={item.image}
              className="card-img-top"
              alt={item.name}
              style={{ height: "150px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">⭐ {item.rating}</span>
                <button className="btn btn-sm btn-primary">View Details</button>
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
        <CiCircleChevRight size={28} />
      </button>
    </div>
  );
};

export default Restaurants;
