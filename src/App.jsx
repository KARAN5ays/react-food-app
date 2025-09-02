import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './Components/Navbar.jsx';
import Body from './Components/Body.jsx';
import PopularItem from './Components/PopularItems.jsx';
import Restaurants from './Components/Restaurants.jsx';
import { useState, useEffect } from 'react'; 
import Footer from './Components/Footer.jsx';

const App = () => {
  const [cartCount, setCartCount] = useState(()=>{
    const savedCount = localStorage.getItem("cartCount");
    return savedCount ? JSON.parse(savedCount) : 0;
  });


  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // <-- changed clearInterval to clearTimeout
  }, []);

  useEffect(() => {
    localStorage.setItem("cartCount", JSON.stringify(cartCount));
  }, [cartCount]);

  const handleorder = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <>
      {loading ? (
        <div className="loading-screen d-flex justify-content-center align-items-center pt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Navbar cartcount={cartCount} />
          <Body />
          <PopularItem onOrder={handleorder} />
          <Restaurants />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
