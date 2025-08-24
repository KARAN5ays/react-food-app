import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './Components/Navbar.jsx'
import Body from './Components/Body.jsx'
import PopularItem from './Components/PopularItems.jsx';
import Restaurants from './Components/Restaurants.jsx';
import { useState } from 'react';
import Footer from './Components/Footer.jsx';
const  App=()=> {
   const [cartCount, setCartCount] = useState(0);
  const handleorder = () => {
    setCartCount(cartCount + 1);
  };
 

  return (
    <>
    <Navbar cartcount={cartCount}/>
    <Body/>
    <PopularItem onOrder={handleorder}/>
    <Restaurants/>
    <Footer/>
     
    </>
  )
}

export default App
