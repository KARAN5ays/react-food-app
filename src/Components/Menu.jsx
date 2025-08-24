import React, { useEffect, useState } from "react";
import foodData from "../Food.json"; // Import your JSON file
import { useCart } from "../Context/CartContext";

const MenuPage = () => {
  const [groupedFoods, setGroupedFoods] = useState({});
  const{ addToCart} =useCart();

  useEffect(() => {
    // Group food by category
    const grouped = foodData.reduce((acc, item) => {
      if (!acc[item.Category]) {
        acc[item.Category] = [];
      }
      acc[item.Category].push(item);
      return acc;
    }, {});
    setGroupedFoods(grouped);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-5">🍴 Our Menu</h2>

      {Object.keys(groupedFoods).map((category) => (
        <div key={category} className="mb-5">
          <h3 className="mb-4 border-bottom pb-2">{category}</h3>
          <div className="row">
            {groupedFoods[category].map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.Image}
                    className="card-img-top"
                    alt={item.Name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.Name}</h5>
                    <p className="card-text text-muted">{item.Description}</p>
                    <p className="fw-bold text-success">${item.Price}</p>
                    <button className="btn btn-primary w-100"onClick={()=>addToCart(item)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
