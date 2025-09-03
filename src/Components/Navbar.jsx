import { FaCartShopping } from "react-icons/fa6";
import Logo from "../assets/Logo.png";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import SearchFilter from "./SearchFilter.jsx";
import mydata from "../Food.json";
import LoginForm from "./LoginForm.jsx";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';

const Navbar = () => {
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setFilteredData(mydata);
  }, []);

  useEffect(() => {
    const results = mydata.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
        <div className="container-fluid">
          {/* Logo */}
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={Logo} alt="Logo" style={{ width: "60px" }} />
          </NavLink>
          
          {/* Toggler for small screens */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* Navbar items */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            {/* Left menu */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    "nav-link px-3 " +
                    (isActive ? "text-warning fw-bold" : "text-light")
                  }
                  onClick={handleLinkClick}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    "nav-link px-3 " +
                    (isActive ? "text-warning fw-bold" : "text-light")
                  }
                  onClick={handleLinkClick}
                >
                  Menu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/offer"
                  className={({ isActive }) =>
                    "nav-link px-3 " +
                    (isActive ? "text-warning fw-bold" : "text-light")
                  }
                  onClick={handleLinkClick}
                >
                  Offers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    "nav-link px-3 " +
                    (isActive ? "text-warning fw-bold" : "text-light")
                  }
                  onClick={handleLinkClick}
                >
                  Cart
                </NavLink>
              </li>
              <li className="nav-item d-lg-none">
                <button
                  className="btn btn-danger w-100 mt-2"
                  onClick={() => {
                    setShowLoginModal(true);
                    handleLinkClick();
                  }}
                >
                  Login
                </button>
              </li>
              
              {/* Mobile search bar - only visible in the collapsed menu on small screens */}
              <li className="nav-item d-lg-none w-100 mt-2">
                <div className="input-group position-relative" ref={wrapperRef}>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search Any Food or Restaurant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                  />
                  <button className="btn btn-primary" type="button">
                    Search
                  </button>
                  {showDropdown && (
                    <SearchFilter
                      filteredData={filteredData}
                      searchTerm={searchTerm}
                    />
                  )}
                </div>
              </li>
            </ul>
            
            {/* Right side: search + cart - only visible on larger screens */}
            <div
              className="d-none d-lg-flex align-items-center flex-grow-1 ms-lg-3"
              ref={wrapperRef}
            >
              <div className="input-group w-100 position-relative">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search Any Food or Restaurant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                />
                <button className="btn btn-primary" type="button">
                  Search
                </button>
                {showDropdown && (
                  <SearchFilter
                    filteredData={filteredData}
                    searchTerm={searchTerm}
                  />
                )}
              </div>
              {/* Cart icon for large screens */}
              <NavLink
                to="/cart"
                className="btn position-relative ms-3 border-0 bg-transparent"
              >
                <FaCartShopping className="fs-4 text-white" />
                {cart.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </div>
            
            {/* Login button for larger screens */}
            <div className="d-none d-lg-block">
              <button
                className="btn btn-danger"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile cart icon - only visible on small screens when menu is closed */}
      {!isMenuOpen && (
        <div className="d-lg-none bg-dark py-2 d-flex justify-content-end px-3">
          <NavLink
            to="/cart"
            className="btn position-relative border-0 bg-transparent"
            onClick={handleLinkClick}
          >
            <FaCartShopping className="fs-4 text-white" />
            {cart.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem" }}
              >
                {cart.length}
              </span>
            )}
          </NavLink>
        </div>
      )}
      
      {/* Login Modal */}
      <LoginForm
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Navbar;