import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navbar from "./Components/Navbar.jsx";
import CartPage from "./Components/CartPage.jsx";
import LoginForm from "./Components/LoginForm.jsx";
import Menu from "./Components/Menu.jsx";
import Offer from "./Components/Offers.jsx";
import OrderSummary from "./Components/OrderSummary.jsx";
import Restaurants from "./Components/Restaurants.jsx";
import RestaurantDetails from "./Components/RestaurantDetails.jsx";
import DescriptionFood from "./Components/DescriptionFood.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Routes>
        
          <Route path="/" element={<App />} />

          {/* Other pages */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/description/:id" element={<DescriptionFood />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
