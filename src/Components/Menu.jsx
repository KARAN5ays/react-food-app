import React, { useEffect, useState } from "react";
import foodData from "../Food.json";
import { motion } from "framer-motion";
import { FiShoppingCart, FiStar, FiClock, FiTag } from "react-icons/fi";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";

const MenuPage = () => {
  const [groupedFoods, setGroupedFoods] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Redux hooks
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.items);
  
  // Get all unique categories
  const categories = ["All", ...new Set(foodData.map(item => item.Category))];
  
  // Check if item is in cart
  const isinitem = (item) => {
    return cart.some((cartItem) => cartItem.id === item.id);
  };
  
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
  
  // Filter foods based on selected category
  const filteredFoods = selectedCategory === "All" 
    ? foodData 
    : (groupedFoods[selectedCategory] || []);
    
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <motion.h1 
          className="display-4 fw-bold mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-danger">🍴</span> Our Menu
        </motion.h1>
        <motion.p 
          className="lead text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Explore our delicious food categories
        </motion.p>
      </div>
      
      {/* Category Filter */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`btn ${selectedCategory === category ? 'btn-danger' : 'btn-outline-danger'} rounded-pill px-4 py-2`}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
      
      {/* Food Items */}
      {Object.keys(groupedFoods).length === 0 ? (
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading delicious food items...</p>
        </div>
      ) : (
        <motion.div 
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredFoods.map((item) => (
            <motion.div 
              key={item.id} 
              className="col-lg-4 col-md-6"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="card h-100 border-0 shadow-lg overflow-hidden">
                {/* Food Image */}
                <div className="position-relative">
                  <img
                    src={item.Image}
                    className="card-img-top"
                    alt={item.Name}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  {/* Popular Badge */}
                  {item.IsPopular && (
                    <span className="position-absolute top-0 end-0 m-3 badge bg-danger">
                      <FiTag className="me-1" /> Popular
                    </span>
                  )}
                  {/* Rating Badge */}
                  <span className="position-absolute bottom-0 start-0 m-3 bg-dark bg-opacity-75 text-white px-2 py-1 rounded">
                    <FiStar className="text-warning me-1" /> 
                    {item.Rating || 4.5}
                  </span>
                </div>
                
                <div className="card-body d-flex flex-column p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold">{item.Name}</h5>
                    <span className="fw-bold text-danger fs-5">${item.Price}</span>
                  </div>
                  
                  <p className="card-text text-muted flex-grow-1 mb-3">
                    {item.Description}
                  </p>
                  
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="text-muted small">
                      <FiClock className="me-1" /> 15-20 min
                    </div>
                    {isinitem(item) ? (
                      <motion.button
                        className="btn btn-secondary px-4"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiShoppingCart className="me-2" /> Remove
                      </motion.button>
                    ) : (
                      <motion.button
                        className="btn btn-danger px-4"
                        onClick={() => dispatch(addToCart(item))}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiShoppingCart className="me-2" /> Add
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {/* Empty State */}
      {filteredFoods.length === 0 && Object.keys(groupedFoods).length > 0 && (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-emoji-frown text-muted" style={{ fontSize: "3rem" }}></i>
          </div>
          <h3>No food items found</h3>
          <p className="text-muted">Try selecting a different category</p>
          <button 
            className="btn btn-outline-danger mt-3"
            onClick={() => setSelectedCategory("All")}
          >
            View All Categories
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuPage;