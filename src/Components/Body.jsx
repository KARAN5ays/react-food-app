import body1 from '../assets/body1.png';
import styles from './Body.module.css';
import { motion } from 'framer-motion';
const Body=()=>{
    return(
        <motion.div 
      className="container mt-4 p-4 rounded shadow h-100"
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
    >
      <div className="body d-flex flex-column flex-md-row align-items-center justify-content-between w-70">
        
        {/* Text Animation */}
        <motion.div 
          className="text-container mb-4 md-mb-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="fs-2 ms-5 mt-4 sm">Fast and Ready Food Delivery</h1>
          <p className="fs-4 ms-5 mt-2">Get Your Food Delivered Fast and Fresh</p>
          <p className="fs-6 ms-5 mt-2">
            Order from your favorite restaurants and enjoy delicious meals delivered to your doorstep.
          </p>
          <motion.button 
            className="btn btn-danger text-light ms-5 mt-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Order Now
          </motion.button>
        </motion.div>
  <img
    src={body1}
    alt="Food Delivery"
    className="img-fluid scooter"
  />
</div>

</motion.div>


    )
}
export default Body;