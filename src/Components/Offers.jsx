import { motion } from "framer-motion";
import { useState } from "react";

const Offer = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const offers = [
    {
      id: 1,
      title: "Flat 30% OFF",
      description: "On your first order above Rs. 300",
      image: "https://foodmandu.com/Images/Vendor/539/Product/70980//ComboOffer_RedMud-min_130618074043.jpg",
      buttonText: "Order Now",
      badge: "NEW USER",
      color: "danger"
    },
    {
      id: 2,
      title: "Family Pizza Combo",
      description: "2 Large Pizzas + Garlic Bread @ Rs. 899",
      image: "https://portlandpizzadelivery.com/wp-content/uploads/2016/10/Pizza-Nostra-Portland-Pizza-Delivery-in-NE-and-North-Portland-2-med-pizza-breadsticks-special-1.jpg",
      buttonText: "Grab Deal",
      badge: "BESTSELLER",
      color: "warning"
    },
    {
      id: 3,
      title: "Healthy Offer",
      description: "Buy 1 Salad & Get 50% OFF on Smoothie",
      image: "https://earthandoven.com/wp-content/uploads/2025/05/Healthy-salad-recipes-featured-image.jpg",
      buttonText: "Claim Now",
      badge: "LIMITED",
      color: "success"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
      <div className="text-center mb-5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="display-5 fw-bold mb-3">
            <span className="text-danger">🔥</span> Special Offers
          </h2>
          <p className="lead text-muted">Limited time deals you don't want to miss!</p>
        </motion.div>
      </div>

      <motion.div 
        className="row g-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {offers.map((offer, index) => (
          <motion.div 
            key={offer.id}
            className="col-lg-4 col-md-6"
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <div className={`card h-100 border-0 shadow-lg overflow-hidden ${hoveredIndex === index ? 'shadow-xl' : ''}`}>
              <div className="position-relative">
                <img 
                  src={offer.image} 
                  className="card-img-top" 
                  alt={offer.title}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className={`position-absolute top-0 end-0 m-3`}>
                  <span className={`badge bg-${offer.color} fs-6 px-3 py-2 rounded-pill`}>
                    {offer.badge}
                  </span>
                </div>
                <div className="position-absolute bottom-0 start-0 w-100 bg-gradient-to-t from-black to-transparent p-3">
                  <h5 className="text-white fw-bold mb-0">{offer.title}</h5>
                </div>
              </div>
              
              <div className="card-body d-flex flex-column p-4">
                <p className="card-text text-muted flex-grow-1">{offer.description}</p>
                
                <div className="d-flex align-items-center mt-3">
                  <div className="me-auto">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-clock-fill text-warning me-2"></i>
                      <span className="small text-muted">Expires in 3 days</span>
                    </div>
                  </div>
                  <motion.button
                    className={`btn btn-${offer.color}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {offer.buttonText}
                  </motion.button>
                </div>
              </div>
              
              <div className="card-footer bg-light border-0 py-3 px-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="bi bi-tag-fill text-primary me-1"></i>
                    <span className="small text-muted">Offer Code: </span>
                    <span className="fw-bold">SAVE30</span>
                  </div>
                  <div>
                    <i className="bi bi-people-fill text-success me-1"></i>
                    <span className="small text-muted">256 people claimed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="text-center mt-5 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="d-inline-block bg-light rounded-pill px-4 py-2">
          <span className="text-muted me-2">More offers coming soon!</span>
          <i className="bi bi-arrow-right-circle-fill text-primary"></i>
        </div>
      </motion.div>
    </div>
  );
};

export default Offer;