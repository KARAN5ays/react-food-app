import React, { useEffect, useState } from "react";
import foodData from "../Food.json"; // Import your JSON file
import { useCart } from "../Context/CartContext";
import { motion } from "framer-motion"; //  import framer-motion

const colors = [
  "#ff0000", // red
  "#ff7300", // orange
  "#fffb00", // yellow
  "#48ff00", // green
  "#00ffd5", // cyan
  "#002bff", // blue
  "#7a00ff", // purple
  "#ff00ab", // pink
];

const MenuPage = () => {
  const [groupedFoods, setGroupedFoods] = useState({});
  const { addToCart } = useCart();

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
      <h2 className="text-center text-danger fw-bold mb-3">🍴 Our Menu</h2>
      <h6 className="text-center text-secondary mb-2">Different Kinds of Foods Categories</h6>

      {Object.keys(groupedFoods).map((category) => (
        <div key={category} className="mb-5">
          <h3 className="mb-4 border-bottom pb-2">{category}</h3>
          <div className="row">
            {groupedFoods[category].map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                {/* 🔥 Animated Card */}
                <motion.div
                  className="card bg-dark text-light h-100 shadow-sm"
                  style={{
                    borderRadius: "12px",
                    borderWidth: "3px",
                    borderStyle: "solid",
                  }}
                  animate={{
                    borderColor: colors,
                    boxShadow: colors.map(
                      (c) => `0 0 10px ${c}, 0 0 20px ${c}`
                    ),
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <img
                    src={item.Image}
                    className="card-img-top"
                    alt={item.Name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.Name}</h5>
                    <p className="card-text text-secondary">{item.Description}</p>
                    <p className="fw-bold text-success">${item.Price}</p>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
