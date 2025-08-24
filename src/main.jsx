import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar.jsx';
import CartPage from './Components/CartPage.jsx';
import LoginForm from './Components/LoginForm.jsx';
import Menu from './Components/Menu.jsx';
import Offer from './Components/Offers.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />  

          {/* ✅ cart page route */}
          <Route path="/cart" element={<CartPage />} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/offer" element={<Offer/>}/>
          <Route path="/Login" element={<LoginForm />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
)
